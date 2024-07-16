import express from "express";
import { verifyEmail, resendEmailVerification } from "../controllers/email.controller.js";

const router = express.Router();

router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendEmailVerification);

export default router;