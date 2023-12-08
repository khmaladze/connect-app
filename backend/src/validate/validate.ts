// Messages for validating environment variables
const envValidMessages = {
  isValidEnvMessage:
    "Error: Please create and configure the '.env' file with the following variables:",
  node_env:
    " - NODE_ENV: The environment mode (e.g., 'development', 'production')",
  port: " - PORT: The port number for the server to listen on",
  jwt_token: " - JWT_TOKEN: The secret used to sign and verify JSON web tokens",
  mongodb: " - MONGODB: The connection string for your MongoDB database",
  cloudinary_cloud_name: " - CLOUDINARY_CLOUD_NAME: The Cloudinary cloud name",
  cloudinary_api_key: " - CLOUDINARY_API_KEY: The Cloudinary API key",
  cloudinary_api_secret: " - CLOUDINARY_API_SECRET: The Cloudinary API secret",
};

// Function to check if all required environment variables are defined
const isValidEnv = () => {
  return (
    process.env.NODE_ENV &&
    process.env.PORT &&
    process.env.JWT_TOKEN &&
    process.env.MONGODB &&
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

// Generate detailed error message for missing environment variables
const detailMessage = () => {
  if (!isValidEnv()) {
    console.log(envValidMessages.isValidEnvMessage);
    console.log("{");

    // Check and log each missing environment variable
    if (!process.env.NODE_ENV) console.log(envValidMessages.node_env);
    if (!process.env.PORT) console.log(envValidMessages.port);
    if (!process.env.JWT_TOKEN) console.log(envValidMessages.jwt_token);
    if (!process.env.MONGODB) console.log(envValidMessages.mongodb);
    if (!process.env.CLOUDINARY_CLOUD_NAME)
      console.log(envValidMessages.cloudinary_cloud_name);
    if (!process.env.CLOUDINARY_API_KEY)
      console.log(envValidMessages.cloudinary_api_key);
    if (!process.env.CLOUDINARY_API_SECRET)
      console.log(envValidMessages.cloudinary_api_secret);

    console.log("}");
  }
};

export { isValidEnv, detailMessage };
