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
  chat: {
    get: {
      get_user: `${USER_API + "/message/user"}`,
      get_user_message: `${USER_API + "/message"}`,
    },
    post: {
      send_message: `${USER_API + "/message"}`,
    },
  },
  profile: {
    get: {
      user_profile: `${USER_API + "/profile"}`,
      profile_post: `${USER_API + "/profile/posts"}`,
      get_comment: `${USER_API + "/profile/comment"}`,
      get_likes_comments: `${USER_API + "/profile/post-like-comment"}`,
      get_story_likes_comments: `${USER_API + "/profile/story-like-comment"}`,
      profile_story: `${USER_API + "/profile/story"}`,
    },
    post: {
      add_post: `${USER_API + "/profile/add_post"}`,
      add_story: `${USER_API + "/profile/add_story"}`,
      delete_post: `${USER_API + "/profile/post/"}`,
      delete_story: `${USER_API + "/profile/story/"}`,
    },
    put: {
      updateUserProfileInfo: `${USER_API + "/profile/profile_info_data"}`,
      updateUserProfileImage: `${USER_API + "/profile/update_profile_image"}`,
    },
  },
  post: {
    get: {
      get_comment: `${USER_API + "/post/comment"}`,
      check_post_like: `${USER_API + "/post/check_post_like"}`,
      posts: `${USER_API + "/post/"}`,
    },
    post: {
      add_comment: `${USER_API + "/post/comment"}`,
      delete_post_comment: `${USER_API + "/post/comment/"}`,
      like_post: `${USER_API + "/post/like_post"}`,
      remove_post_like: `${USER_API + "/post/remove_post_like"}`,
    },
  },
  story: {
    get: {
      get_comment: `${USER_API + "/story/comment"}`,
      check_story_like: `${USER_API + "/story/check_story_like"}`,
      storys: `${USER_API + "/story/"}`,
    },
    post: {
      add_comment: `${USER_API + "/story/comment"}`,
      delete_story_comment: `${USER_API + "/story/comment/"}`,
      like_story: `${USER_API + "/story/like_story"}`,
      remove_story_like: `${USER_API + "/story/remove_story_like"}`,
      add_view: `${USER_API + "/story/story_view"}`,
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
      friend_list: `${USER_API + "/friend"}`,
    },
    post: {
      friend_request: `${USER_API + "/friend/send_friend_request"}`,
    },
    put: {
      friend_request_response: `${USER_API + "/friend/response"}`,
      friend_request_remove: `${USER_API + "/friend/remove_request"}`,
      friend_list_remove: `${USER_API + "/friend/remove"}`,
      friend_list_update: `${USER_API + "/friend/update-friend-list"}`,
    },
  },
  userprofile: {
    get: {
      userprofile: `${USER_API + "/userprofile/"}`,
    },
  },
};
