import { register, login, logout } from "../services/auth.service.js";
import { setTokenCookie } from "../utils/utils.js";

export const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const { user, token } = await register(userData);

    setTokenCookie(res, token);

    res.status(201).json({ user, message: "Registeration successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);

    setTokenCookie(res, token);

    res.status(200).json({ user, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  const { token } = req.cookies;
  try {
    await logout(token);
    res.clearCookie("token");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
