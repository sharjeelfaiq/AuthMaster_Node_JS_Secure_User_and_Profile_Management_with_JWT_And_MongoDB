// error.middleware.js
import { logger } from "../utils/utils.js";

const errorHandler = (err, req, res, _next) => {
  logger.error({
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    message: err.message,
    stack: err.stack,
  });

  const statusCode = err.status || 500;
  const message =
    statusCode === 500
      ? "Something went wrong, please try again later."
      : err.message;

  res.status(statusCode).json({
    status: statusCode,
    message,
  });
};

export default errorHandler;
