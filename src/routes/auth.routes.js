import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import validateMiddlware from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";

const router = express.Router();

router
  .post("/register", validateMiddlware(registerSchema), registerUser)
  .post("/login", validateMiddlware(loginSchema), loginUser)
  .post("/logout", logoutUser);

export default router;
