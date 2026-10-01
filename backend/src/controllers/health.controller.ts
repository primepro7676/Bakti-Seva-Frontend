import type { Request, Response, NextFunction } from "express";
import { checkDatabaseConnection } from "../config/database";
import { sendFailure, sendSuccess } from "../utils/apiResponse";

export async function getHealth(_req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    message: "Bakti Seva Backend is running",
  });
}

export async function getDatabaseHealth(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const connected = await checkDatabaseConnection();

    if (!connected) {
      return sendFailure(res, "Database connection failed", 503);
    }

    return sendSuccess(res, { database: "connected" }, "Database connection healthy");
  } catch (error) {
    return next(error);
  }
}
