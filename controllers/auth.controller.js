import { register, login, logout } from "../services/auth.service.js";
import { setTokenCookie } from "../utils/token.utils.js";

export const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const { user, token } = await register(userData);

    setTokenCookie(res, token);

    res.status(201).json({ user, message: "Registeration successful" });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json("Registration failed");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);

    setTokenCookie(res, token);

    res.status(200).json({ user, message: "Login successful" });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json("Login failed");
  }
};

export const logoutUser = async (req, res) => {
  const { token } = req.cookies;
  try {
    await logout(token);
    res.clearCookie("token");
    res.status(200).json({ success: true });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json("Logout failed");
  }
};
