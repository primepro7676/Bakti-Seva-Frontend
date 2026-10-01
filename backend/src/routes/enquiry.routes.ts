import { Router } from "express";
import {
  enquirySchema,
  getEnquiries,
  postEnquiry,
} from "../controllers/enquiry.controller";
import { formRateLimiter } from "../middleware/rateLimiter";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.post("/", formRateLimiter, validateRequest(enquirySchema), postEnquiry);

// Structured for future admin authentication middleware
router.get("/", getEnquiries);

export default router;
