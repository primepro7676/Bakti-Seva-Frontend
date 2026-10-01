import { config as loadEnv } from "dotenv";
import { z } from "zod";
import path from "path";

loadEnv({ path: path.resolve(__dirname, "../../.env") });

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(5000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DIRECT_URL: z.string().min(1, "DIRECT_URL is required for Prisma migrations"),
  FRONTEND_URL: z.string().url("FRONTEND_URL must be a valid URL"),
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
  GROQ_MODEL: z.string().min(1, "GROQ_MODEL is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  console.error("\nInvalid or missing environment variables:\n");
  console.error(details);
  console.error("\nCopy backend/.env.example to backend/.env and fill in the values.\n");
  process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
