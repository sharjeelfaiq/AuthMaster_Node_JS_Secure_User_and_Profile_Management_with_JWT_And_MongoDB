import { logger } from "./utils/utils.js";
import colors from "colors";

// eslint-disable-next-line no-undef
const { PORT } = process.env;

const serverListener = (app) =>
  app.listen(PORT || 5000, () => {
    logger.info(`Server running on http://localhost:${PORT}`.cyan.bold);
  });

export default serverListener;
