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

export const API_URL = {
  loginRequestUrl: "/api/user/auth/login",
  logoutRequestUrl: "/api/user/auth/logout",
  registerRequestUrl: "/api/user/auth/register",
  userprofilegetRequestUrl: "/api/user/profile",
  updateUserProfileInfoRequestUrl: "/api/user/profile/profile_info_data",
  updateUserProfileImageRequestUrl: "/api/user/profile/update_profile_image",
  // updateUserProfileBackgroundImageRequestUrl:
  //   updateUserProfileBackgroundImageRequestUrl,
  acticitylogRequestUrl: "/api/user/settings/active_log",
  updateUserPasswordRequestUrl: "/api/user/profile/update_password",
  addpost: "/api/user/profile/add_post",
};
