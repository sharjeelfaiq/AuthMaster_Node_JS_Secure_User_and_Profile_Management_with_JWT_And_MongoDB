import createError from "http-errors";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateAuthToken, revokeToken } from "./token.service.js";
import { sendVerificationEmail } from "./email.service.js";
import logger from "../utils/logger.utils.js";

export const register = async (userData) => {
  const { email } = userData;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw createError(409, "User already exists");
    const user = new User(userData);
    await user.save();

    const token = generateAuthToken(user);
    await sendVerificationEmail(token);

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    };
  } catch (error) {
    logger.error({ error: error.message });
    throw createError(
      error.status || 500,
      `Registration failed: ${error.message}`
    );
  }
};

export const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw createError(404, "User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw createError(401, "Invalid credentials");

    const token = generateAuthToken(user);

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    };
  } catch (error) {
    logger.error({ error: error.message });
    throw createError(error.status || 500, `Login failed: ${error.message}`);
  }
};

export const logout = async (token) => {
  try {
    // eslint-disable-next-line no-undef
    await revokeToken(token, process.env.JWT_EXPIRATION * 1000);

    return "Logout successful";
  } catch (error) {
    logger.error({ error: error.message });
    throw createError(error.status || 500, `Logout failed: ${error.message}`);
  }
};
