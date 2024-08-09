import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

dotenv.config();

// eslint-disable-next-line no-undef
const { SESSION_SECRET } = process.env;

if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is not defined");
}

const configMiddleware = (app) => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
  });

  const sessionConfig = {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  };

  app.use(limiter);
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(session(sessionConfig));
  app.use(ExpressMongoSanitize());
  app.use(xss());
};

export default configMiddleware;
