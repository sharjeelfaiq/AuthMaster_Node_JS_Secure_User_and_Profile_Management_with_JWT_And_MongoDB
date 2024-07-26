import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import csrfProtection from "../middlewares/csrf.middleware.js";

const router = express.Router();

router.get("/get-all-users", csrfProtection, getAllUsers);
router.get("/get-user", csrfProtection, getUser);
router.patch("/update-user", csrfProtection, updateUser);
router.delete("/remove-user", csrfProtection, deleteUser);

export default router;
