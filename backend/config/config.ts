import {
  config_env_CLOUDINARY_API_KEY,
  config_env_CLOUDINARY_API_SECRET,
  config_env_CLOUDINARY_CLOUD_NAME,
  config_env_JWT_TOKEN,
  config_env_MONGODB,
  config_env_NODE_ENV,
  config_env_PORT,
} from "./configValues";

const config = {
  env: config_env_NODE_ENV,
  port: config_env_PORT,
  jwtToken: config_env_JWT_TOKEN,
  mongodb: config_env_MONGODB,
  cloudinary: {
    cloudName: config_env_CLOUDINARY_CLOUD_NAME,
    apiKey: config_env_CLOUDINARY_API_KEY,
    apiSecret: config_env_CLOUDINARY_API_SECRET,
  },
};

export default config;
