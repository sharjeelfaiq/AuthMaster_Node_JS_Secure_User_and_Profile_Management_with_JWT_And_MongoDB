import createError from "http-errors";
import {
  sendVerificationEmail,
  verifyEmail,
} from "../services/email.service.js";
import logger from "../utils/logger.utils.js";

export const verifyUserEmail = async (req, res, next) => {
  const { token } = req.query;

  try {
    await verifyEmail(token);
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    logger.error(`Failed to verify email: ${error.message}`);
    next(
      createError(
        error.status || 400,
        error.message || "Invalid or expired verification link"
      )
    );
  }
};

export const resendEmailVerification = async (req, res, next) => {
  const { token } = req.query;

  try {
    await sendVerificationEmail(token);
    res.status(200).send("Verification email sent successfully");
  } catch (error) {
    logger.error(`Failed to resend verification email: ${error.message}`);
    next(
      createError(error.status || 500, error.message || "Internal Server Error")
    );
  }
};
