import { register, login, logout } from "../services/auth.service.js";
import { setTokenCookie, handleError } from "../utils/utils.js";

export const registerUser = async (req, res, next) => {
  const { body: userData } = req;
  try {
    const user = await register(userData);
    const { token } = user;
    setTokenCookie(res, token);
    res.status(201).json({ user, message: "Registration successful" });
  } catch (error) {
    next(handleError("Failed to register user", error));
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
    next(handleError("Failed to login", error));
  }
};

export const logoutUser = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    const response = await logout(token);
    res.clearCookie("token");
    res.status(200).json({ message: response });
  } catch (error) {
    next(handleError("Failed to logout", error));
  }
};
