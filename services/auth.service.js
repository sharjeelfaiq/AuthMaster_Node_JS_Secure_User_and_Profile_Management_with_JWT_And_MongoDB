import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateAuthToken, generateVerificationToken } from "./token.service.js";
import { revokeToken } from "./token.service.js";
import { sendVerificationEmail } from "./email.service.js";

export const register = async (userData) => {
  const { email } = userData;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const newUser = new User(userData);
    await newUser.save();

    const token = generateAuthToken(newUser);
    const verificationToken = generateVerificationToken(newUser._id);

    await sendVerificationEmail(newUser, verificationToken);

    return { user: newUser, token };
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });
  try {
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = generateAuthToken(user);
    return { user, token };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

export const logout = async (token) => {
  try {
    await revokeToken(token, process.env.JWT_EXPIRATION * 1000);
  } catch (error) {
    throw new Error(`Logout failed: ${error.message}`);
  }
};
