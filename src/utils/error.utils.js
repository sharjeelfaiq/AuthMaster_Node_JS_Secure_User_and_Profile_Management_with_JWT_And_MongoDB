import createError from "http-errors";
import logger from "./logger.utils.js";

export const handleServiceError = (action, error) => {
  logger.error(`${action}: ${error.message}`);
  throw createError(error.status || 500, error.message || `${action} failed`);
};

export const handleControllerError = (action, error) => {
  logger.error(`${action}: ${error.message}`);
  return createError(error.status || 500, error.message || `${action} failed`);
}