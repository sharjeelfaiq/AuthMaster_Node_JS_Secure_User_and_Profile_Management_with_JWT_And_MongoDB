import createError from "http-errors";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import logger from "../utils/logger.utils.js";

export const getById = async (userId) => {
  try {
    const profile = await Profile.findOne({ user: userId });
    if (!profile) throw createError(404, "Profile not found");
    return profile;
  } catch (error) {
    logger.error(`Fetching profile failed: ${error.message}`);
    throw createError(
      error.status || 500,
      error.message || "Internal Server Error"
    );
  }
};

export const createOrUpate = async (userId, profileData, filePath) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw createError(404, "User not found");

    profileData.profilePicture = filePath && filePath;

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: profileData },
      { new: true, upsert: true }
    );

    return profile;
  } catch (error) {
    logger.error(`Profile creation failed: ${error.message}`);
    throw createError(
      error.status || 500,
      error.message || "Internal Server Error"
    );
  }
};
