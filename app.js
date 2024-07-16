import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
// import session from 'express-session';
// import csurf from 'csurf';
import connectDB from "./config/db.config.js";
import apiRouter from "./routes/routes.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import colors from "colors";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
// }));
// app.use(csurf({ cookie: true }));
// app.use((err, req, res, next) => {
//   if (err.code !== 'EBADCSRFTOKEN') {
//     return next(err);
//   }
//   res.status(403).json({ error: 'Invalid CSRF token' });
// });

connectDB();

app.use("/api", apiRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`.cyan.bold);
});
