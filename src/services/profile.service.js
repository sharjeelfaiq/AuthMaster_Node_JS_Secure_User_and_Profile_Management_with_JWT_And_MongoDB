import createError from "http-errors";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import { handleError } from "../utils/utils.js";
import UserDetails from "../models/userDetails.model.js";

export const getById = async (userId) => {
  try {
    const profile = await Profile.findOne({ user: userId });
    if (!profile) throw createError(404, "Profile not found");
    return profile;
  } catch (error) {
    handleError("Failed to fetch profile", error);
  }
};

export const createOrUpate = async (
  userId,
  profileData,
  profilePicturePath,
  idImagePath
) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw createError(404, "User not found");

    profileData.profilePicture = profilePicturePath && profilePicturePath;
    profileData.idImage = idImagePath && idImagePath;

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: profileData },
      { new: true, upsert: true }
    );

    await UserDetails.findOneAndUpdate(
      { user: userId },
      { $set: { profile: profile._id } }
    );

    return profile;
  } catch (error) {
    handleError("Failed to create or update profile", error);
  }
};
