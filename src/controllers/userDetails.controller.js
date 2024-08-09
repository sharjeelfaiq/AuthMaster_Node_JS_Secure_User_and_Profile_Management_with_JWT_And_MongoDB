import { getDetails } from "../services/userDetails.service.js";
import { verifyToken } from "../services/token.service.js";
import { handleError } from "../utils/utils.js";

export const getUserDetails = async (req, res, next) => {
  const { auth_token: token } = req.headers;
  const csrfToken = req.csrfToken();

  try {
    const decoded = await verifyToken(token);
    const userId = decoded._id;
    const userDetails = await getDetails(userId);
    res.status(200).json({ userDetails, csrfToken });
  } catch (error) {
    next(handleError("Failed to fetch the user details", error));
  }
};
