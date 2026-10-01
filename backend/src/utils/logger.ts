import { env } from "../config/env";

type LogMeta = unknown;

function format(level: string, message: string, meta?: LogMeta) {
  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(meta !== undefined ? { meta } : {}),
  };
  return JSON.stringify(entry);
}

export const logger = {
  info(message: string, meta?: LogMeta) {
    console.log(format("info", message, meta));
  },
  warn(message: string, meta?: LogMeta) {
    console.warn(format("warn", message, meta));
  },
  error(message: string, meta?: LogMeta) {
    if (env.NODE_ENV === "production" && meta instanceof Error) {
      console.error(format("error", message, { name: meta.name, message: meta.message }));
      return;
    }
    console.error(format("error", message, meta));
  },
};
