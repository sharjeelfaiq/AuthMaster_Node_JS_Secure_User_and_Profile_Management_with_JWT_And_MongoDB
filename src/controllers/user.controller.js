import { getAll, getById, update, remove } from "../services/user.service.js";
import { verifyToken } from "../services/token.service.js";
import { handleError } from "../utils/utils.js";

export const getAllUsers = async (req, res, next) => {
  const csrfToken = req.csrfToken();
  try {
    const users = await getAll();
    res.status(200).json({ users, csrfToken });
  } catch (error) {
    next(handleError("Failed to fetch users", error));
  }
};

export const getUser = async (req, res, next) => {
  const { auth_token: token } = req.headers;
  const csrfToken = req.csrfToken();

  try {
    const decoded = await verifyToken(token);
    const userId = decoded._id;
    const user = await getById(userId);
    res.status(200).json({ user, csrfToken });
  } catch (error) {
    next(handleError("Failed to fetch user", error));
  }
};

export const updateUser = async (req, res, next) => {
  const { auth_token: token } = req.headers;
  const userData = req.body;

  try {
    const decoded = await verifyToken(token);
    const userId = decoded._id;
    await update(userId, userData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(handleError("Failed to update user", error));
  }
};

export const deleteUser = async (req, res, next) => {
  const { auth_token: token } = req.headers;

  try {
    const decoded = await verifyToken(token);
    const userId = decoded._id;
    const response = await remove(userId);
    res.status(200).json({ message: response });
  } catch (error) {
    next(handleError("Failed to delete user", error));
  }
};
