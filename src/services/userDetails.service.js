import createError from "http-errors";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import logger from "../utils/logger.utils.js";

const getDetails = async (userId) => {
  try {
    const user = await User.findById(userId);
    const profile = await Profile.findOne({ user: userId });

    if (!user) {
      throw createError(404, "User not found");
    }

    const userDetails = {
      profile: {
        fullName: `${user.firstName} ${user.lastName}`,
        tagLine: profile.tagLine,
        introduction: profile.introduction,
      },
    };

    return { userDetails };
  } catch (error) {
    logger.error(
      `Failed to fetch user details for user ${userId}: ${error.message}`
    );
    throw createError(500, `Failed to fetch user details: ${error.message}`);
  }
};

export default getDetails;
