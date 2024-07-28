import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import csrfProtection from "../middlewares/csrf.middleware.js";

const router = express.Router();
router.use(csrfProtection);

router
  .get("/get-all-users", getAllUsers)
  .get("/get-user", getUser)
  .patch("/update-user", updateUser)
  .delete("/remove-user", deleteUser);

export default router;
