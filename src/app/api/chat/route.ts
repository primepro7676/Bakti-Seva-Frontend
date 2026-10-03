import { chatRequestSchema } from "@/lib/validations/chat";
import { checkRateLimit, getClientIp } from "@/lib/ai/rate-limit";
import { apiEndpoint } from "@/lib/api";

export const maxDuration = 30;

function jsonError(status: number, error: string, extra?: Record<string, string>) {
  return Response.json({ success: false, error, ...extra }, { status });
}

/**
 * Proxies chat to Express backend → Groq.
 * Architecture: Next.js → Backend → Groq
 */
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
    const response = await fetch(apiEndpoint("/api/chatbot/message"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: parsed.data.message }),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success || typeof data.reply !== "string") {
      return jsonError(
        response.status === 429 ? 429 : 500,
        data?.message || "Unable to generate a response right now."
      );
    }

    return Response.json({
      success: true,
      reply: data.reply,
    });
  } catch (error) {
    console.error("[chatbot] backend proxy failure", error);
    return jsonError(500, "Unable to generate a response right now.");
  }
}
