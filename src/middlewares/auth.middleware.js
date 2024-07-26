import createError from "http-errors";
import { verifyToken } from "../services/token.service.js";
import logger from "../utils/logger.utils.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    logger.error("Authorization token not found");
    return next(createError(401, "Authorization token not found"));
  }

  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Token verification failed", { error: error.message });
    next(createError(400, error.message || "Invalid token"));
  }
};

export default authMiddleware;
