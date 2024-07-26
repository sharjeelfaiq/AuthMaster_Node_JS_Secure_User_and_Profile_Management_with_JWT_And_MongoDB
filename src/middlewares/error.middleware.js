import logger from "../utils/logger.utils.js";

const errorHandler = (err, _req, res, _next) => {
  // Log the error with stack trace
  logger.error(`[${new Date().toISOString()}] ${err.stack || err.message}`);

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: statusCode,
    message,
  });
};

export default errorHandler;
