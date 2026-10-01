import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { generateChatReply } from "../services/groq.service";

export const chatbotMessageSchema = z.object({
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(1, "Message cannot be empty")
    .max(4000, "Message is too long"),
});

export async function postChatbotMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { message } = (req as Request & { validated: z.infer<typeof chatbotMessageSchema> })
      .validated;

    const reply = await generateChatReply(message);

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    return next(error);
  }
}
