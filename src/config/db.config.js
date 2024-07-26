import mongoose from "mongoose";
import logger from "../utils/logger.utils.js";

const configDB = async () => {
  try {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
      logger.info("Connected to MongoDB Database".magenta.bold);
    });

    const db = mongoose.connection;

    db.on("error", (err) => {
      logger.error("MongoDB connection error:".red.bold, err.message);
    });

    db.on("disconnected", () => {
      logger.warn("MongoDB disconnected".yellow.bold);
    });

    // eslint-disable-next-line no-undef
    process.on("SIGINT", async () => {
      await db.close();
      logger.info("MongoDB connection closed".red.bold);
      // eslint-disable-next-line no-undef
      process.exit(0);
    });
  } catch (error) {
    logger.error("MongoDB connection error:".red.bold, error.message);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

export default configDB;
