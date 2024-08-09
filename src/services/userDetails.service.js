import createError from "http-errors";
import { handleError } from "../utils/utils.js";
import UserDetails from "../models/userDetails.model.js";

export const getDetails = async (userId) => {
  try {
    const userDetails = await UserDetails.findOne({ user: userId })
      .populate("user")
      .populate("profile");

    if (!userDetails) {
      throw createError(404, "User details not found");
    }

    return userDetails;
  } catch (error) {
    handleError("Failed to fetch user details", error);
  }
};
