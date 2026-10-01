import { Router } from "express";
import chatbotRoutes from "./chatbot.routes";
import contactRoutes from "./contact.routes";
import enquiryRoutes from "./enquiry.routes";
import healthRoutes from "./health.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/chatbot", chatbotRoutes);
router.use("/contact", contactRoutes);
router.use("/enquiries", enquiryRoutes);

export default router;
