import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import rateLimit from "express-rate-limit";
// eslint-disable-next-line no-unused-vars
import colors from "colors";

const configMiddleware = (app) => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
  });

  // eslint-disable-next-line no-undef
  const secret = process.env.SESSION_SECRET;

  const sessionConfig = {
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set secure: true in production with HTTPS
  };

  app.use(limiter);
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(session(sessionConfig));
};

export default configMiddleware;
