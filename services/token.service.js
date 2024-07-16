import jwt from "jsonwebtoken";
import RevokedToken from "../models/revokedToken.model.js";

export const revokeToken = async (token, expiresIn) => {
  const expiresAt = new Date(Date.now() + expiresIn);
  const revokedToken = new RevokedToken({ token, expiresAt });
  try {
    await revokedToken.save(); // Save the revoked token to database
  } catch (error) {
    throw new Error(`Failed to revoke token: ${error.message}`);
  }
};

export const isTokenRevoked = async (token) => {
  try {
    const revokedToken = await RevokedToken.findOne({ token });
    return revokedToken !== null && revokedToken.expiresAt > new Date();
  } catch (error) {
    throw new Error(`Failed to check token: ${error.message}`);
  }
};
export const verifyToken = async (token) => {
  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    const isRevoked = await isTokenRevoked(token);
    if (!isValid || isRevoked) {
      throw new Error("Token invalid or expired");
    }
    return isValid;
  } catch (error) {
    throw new Error(`Failed to verify token: ${error.message}`);
  }
};

export const generateAuthToken = (user) => {
  try {
    const token = jwt.sign(
      { _id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    throw new Error(`Failed to generate token: ${error.message}`);
  }
};

export const generateVerificationToken = (userId) => {
  try {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "5m" });
  } catch (error) {
    throw new Error(`Failed to generate verification token: ${error.message}`);
  }
};

const cleanupExpiredTokens = async () => {
  const cutoffDate = new Date(); // Current date and time
  await RevokedToken.deleteMany({ expiresAt: { $lte: cutoffDate } });
};

setInterval(cleanupExpiredTokens, 24 * 60 * 60 * 1000); // Once a day
