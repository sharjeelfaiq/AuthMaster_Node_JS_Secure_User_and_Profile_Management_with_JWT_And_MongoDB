import createError from "http-errors";
import { logger } from "../utils/utils.js";

const validateMiddleware = (schema) => async (req, res, next) => {
  try {
    const { value, error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      logger.warn({
        message: "Validation failed",
        method: req.method,
        url: req.originalUrl,
        errors: errorMessages,
      });

      return res.status(400).json({ errors: errorMessages });
    }

    req.body = value;

    next();
  } catch (err) {
    logger.error({
      message: "Unexpected error in validation middleware",
      error: err.message,
      stack: err.stack,
    });

    next(createError(500, "Internal Server Error"));
  }
};

export default validateMiddleware;
