import express from "express";
import { authMiddleware } from "../middlewares/middlewares.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", authMiddleware, userRoutes);

const apiRouter = express.Router();
apiRouter.use("/v1", router);

export default apiRouter;
