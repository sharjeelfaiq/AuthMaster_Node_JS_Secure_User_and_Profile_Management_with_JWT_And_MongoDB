import createError from "http-errors";
import { createOrUpate, getById } from "../services/profile.service.js";
import { verifyToken } from "../services/token.service.js";
import logger from "../utils/logger.utils.js";

export const getProfile = async (req, res, next) => {
  const token = req.headers.auth_token;
  const decoded = await verifyToken(token);
  const userId = decoded._id;

  try {
    const profile = await getById(userId);
    res.status(200).json({ profile, csrfToken: req.csrfToken() });
  } catch (error) {
    logger.error(`Fetching profile failed: ${error.message}`);
    next(createError(404, error.message || "Profile not found"));
  }
};

export const creatOrUpdateProfile = async (req, res, next) => {
  const token = req.headers.auth_token;
  const decoded = await verifyToken(token);
  const userId = decoded._id;
  const profileData = req.body;
  const filePath = req.file?.path;

  try {
    const profile = await createOrUpate(userId, profileData, filePath);
    res.status(200).json({ profile });
  } catch (error) {
    logger.error(`Profile update failed: ${error.message}`);
    next(createError(400, error.message || "Profile update failed"));
  }
};
