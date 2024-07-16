import {
  sendVerificationEmail,
  verifyEmailService,
} from "../services/email.service.js";
import { generateVerificationToken } from "../services/token.service.js";

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    await verifyEmailService(token);
    res.status(200).send("Email verified successfully");
  } catch (error) {
    console.error(`Failed to verify email: ${error.message}`);
    res.status(400).send("Invalid or expired verification link");
  }
};

export const resendEmailVerification = async (req, res) => {
  const user = req.body;

  try {
    await sendVerificationEmail(user);
    res.status(200).send("Verification email sent successfully");
  } catch (error) {
    console.error(`Failed to resend verification email: ${error.message}`);
    res.status(400).send("Failed to resend verification email");
  }
};
