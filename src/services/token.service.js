// token.service.js
import createError from "http-errors";
import jwt from "jsonwebtoken";
import RevokedToken from "../models/revokedToken.model.js";
import { handleServiceError } from "../utils/utils.js";

export const revokeToken = async (token, expiresIn) => {
  const expiresAt = new Date(Date.now() + expiresIn);
  const revokedToken = new RevokedToken({ token, expiresAt });
  try {
    await revokedToken.save();
  } catch (error) {
    handleServiceError("Failed to revoke token", error);
  }
};

export const isTokenRevoked = async (token) => {
  try {
    const revokedToken = await RevokedToken.findOne({ token });
    return revokedToken !== null && revokedToken.expiresAt > new Date();
  } catch (error) {
    handleServiceError("Failed to check token revocation", error);
  }
};

export const verifyToken = async (token) => {
  try {
    // eslint-disable-next-line no-undef
    const { JWT_SECRET } = process.env;
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) throw createError(401, "Token invalid");

    const isRevoked = await isTokenRevoked(token);

    if (isRevoked) throw createError(401, "Token has been revoked");

    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      handleServiceError("Token expired", error);
    } else if (error.name === "JsonWebTokenError") {
      handleServiceError("Token invalid", error);
    } else {
      handleServiceError("Failed to verify token", error);
    }
  }
};

export const generateAuthToken = (user) => {
  try {
    const { email, firstName } = user;
    // eslint-disable-next-line no-undef
    const { JWT_SECRET } = process.env;
    const token = jwt.sign(
      {
        _id: user._id.toString(),
        email,
        firstName,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    handleServiceError("Failed to generate auth token", error);
  }
};

// Generate a verification token
export const generateVerificationToken = (userId) => {
  try {
    // eslint-disable-next-line no-undef
    const { JWT_SECRET } = process.env;
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "5m" });
  } catch (error) {
    handleServiceError("Failed to generate verification token", error);
  }
};

const cleanupExpiredTokens = async () => {
  const cutoffDate = new Date();
  try {
    await RevokedToken.deleteMany({ expiresAt: { $lte: cutoffDate } });
  } catch (error) {
    handleServiceError("Failed to cleanup expired tokens", error);
  }
};

setInterval(cleanupExpiredTokens, 24 * 60 * 60 * 1000);
