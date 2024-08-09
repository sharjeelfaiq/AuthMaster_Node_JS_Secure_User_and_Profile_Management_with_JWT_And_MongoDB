import createError from "http-errors";
import transporter from "../config/email.config.js";
import User from "../models/user.model.js";
import { generateVerificationToken, verifyToken } from "./token.service.js";
import { handleError } from "../utils/utils.js";
import path from "path";
import ejs from "ejs";
import fs from "fs/promises"; // Use the promises API for async file operations
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// eslint-disable-next-line no-undef
const { BASE_URL, PORT, EMAIL_USER } = process.env;
if (!BASE_URL || !PORT || !EMAIL_USER) {
  throw handleError(
    "Missing required environment variables: BASE_URL, PORT, EMAIL_USER"
  );
}

const renderTemplate = async (templatePath, data) => {
  try {
    const template = await fs.readFile(templatePath, "utf-8");
    return ejs.render(template, data);
  } catch (error) {
    throw handleError(`Failed to read or render template: ${error.message}`);
  }
};

export const sendVerificationEmail = async (token) => {
  try {
    const decoded = await verifyToken(token);
    const { _id, email, firstName } = decoded;
    const verificationToken = generateVerificationToken(_id);
    const verificationUrl = `${BASE_URL}:${PORT}/api/v1/email/verify-email?token=${verificationToken}`;

    const templatePath = path.resolve(
      __dirname,
      "../views/emailVerificationTemplate.html"
    );
    const emailHtml = await renderTemplate(templatePath, {
      firstName,
      verificationUrl,
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Email Verification - UnlockED",
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw handleError("Failed to send verification email", error);
  }
};

export const verifyEmail = async (token) => {
  try {
    const decoded = await verifyToken(token);
    const { userId } = decoded;

    const user = await User.findByIdAndUpdate(
      userId,
      { emailVerified: true },
      { new: true }
    );

    if (!user) {
      throw createError(400, "Invalid verification link");
    }

    const templatePath = path.resolve(
      __dirname,
      "../views/emailVerifiedMessage.html"
    );
    const emailHtml = await renderTemplate(templatePath);

    return emailHtml;
  } catch (error) {
    throw handleError("Failed to verify email", error);
  }
};
