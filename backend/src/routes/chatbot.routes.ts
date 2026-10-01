import { Router } from "express";
import {
  chatbotMessageSchema,
  postChatbotMessage,
} from "../controllers/chatbot.controller";
import { chatbotRateLimiter } from "../middleware/rateLimiter";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.post(
  "/message",
  chatbotRateLimiter,
  validateRequest(chatbotMessageSchema),
  postChatbotMessage
);

export default router;
