import {
  sendVerificationEmail,
  verifyEmail,
} from "../services/email.service.js";
import { handleControllerError } from "../utils/utils.js";

export const verifyUserEmail = async (req, res, next) => {
  const { token } = req.query;

  try {
    await verifyEmail(token);
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    next(handleControllerError("Failed to verify email", error));
  }
};

export const resendEmailVerification = async (req, res, next) => {
  const { token } = req.query;

  try {
    await sendVerificationEmail(token);
    res.status(200).send("Verification email sent successfully");
  } catch (error) {
    next(handleControllerError("Failed to resend verification email", error));
  }
};
