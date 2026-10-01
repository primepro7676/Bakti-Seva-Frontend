import { chatRequestSchema } from "@/lib/validations/chat";
import { generateChatReply } from "@/services/chatbot.service";
import { checkRateLimit, getClientIp } from "@/lib/ai/rate-limit";

export const maxDuration = 30;

function jsonError(status: number, error: string, extra?: Record<string, string>) {
  return Response.json({ success: false, error, ...extra }, { status });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    return jsonError(429, "You're sending messages a little too quickly. Please wait a moment.", {
      retryAfter: String(limit.retryAfterSec),
    });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 50_000) {
    return jsonError(400, "Request is too large.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "Invalid JSON body.");
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(400, "Please enter a valid message.");
  }

  try {
    const result = await generateChatReply({
      message: parsed.data.message,
      history: parsed.data.history,
      locale: parsed.data.locale,
    });
    return Response.json(result);
  } catch (error) {
    const code = error instanceof Error ? error.message : "unknown";
    if (code === "GROQ_API_KEY is not configured") {
      console.error("[chatbot] missing GROQ_API_KEY");
    } else {
      console.error("[chatbot] failure", { ts: new Date().toISOString(), ok: false });
    }
    return jsonError(500, "Unable to generate a response right now.");
  }
}
