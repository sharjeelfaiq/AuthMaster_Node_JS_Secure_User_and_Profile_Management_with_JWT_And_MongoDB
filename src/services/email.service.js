import createError from "http-errors";
import transporter from "../config/email.config.js";
import User from "../models/user.model.js";
import { generateVerificationToken, verifyToken } from "./token.service.js";
import logger from "../utils/logger.utils.js";

export const sendVerificationEmail = async (token) => {
  try {
    const decoded = await verifyToken(token);
    const { userId, email, firstName } = decoded;

    const verificationToken = generateVerificationToken(userId);

    // eslint-disable-next-line no-undef
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    const mailOptions = {
      // eslint-disable-next-line no-undef
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 20px; border-radius: 8px;">
      <h2 style="color: #333;">Welcome, ${firstName}!</h2>
      <p style="color: #555; font-size: 16px;">Thank you for signing up with us. Please verify your email by clicking the button below:</p>
      <div style="margin-top: 20px; text-align: center;">
        <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
      </div>
      <p style="color: #777; font-size: 14px; margin-top: 20px;">If the button above doesn't work, please copy and paste the following URL into your browser:</p>
      <p style="color: #777; font-size: 14px;">${verificationUrl}</p>
      <p style="color: #888; font-size: 12px; margin-top: 20px;">Thank you for joining us!</p>
      <p style="color: #888; font-size: 12px;">- The *** Team</p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error({ error: error.message });
    throw createError(
      500,
      `Failed to send verification email: ${error.message}`
    );
  }
};

export const verifyEmail = async (token) => {
  try {
    const decoded = await verifyToken(token);
    const { userId } = decoded;
    const user = await User.findById(userId);

    if (!user) {
      throw createError(400, "Invalid verification link");
    }

    user.emailVerified = true;
    await user.save();
  } catch (error) {
    logger.error({ error: error.message });
    throw createError(
      error.status || 400,
      "Invalid or expired verification link"
    );
  }
};
