import createError from "http-errors";
import { handleServiceError } from "../utils/utils.js";
import UserDetails from "../models/userDetails.model.js";

export const getDetails = async (userId) => {
  try {
    const userDetails = await UserDetails.findOne({ user: userId })
      .populate("user")
      .populate("profile")
      .populate("qualifications");

    if (!userDetails) {
      throw createError(404, "user details not found");
    }

    return userDetails;
  } catch (error) {
    handleServiceError("Failed to fetch user details", error);
  }
};
