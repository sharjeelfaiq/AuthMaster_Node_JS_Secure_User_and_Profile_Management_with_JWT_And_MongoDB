// token.service.js
import createError from "http-errors";
import jwt from "jsonwebtoken";
import RevokedToken from "../models/revokedToken.model.js";
import logger from "../utils/logger.utils.js";

export const revokeToken = async (token, expiresIn) => {
  const expiresAt = new Date(Date.now() + expiresIn);
  try {
    const revokedToken = new RevokedToken({ token, expiresAt });
    await revokedToken.save();
  } catch (error) {
    logger.error("Failed to revoke token", { error: error.message });
    throw createError(500, `Failed to revoke token: ${error.message}`);
  }
};

export const isTokenRevoked = async (token) => {
  try {
    const revokedToken = await RevokedToken.findOne({ token });
    return revokedToken !== null && revokedToken.expiresAt > new Date();
  } catch (error) {
    logger.error("Failed to check token revocation", { error: error.message });
    throw createError(500, `Failed to check token revocation: ${error.message}`);
  }
};

export const verifyToken = async (token) => {
  try {
    // eslint-disable-next-line no-undef
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const isRevoked = await isTokenRevoked(token);

    if (isRevoked) {
      throw createError(401, "Token has been revoked");
    }

    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      logger.error("Token expired", { error: error.message });
      throw createError(401, "Token expired");
    } else if (error.name === "JsonWebTokenError") {
      logger.error("Token invalid", { error: error.message });
      throw createError(401, "Token invalid");
    } else {
      logger.error("Failed to verify token", { error: error.message });
      throw createError(500, `Failed to verify token: ${error.message}`);
    }
  }
};

export const generateAuthToken = (user) => {
  try {
    const token = jwt.sign(
      { _id: user._id.toString(), email: user.email, firstName: user.firstName },
      // eslint-disable-next-line no-undef
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    logger.error("Failed to generate auth token", { error: error.message });
    throw createError(500, `Failed to generate token: ${error.message}`);
  }
};

// Generate a verification token
export const generateVerificationToken = (userId) => {
  try {
    // eslint-disable-next-line no-undef
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "5m" });
  } catch (error) {
    logger.error("Failed to generate verification token", { error: error.message });
    throw createError(500, `Failed to generate verification token: ${error.message}`);
  }
};

const cleanupExpiredTokens = async () => {
  const cutoffDate = new Date();
  try {
    await RevokedToken.deleteMany({ expiresAt: { $lte: cutoffDate } });
  } catch (error) {
    logger.error("Failed to cleanup expired tokens", { error: error.message });
    throw createError(500, `Failed to cleanup expired tokens: ${error.message}`);
  }
};

setInterval(cleanupExpiredTokens, 24 * 60 * 60 * 1000);
