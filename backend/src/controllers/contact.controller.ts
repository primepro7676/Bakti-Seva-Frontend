import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { createContactSubmission } from "../services/contact.service";
import { sendSuccess } from "../utils/apiResponse";

export const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(120, "Name is too long"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please provide a valid email"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .max(200, "Subject is too long")
    .optional()
    .or(z.literal("")),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(5, "Message must be at least 5 characters")
    .max(5000, "Message is too long"),
});

export async function postContact(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = (req as Request & { validated: z.infer<typeof contactSchema> }).validated;

    const submission = await createContactSubmission({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || undefined,
      subject: payload.subject || undefined,
      message: payload.message,
    });

    return sendSuccess(
      res,
      {
        id: submission.id,
        createdAt: submission.createdAt,
      },
      "Contact form submitted successfully",
      201
    );
  } catch (error) {
    return next(error);
  }
}
