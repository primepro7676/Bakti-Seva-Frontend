import { prisma } from "../lib/prisma";
import { logger } from "../utils/logger";

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error("Database connection check failed", error);
    return false;
  }
}
