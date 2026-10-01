import type { CorsOptions } from "cors";
import { env } from "./env";

const allowedOrigins = new Set<string>([
  env.FRONTEND_URL.replace(/\/$/, ""),
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Allow non-browser tools (Postman, curl) with no Origin header
    if (!origin) {
      callback(null, true);
      return;
    }

    const normalized = origin.replace(/\/$/, "");
    if (allowedOrigins.has(normalized)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
