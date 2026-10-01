import { getGroqClient, GROQ_MODEL, AI_MAX_TOKENS, AI_TEMPERATURE } from "@/lib/ai/groq";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import {
  detectIntent,
  formatContextForPrompt,
  retrieveWebsiteContext,
} from "@/lib/ai/retrieve-context";
import type { ChatHistoryMessage, ChatLocale, ChatServiceResult } from "@/lib/ai/types";

const REQUEST_TIMEOUT_MS = 25_000;

function sanitizeOutput(text: string): string {
  return text
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<\/?[^>]+>/g, "")
    .trim();
}

function detectLocaleOverride(message: string, locale: ChatLocale): ChatLocale {
  if (/[\u0C80-\u0CFF]/.test(message)) return "kn";
  if (/[\u0900-\u097F]/.test(message)) return "hi";
  return locale;
}

export async function generateChatReply(input: {
  message: string;
  history: ChatHistoryMessage[];
  locale: ChatLocale;
}): Promise<ChatServiceResult> {
  const locale = detectLocaleOverride(input.message, input.locale);
  const intent = detectIntent(input.message);
  const retrieved = await retrieveWebsiteContext(input.message, intent);
  const contextBlock = formatContextForPrompt(retrieved.context);
  const system = buildSystemPrompt(locale);
  const safeHistory = input.history.slice(-16);

  const userPayload = `Visitor question:\n${input.message}\n\nRetrieved Bakti Seva website context (source of truth):\n${contextBlock}`;

  const groq = getGroqClient();
  const started = Date.now();
  const completion = await groq.chat.completions.create(
    {
      model: GROQ_MODEL,
      temperature: Number.isFinite(AI_TEMPERATURE) ? AI_TEMPERATURE : 0.3,
      max_completion_tokens: Number.isFinite(AI_MAX_TOKENS) ? AI_MAX_TOKENS : 1000,
      messages: [
        { role: "system", content: system },
        ...safeHistory.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        { role: "user", content: userPayload },
      ],
    },
    { timeout: REQUEST_TIMEOUT_MS }
  );

  const latency = Date.now() - started;
  const raw = completion.choices[0]?.message?.content || "";
  const message = sanitizeOutput(raw);

  if (!message) {
    throw new Error("empty_completion");
  }

  console.info("[chatbot]", {
    ts: new Date().toISOString(),
    ok: true,
    model: GROQ_MODEL,
    intent,
    locale,
    latencyMs: latency,
    usage: completion.usage || null,
  });

  return {
    success: true,
    message,
    sources: retrieved.sources,
    products: intent === "PRODUCT" ? retrieved.products : [],
    suggestions: retrieved.suggestions,
  };
}
