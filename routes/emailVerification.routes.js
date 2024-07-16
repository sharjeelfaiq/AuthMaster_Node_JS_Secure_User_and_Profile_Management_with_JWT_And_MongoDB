import express from "express";
import { verifyEmail } from "../controllers/email.controller.js";

const router = express.Router();

router.get("/verify-email", verifyEmail);

export default router;