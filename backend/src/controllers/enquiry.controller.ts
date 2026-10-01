import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { createEnquiry, listEnquiries } from "../services/enquiry.service";
import { sendSuccess } from "../utils/apiResponse";

export const enquirySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(120, "Name is too long"),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(7, "Please provide a valid phone number")
    .max(30, "Phone number is too long"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please provide a valid email"),
  service: z
    .string({ required_error: "Service is required" })
    .trim()
    .min(2, "Service is required")
    .max(200, "Service name is too long"),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(5, "Message must be at least 5 characters")
    .max(5000, "Message is too long"),
});

export async function postEnquiry(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = (req as Request & { validated: z.infer<typeof enquirySchema> }).validated;
    const enquiry = await createEnquiry(payload);

    return sendSuccess(
      res,
      {
        id: enquiry.id,
        createdAt: enquiry.createdAt,
      },
      "Enquiry submitted successfully",
      201
    );
  } catch (error) {
    return next(error);
  }
}

/**
 * Admin list endpoint.
 * Structure supports adding authentication middleware later for the admin dashboard.
 */
export async function getEnquiries(_req: Request, res: Response, next: NextFunction) {
  try {
    const enquiries = await listEnquiries();
    return sendSuccess(res, { enquiries, count: enquiries.length });
  } catch (error) {
    return next(error);
  }
}
