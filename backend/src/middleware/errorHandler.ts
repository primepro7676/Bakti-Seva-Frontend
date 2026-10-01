import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { env } from "../config/env";
import { sendFailure } from "../utils/apiResponse";
import { logger } from "../utils/logger";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function notFoundHandler(_req: Request, res: Response) {
  return sendFailure(res, "Route not found", 404);
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return sendFailure(res, "Validation failed", 400, {
      errors: err.flatten().fieldErrors,
    });
  }

  if (err instanceof AppError) {
    return sendFailure(res, err.message, err.statusCode);
  }

  if (err instanceof Error && err.message.startsWith("CORS blocked")) {
    return sendFailure(res, "Not allowed by CORS", 403);
  }

  logger.error("Unhandled error", err);

  const message =
    env.NODE_ENV === "production"
      ? "Internal server error"
      : err instanceof Error
        ? err.message
        : "Internal server error";

  return sendFailure(res, message, 500);
}
