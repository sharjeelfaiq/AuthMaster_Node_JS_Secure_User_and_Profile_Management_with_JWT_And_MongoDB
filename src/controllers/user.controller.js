import createError from "http-errors";
import { getAll, getById, update, remove } from "../services/user.service.js";
import { verifyToken } from "../services/token.service.js";
import logger from "../utils/logger.utils.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAll();
    res.status(200).json({ users, csrfToken: req.csrfToken() });
  } catch (error) {
    logger.error(`Failed to fetch users: ${error.message}`);
    next(
      createError(error.status || 500, error.message || "Failed to fetch users")
    );
  }
};

export const getUser = async (req, res, next) => {
  const token = req.headers.auth_token;

  try {
    const decoded = await verifyToken(token);
    const userId = decoded._id;
    const user = await getById(userId);
    res.status(200).json({ user, csrfToken: req.csrfToken() });
  } catch (error) {
    logger.error(`Failed to fetch user: ${error.message}`);
    next(createError(error.status || 404, error.message || "User not found"));
  }
};

export const updateUser = async (req, res, next) => {
  const token = req.headers.auth_token;
  const userData = req.body;

  try {
    const decoded = await verifyToken(token);
    const userId = decoded._id;
    await update(userId, userData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    logger.error(`Failed to update user: ${error.message}`);
    next(
      createError(error.status || 400, error.message || "Failed to update user")
    );
  }
};

export const deleteUser = async (req, res, next) => {
  const token = req.headers.auth_token;

  try {
    const decoded = await verifyToken(token);
    const userId = decoded._id;
    const response = await remove(userId);
    res.status(200).json({ message: response });
  } catch (error) {
    logger.error(`Failed to delete user: ${error.message}`);
    next(
      createError(error.status || 400, error.message || "Failed to delete user")
    );
  }
};
