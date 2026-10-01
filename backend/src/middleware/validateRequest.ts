import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { sendFailure } from "../utils/apiResponse";

export function validateRequest<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Invalid request data";
      return sendFailure(res, firstError, 400, {
        errors: result.error.flatten().fieldErrors,
      });
    }

    (req as Request & { validated: T }).validated = result.data;
    return next();
  };
}
