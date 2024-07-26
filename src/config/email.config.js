import nodemailer from "nodemailer";
import configEnv from "./env.config.js";

configEnv();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 587,
  secure: true,
  auth: {
    // eslint-disable-next-line no-undef
    user: process.env.EMAIL_USER,
    // eslint-disable-next-line no-undef
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;
