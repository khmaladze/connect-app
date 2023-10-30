export const API_CONTENT_TYPE_LIST = {
  application_json: "application/json",
  application_x_www_form_urlencoded: "application/x-www-form-urlencoded",
};

export const API_URL = {
  auth: {
    login: "/api/user/auth/login",
    logout: "/api/user/auth/logout",
    register: "/api/user/auth/register",
  },
  profile: {
    userprofileget: "/api/user/profile",
    updateUserProfileInfo: "/api/user/profile/profile_info_data",
    updateUserProfileImage: "/api/user/profile/update_profile_image",
    updateUserPassword: "/api/user/profile/update_password",
    addpost: "/api/user/profile/add_post",
    profileGetPost: "/api/user/profile/posts",
  },
  settings: {
    acticitylog: "/api/user/settings/active_log",
  },
};
