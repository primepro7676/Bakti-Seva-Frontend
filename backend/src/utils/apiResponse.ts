import type { Response } from "express";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200
) {
  return res.status(statusCode).json({
    success: true,
    ...(message ? { message } : {}),
    ...(data !== undefined ? { data } : {}),
  });
}

export function sendFailure(
  res: Response,
  message: string,
  statusCode = 400,
  extra?: Record<string, unknown>
) {
  return res.status(statusCode).json({
    success: false,
    message,
    ...extra,
  });
}
