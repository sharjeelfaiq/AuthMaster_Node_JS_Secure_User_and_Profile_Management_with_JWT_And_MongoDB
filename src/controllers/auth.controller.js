import createError from "http-errors";
import { register, login, logout } from "../services/auth.service.js";
import { setTokenCookie } from "../utils/token.utils.js";
import logger from "../utils/logger.utils.js";

export const registerUser = async (req, res, next) => {
  const userData = req.body;

  try {
    const user = await register(userData);
    const { token } = user;

    setTokenCookie(res, token);
    res.status(201).json({ user, message: "Registration successful" });
  } catch (error) {
    logger.error("Registration failed", { error: error.message });
    next(
      createError(error.status || 500, error.message || "Internal Server Error")
    );
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);
    const { token } = user;

    setTokenCookie(res, token);
    res.status(200).json({ user, message: "Login successful" });
  } catch (error) {
    logger.error("Login failed", { error: error.message });
    next(
      createError(error.status || 401, error.message || "Internal Server Error")
    );
  }
};

export const logoutUser = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    const response = await logout(token);
    res.clearCookie("token");
    res.status(200).json({ message: response });
  } catch (error) {
    logger.error("Logout failed", { error: error.message });
    next(
      createError(error.status || 500, error.message || "Internal Server Error")
    );
  }
};
