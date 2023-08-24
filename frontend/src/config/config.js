const config_api_user = "/api/user";
const config_api_user_auth = `${config_api_user}/user_auth`;
const config_api_user_profile = `${config_api_user}/user_profile`;
const config_api_user_settings = `${config_api_user}/user_settings`;

const config_user_auth = {
  login: `${config_api_user_auth}/login`,
  register: `${config_api_user_auth}/register`,
  logout: `${config_api_user_auth}/logout`,
};

const config_user_profile = {
  get_user_profile: `${config_api_user_profile}/get_user_profile`,
  update_user_profile_info_data: `${config_api_user_profile}/update_user_profile_info_data`,
  update_profile_image: `${config_api_user_profile}/update_profile_image`,
  update_profile_background_image: `${config_api_user_profile}/update_profile_background_image`,
  user_post: `${config_api_user_profile}/user_post`,
};

const config_user_settings = {
  user_active_log: `${config_api_user_settings}/user_active_log`,
  update_user_password: `${config_api_user_settings}/update_user_password`,
};

const config_user = {
  user_auth: config_user_auth,
  user_profile: config_user_profile,
  user_settings: config_user_settings,
};

export const API_URL = {
  user: config_user,
};

export const API_CONTENT_TYPE_LIST = {
  application_json: "application/json",
  application_x_www_form_urlencoded: "application/x-www-form-urlencoded",
};

export const API_CONTENT_TYPE = {
  user_login: API_CONTENT_TYPE_LIST.application_json,
  user_logout: API_CONTENT_TYPE_LIST.application_json,
  user_register: API_CONTENT_TYPE_LIST.application_json,
  user_profile_get: API_CONTENT_TYPE_LIST.application_json,
  update_user_profile_info_data: API_CONTENT_TYPE_LIST.application_json,
  update_user_profile_image:
    API_CONTENT_TYPE_LIST.application_x_www_form_urlencoded,
  update_user_background_image:
    API_CONTENT_TYPE_LIST.application_x_www_form_urlencoded,
};

const loginRequestUrl = API_URL.user.user_auth.login;
const logoutRequestUrl = API_URL.user.user_auth.logout;
const registerRequestUrl = API_URL.user.user_auth.register;
const userprofilegetRequestUrl = API_URL.user.user_profile.get_user_profile;
const updateUserProfileInfoRequestUrl =
  API_URL.user.user_profile.update_user_profile_info_data;
const updateUserProfileImageRequestUrl =
  API_URL.user.user_profile.update_profile_image;
const updateUserProfileBackgroundImageRequestUrl =
  API_URL.user.user_profile.update_profile_background_image;
const acticitylogRequestUrl = API_URL.user.user_settings.user_active_log;
const updateUserPasswordRequestUrl =
  API_URL.user.user_settings.update_user_password;

export const API_URL_REQUEST = {
  loginRequestUrl: loginRequestUrl,
  logoutRequestUrl: logoutRequestUrl,
  registerRequestUrl: registerRequestUrl,
  userprofilegetRequestUrl: userprofilegetRequestUrl,
  updateUserProfileInfoRequestUrl: updateUserProfileInfoRequestUrl,
  updateUserProfileImageRequestUrl: updateUserProfileImageRequestUrl,
  updateUserProfileBackgroundImageRequestUrl:
    updateUserProfileBackgroundImageRequestUrl,
  acticitylogRequestUrl: acticitylogRequestUrl,
  updateUserPasswordRequestUrl: updateUserPasswordRequestUrl,
};
