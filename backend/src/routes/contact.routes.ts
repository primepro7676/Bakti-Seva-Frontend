import { Router } from "express";
import { contactSchema, postContact } from "../controllers/contact.controller";
import { formRateLimiter } from "../middleware/rateLimiter";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.post("/", formRateLimiter, validateRequest(contactSchema), postContact);

export default router;
