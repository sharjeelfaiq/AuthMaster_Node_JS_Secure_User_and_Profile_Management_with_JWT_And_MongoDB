import logger from "./utils/logger.utils.js";

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;

const serverListener = (app) => app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`.cyan.bold);
});

export default serverListener;