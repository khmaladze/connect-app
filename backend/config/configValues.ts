import dotenv from "dotenv";

dotenv.config();

const config_env_NODE_ENV: string = process.env.NODE_ENV || "";
const config_env_PORT: number = process.env.PORT
  ? Number(process.env.PORT)
  : 5000;
const config_env_JWT_TOKEN: string = process.env.JWT_TOKEN || "";
const config_env_MONGODB: string = process.env.MONGODB || "";
const config_env_CLOUDINARY_CLOUD_NAME: string =
  process.env.CLOUDINARY_CLOUD_NAME || "";
const config_env_CLOUDINARY_API_KEY: string =
  process.env.CLOUDINARY_API_KEY || "";
const config_env_CLOUDINARY_API_SECRET: string =
  process.env.CLOUDINARY_API_SECRET || "";

export {
  config_env_NODE_ENV,
  config_env_PORT,
  config_env_JWT_TOKEN,
  config_env_MONGODB,
  config_env_CLOUDINARY_CLOUD_NAME,
  config_env_CLOUDINARY_API_KEY,
  config_env_CLOUDINARY_API_SECRET,
};
