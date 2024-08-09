import createError from "http-errors";
import logger from "./logger.utils.js";

export const handleError = (action, error) => {
  logger.error(`${action}: ${error.message}`);
  return createError(error.status || 500, error.message || `${action} failed`);
}