import createError from "http-errors";
import User from "../models/user.model.js";
import Qualification from "../models/qualification.model.js";
import Profile from "../models/profile.model.js";
import logger from "../utils/logger.utils.js";

export const getAll = async () => {
  try {
    const users = await User.find();
    if (!users.length) throw createError(404, "No users found");
    return users;
  } catch (error) {
    logger.error(`Failed to fetch users: ${error.message}`);
    throw createError(
      error.status || 500,
      error.message || `Failed to fetch users: ${error.message}`
    );
  }
};

export const getById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw createError(404, `User with ID ${userId} does not exist`);
    return user;
  } catch (error) {
    logger.error(`Failed to fetch user with ID ${userId}: ${error.message}`);
    throw createError(
      error.status || 500,
      error.message ||
        `Failed to fetch user with ID ${userId}: ${error.message}`
    );
  }
};

export const update = async (userId, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) throw createError(404, `User with ID ${userId} does not exist`);
    return user;
  } catch (error) {
    logger.error(`Failed to update user with ID ${userId}: ${error.message}`);
    throw createError(
      error.status || 500,
      error.message ||
        `Failed to update user with ID ${userId}: ${error.message}`
    );
  }
};

export const remove = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    await Profile.findOneAndDelete({ user: userId });
    await Qualification.findOneAndDelete({ user: userId });
    if (!user) throw createError(404, `User with ID ${userId} does not exist`);
    return "User deleted successfully";
  } catch (error) {
    logger.error(`Failed to delete user with ID ${userId}: ${error.message}`);
    throw createError(
      error.status || 500,
      error.message ||
        `Failed to delete user with ID ${userId}: ${error.message}`
    );
  }
};
