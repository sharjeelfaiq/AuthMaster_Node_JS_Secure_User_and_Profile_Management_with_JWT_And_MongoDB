import createError from "http-errors";
import User from "../models/user.model.js";
import Qualification from "../models/qualification.model.js";
import Profile from "../models/profile.model.js";
import UserDetails from "../models/userDetails.model.js";
import { handleError } from "../utils/utils.js";

export const getAll = async () => {
  try {
    const users = await User.find();
    if (!users.length) throw createError(404, "No users found");
    return users;
  } catch (error) {
    handleError("Failed to fetch users", error);
  }
};

export const getById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw createError(404, `User with ID ${userId} does not exist`);
    return user;
  } catch (error) {
    handleError(`Failed to fetch user`, error);
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
    handleError(`Failed to update user`, error);
  }
};

export const remove = async (userId) => {
  try {
    await Promise.all([
      Profile.findOneAndDelete({ user: userId }),
      Qualification.deleteMany({ user: userId }),
      UserDetails.findOneAndDelete({ user: userId }),
    ]);

    const user = await User.findByIdAndDelete(userId);
    if (!user) throw createError(404, `User with ID ${userId} does not exist`);

    return "User deleted successfully";
  } catch (error) {
    handleError(`Failed to delete user`, error);
  }
};
