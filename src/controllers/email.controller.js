import {
  sendVerificationEmail,
  verifyEmail,
} from "../services/email.service.js";
import { handleError } from "../utils/utils.js";

export const verifyUserEmail = async (req, res, next) => {
  const { token } = req.query;
  try {
    const response = await verifyEmail(token);
    res.status(200).send(response);
  } catch (error) {
    next(handleError("Failed to verify email", error));
  }
};

export const resendEmailVerification = async (req, res, next) => {
  const { auth_token: token } = req.headers;
  try {
    await sendVerificationEmail(token);
    res.send("Verification email sent successfully");
  } catch (error) {
    next(handleError("Failed to resend verification email", error));
  }
};
