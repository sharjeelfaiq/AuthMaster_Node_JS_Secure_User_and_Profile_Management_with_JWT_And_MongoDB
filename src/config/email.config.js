import nodemailer from "nodemailer";
import { logger } from "../utils/utils.js"; // Assuming you have a logger utility
import configEnv from "./env.config.js";

configEnv();

// eslint-disable-next-line no-undef
const { EMAIL_USER, EMAIL_PASS } = process.env;

if (!EMAIL_USER || !EMAIL_PASS) {
  const errorMessage =
    "EMAIL_USER and EMAIL_PASS must be defined in environment variables";
  logger.error(errorMessage);
  throw new Error(errorMessage);
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 587,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

transporter.verify((error, _success) => {
  if (error) {
    logger.error("Email transporter configuration failed", {
      error: error.message,
    });
  }
});

export default transporter;
