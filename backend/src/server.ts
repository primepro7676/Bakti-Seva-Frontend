import app from "./app";
import { env } from "./config/env";
import { checkDatabaseConnection } from "./config/database";
import { logger } from "./utils/logger";
import { prisma } from "./lib/prisma";

async function start() {
  const dbOk = await checkDatabaseConnection();
  if (!dbOk) {
    logger.warn("Database is not reachable at startup. Health endpoint will report status.");
  }

  const server = app.listen(env.PORT, () => {
    logger.info(`Bakti Seva backend listening on port ${env.PORT}`, {
      env: env.NODE_ENV,
      frontend: env.FRONTEND_URL,
    });
  });

  const shutdown = async (signal: string) => {
    logger.info(`${signal} received. Shutting down gracefully...`);
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

start().catch(async (error) => {
  logger.error("Failed to start server", error);
  await prisma.$disconnect();
  process.exit(1);
});
