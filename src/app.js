import express from "express";
import configMiddleware from "./config/middleware.config.js";
import configDB from "./config/db.config.js";
import configRoutes from "./config/routes.config.js";
import errorHandler from "./middlewares/error.middleware.js";
import serverListener from "./server.js";

const app = express();

configMiddleware(app);
configDB();
configRoutes(app);

app.use(errorHandler)

serverListener(app);

export default app;
