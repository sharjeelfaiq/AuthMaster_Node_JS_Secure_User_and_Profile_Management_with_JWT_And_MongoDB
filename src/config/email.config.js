import nodemailer from "nodemailer";
import configEnv from "./env.config.js";

configEnv();

// eslint-disable-next-line no-undef
const { EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 587,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export default transporter;
