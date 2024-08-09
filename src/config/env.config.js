import dotenv from "dotenv";

const configEnv = () => {
  // eslint-disable-next-line no-undef
  const { NODE_ENV } = process.env;
  const envFile =
    NODE_ENV === "production"
      ? ".env.production"
      : NODE_ENV === "development"
      ? ".env.development"
      : ".env";

  const result = dotenv.config({ path: envFile });
  if (result.error) {
    throw new Error(`Failed to load environment variables from ${envFile}`);
  }
};

export default configEnv;
