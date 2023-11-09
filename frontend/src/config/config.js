export const API_CONTENT_TYPE_LIST = {
  application_json: "application/json",
  application_x_www_form_urlencoded: "application/x-www-form-urlencoded",
};

const USER_API = "/api/user";

export const API_URL = {
  auth: {
    post: {
      login: `${USER_API + "/auth/login"}`,
      register: `${USER_API + "/auth/register"}`,
    },
    put: {
      logout: `${USER_API + "/auth/logout"}`,
    },
  },
  profile: {
    get: {
      user_profile: `${USER_API + "/profile"}`,
      profile_post: `${USER_API + "/profile/posts"}`,
    },
    post: {
      add_post: `${USER_API + "/profile/add_post"}`,
    },
    put: {
      updateUserProfileInfo: `${USER_API + "/profile/profile_info_data"}`,
      updateUserProfileImage: `${USER_API + "/profile/update_profile_image"}`,
    },
  },
  settings: {
    get: {
      acticity_log: `${USER_API + "/settings/active_log"}`,
    },
    put: {
      user_password_update: `${USER_API + "/settings/update_password"}`,
    },
  },
  friend: {
    get: {
      user_profile_for_request: `${USER_API + "/friend/user/"}`,
      friend_request: `${USER_API + "/friend/request"}`,
      get_send_requests: `${USER_API + "/friend/get_send_request"}`,
    },
    post: {
      friend_request: `${USER_API + "/friend/send_friend_request"}`,
    },
    put: {
      friend_request_response: `${USER_API + "/friend/response"}`,
      friend_request_remove: `${USER_API + "/friend/remove_request"}`,
    },
  },
};
