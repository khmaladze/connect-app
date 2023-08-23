import config from "../config/config";

interface Config {
  env: string;
  port: number;
  jwtToken: string;
  mongodb: string;
  backend_api: {
    user: string;
  };
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
}

// Check if environment variable exists
const isEnvVariableExist = (
  variableName: keyof Config,
  displayName: string
): boolean => {
  if (config[variableName]) {
    return true;
  } else {
    return false;
  }
};

// Check if all required environment variables are present
const isValidEnv = (): boolean => {
  return (
    isEnvVariableExist("env", "NODE_ENV") &&
    isEnvVariableExist("port", "PORT") &&
    isEnvVariableExist("jwtToken", "JWT_TOKEN") &&
    isEnvVariableExist("mongodb", "MONGODB") &&
    isEnvVariableExist("cloudinary", "CLOUDINARY_CLOUD_NAME") &&
    isEnvVariableExist("cloudinary", "CLOUDINARY_API_KEY") &&
    isEnvVariableExist("cloudinary", "CLOUDINARY_API_SECRET")
  );
};

const envValidMessages = {
  isValidEnvMessage:
    "Error: Please create and configure the '.env' file with the following variables:",
  node_env:
    " - NODE_ENV: The environment mode (e.g., 'development', 'production')",
  port: " - PORT: The port number for the server to listen on",
  jwt_token: " - JWT_TOKEN: The secret used to sign and verify JSON web tokens",
  mongodb: " - MONGODB: The connection string for your MongoDB database",
  cloudinary_cloud_name: " - CLOUDINARY_CLOUD_NAME: The cloudinary cloud name",
  cloudinary_api_key: " - CLOUDINARY_API_KEY: The cloudinary API key",
  cloudinary_api_secret: " - CLOUDINARY_API_SECRET: The cloudinary API secret",
};

// Generate detailed error message for missing environment variables
const detailMessage = () => {
  if (!isValidEnv()) {
    console.log(envValidMessages.isValidEnvMessage);
    console.log("{");
    isEnvVariableExist("env", "NODE_ENV") ||
      console.log(envValidMessages.node_env);
    isEnvVariableExist("port", "PORT") || console.log(envValidMessages.port);
    isEnvVariableExist("jwtToken", "JWT_TOKEN") ||
      console.log(envValidMessages.jwt_token);
    isEnvVariableExist("mongodb", "MONGODB") ||
      console.log(envValidMessages.mongodb);
    isEnvVariableExist("cloudinary", "CLOUDINARY_CLOUD_NAME") ||
      console.log(envValidMessages.cloudinary_cloud_name);
    isEnvVariableExist("cloudinary", "CLOUDINARY_API_KEY") ||
      console.log(envValidMessages.cloudinary_api_key);
    isEnvVariableExist("cloudinary", "CLOUDINARY_API_SECRET") ||
      console.log(envValidMessages.cloudinary_api_secret);
    console.log("}");
  }
};

export { isValidEnv, detailMessage };
