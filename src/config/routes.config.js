import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authRoutes from "../routes/auth.routes.js";
import emailRoutes from "../routes/email.routes.js";
import userRoutes from "../routes/user.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/email", emailRoutes);
router.use("/user", authMiddleware, userRoutes);

router.use("*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

const apiRouter = express.Router();
apiRouter.use("/api/v1", router);

const configRoutes = (app) => {
  app.use(apiRouter);
};

export default configRoutes;
