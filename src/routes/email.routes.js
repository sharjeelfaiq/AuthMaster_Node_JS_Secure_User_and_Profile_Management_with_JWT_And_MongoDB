import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  verifyUserEmail,
  resendEmailVerification,
} from "../controllers/email.controller.js";

const router = express.Router();

router
  .get("/verify-email", verifyUserEmail)
  .post("/resend-verification", authMiddleware, resendEmailVerification);

export default router;
