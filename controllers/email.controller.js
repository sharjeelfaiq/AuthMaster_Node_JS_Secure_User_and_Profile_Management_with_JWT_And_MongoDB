import { verifyEmailService } from "../services/email.service.js";

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    await verifyEmailService(token);
    res.status(200).send("Email verified successfully");
  } catch (error) {
    res.status(400).send("Invalid or expired verification link");
  }
};
