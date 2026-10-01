import Groq from "groq-sdk";

export const GROQ_MODEL =
  process.env.GROQ_MODEL || "openai/gpt-oss-20b";

export const AI_MAX_TOKENS = Number(process.env.AI_MAX_TOKENS || 1000);
export const AI_TEMPERATURE = Number(process.env.AI_TEMPERATURE || 0.3);

let client: Groq | null = null;

export function getGroqClient(): Groq {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured");
  }
  if (!client) {
    client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return client;
}
