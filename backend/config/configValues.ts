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

const config_api_user: string = "/api/user";
const config_api_user_auth: string = `${config_api_user}/user_auth`;
const config_api_user_profile: string = `${config_api_user}/user_profile`;
const config_api_user_settings: string = `${config_api_user}/user_settings`;

const config_user_auth = {
  path: config_api_user_auth,
  login: `${config_api_user_auth}/login`,
  register: `${config_api_user_auth}/register`,
  logout: `${config_api_user_auth}/logout`,
  index: {
    login: "/login",
    register: "/register",
    logout: "/logout",
  },
};

const config_user_profile = {
  path: config_api_user_profile,
  get_user_profile: `${config_api_user_profile}/get_user_profile`,
  update_user_profile_info_data: `${config_api_user_profile}/update_user_profile_info_data`,
  update_profile_image: `${config_api_user_profile}/update_profile_image`,
  update_profile_background_image: `${config_api_user_profile}/update_profile_background_image`,
  user_post: `${config_api_user_profile}/user_post`,
  index: {
    get_user_profile: "/get_user_profile",
    update_user_profile_info_data: "/update_user_profile_info_data",
    update_profile_image: "/update_profile_image",
    update_profile_background_image: "/update_profile_background_image",
    user_post: "/user_post",
  },
};

const config_user_settings = {
  path: config_api_user_settings,
  user_active_log: `${config_api_user_settings}/user_active_log`,
  update_user_password: `${config_api_user_settings}/update_user_password`,
  index: {
    user_active_log: "/user_active_log",
    update_user_password: "/update_user_password",
  },
};

const config_user = {
  user_auth: config_user_auth,
  user_profile: config_user_profile,
  user_settings: config_user_settings,
};

const config_api = {
  user: config_user,
};

export {
  config_env_NODE_ENV,
  config_env_PORT,
  config_env_JWT_TOKEN,
  config_env_MONGODB,
  config_env_CLOUDINARY_CLOUD_NAME,
  config_env_CLOUDINARY_API_KEY,
  config_env_CLOUDINARY_API_SECRET,
  config_api,
};
