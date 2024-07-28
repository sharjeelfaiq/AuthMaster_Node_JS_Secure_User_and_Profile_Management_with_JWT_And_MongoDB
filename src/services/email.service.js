// email.service.js
import createError from "http-errors";
import transporter from "../config/email.config.js";
import User from "../models/user.model.js";
import { generateVerificationToken, verifyToken } from "./token.service.js";
import { handleServiceError } from "../utils/utils.js";

// eslint-disable-next-line no-undef
const { CLIENT_URL, EMAIL_USER } = process.env;

// Utility function to generate email HTML content
const generateEmailHtml = (firstName, verificationUrl) => `
  <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; max-width: 600px; margin: auto;">
    <header style="text-align: center; padding-bottom: 20px;">
      <img src="https://example.com/logo.png" alt="UnlockED Logo" style="width: 150px; height: auto;"/>
    </header>
    <main style="text-align: center; padding: 20px;">
      <h1 style="color: #333333;">Hello, ${firstName}!</h1>
      <p style="color: #555555; font-size: 16px;">Thank you for registering with UnlockED. To complete your registration, please verify your email by clicking the button below:</p>
      <a href="${verificationUrl}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; margin-top: 20px;">Verify Your Email</a>
      <p style="color: #777777; font-size: 14px; margin-top: 20px;">If the button above doesn't work, copy and paste the following URL into your browser:</p>
      <p style="color: #007bff; font-size: 14px;">${verificationUrl}</p>
    </main>
    <footer style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0;">
      <p style="color: #888888; font-size: 12px;">Thank you for joining us!</p>
      <p style="color: #888888; font-size: 12px;">&mdash; The UnlockED Team</p>
    </footer>
  </div>
`;

export const sendVerificationEmail = async (token) => {
  try {
    const decoded = await verifyToken(token);
    const { userId, email, firstName } = decoded;
    const verificationToken = generateVerificationToken(userId);
    const verificationUrl = `${CLIENT_URL}/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Email Verification - UnlockED",
      html: generateEmailHtml(firstName, verificationUrl),
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    handleServiceError("Failed to send verification email", error);
  }
};

export const verifyEmail = async (token) => {
  try {
    const decoded = await verifyToken(token);
    const { userId } = decoded;

    // Use `findByIdAndUpdate` to avoid two database operations
    const user = await User.findByIdAndUpdate(
      userId,
      { emailVerified: true },
      { new: true }
    );

    if (!user) {
      throw createError(400, "Invalid verification link");
    }
  } catch (error) {
    handleServiceError("Failed to verify email", error);
  }
};
