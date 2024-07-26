import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  verbose: "cyan",
  debug: "magenta",
  silly: "grey",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(
    ({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`
  )
);

const logger = winston.createLogger({
  levels,
  format,
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    // new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
