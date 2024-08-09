import { createOrUpate, getById } from "../services/profile.service.js";
import { verifyToken } from "../services/token.service.js";
import { handleError } from "../utils/utils.js";

export const getProfile = async (req, res, next) => {
  const { auth_token: token } = req.headers;
  const csrfToken = req.csrfToken();
  try {
    const decoded = await verifyToken(token);
    const userId = decoded._id;
    const profile = await getById(userId);
    res.status(200).json({ profile, csrfToken });
  } catch (error) {
    next(handleError("Failed to fetch profile", error));
  }
};

export const createOrUpdateProfile = async (req, res, next) => {
  const { auth_token: token } = req.headers;
  const profileData = req.body;
  const profilePicturePath = req.files?.profilePicture?.[0]?.path;
  const idImagePath = req.files?.idImage?.[0]?.path;
  try {
    const decoded = await verifyToken(token);
    const userId = decoded._id;
    const profile = await createOrUpate(
      userId,
      profileData,
      profilePicturePath,
      idImagePath
    );
    res.status(200).json({ profile });
  } catch (error) {
    next(handleError("Failed to create or update profile", error));
  }
};
