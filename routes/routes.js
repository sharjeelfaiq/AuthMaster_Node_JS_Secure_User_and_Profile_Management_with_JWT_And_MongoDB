import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import verifyEamil from "./email.routes.js";

const router = express.Router();

router.use("/", authRoutes);
router.use("/", verifyEamil);
router.use("/users", authMiddleware, userRoutes);

const apiRouter = express.Router();
apiRouter.use("/v1", router);

export default apiRouter;
