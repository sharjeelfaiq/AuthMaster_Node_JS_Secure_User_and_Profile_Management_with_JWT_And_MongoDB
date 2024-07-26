import createError from "http-errors";
import logger from "../utils/logger.utils.js";

const validateMiddleware = (schema) => async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }
    next();
  } catch (error) {
    logger.error("Validation error:", error.message);
    next(createError(500, "Validation Middleware Error"));
  }
};

export default validateMiddleware;
