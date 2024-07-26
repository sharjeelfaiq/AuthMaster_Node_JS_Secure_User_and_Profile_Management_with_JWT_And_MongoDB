import dotenv from "dotenv";

const configEnv = () => {
  // eslint-disable-next-line no-undef
  switch (process.env.NODE_ENV) {
    case "development":
      dotenv.config({ path: ".env.development" });
      break;
    case "production":
      dotenv.config({ path: ".env.production" });
      break;
    default:
      dotenv.config({ path: ".env" });
  }
}

export default configEnv;