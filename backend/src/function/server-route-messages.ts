export const apiSuccessStatusMessage = {
  success: true,
  no_success: false,
};

export const registerUserMessage = {
  user_email_exist: "try another email",
  user_username_exist: "try another username",
  user_not_valid_date: "date is not valid",
  auth_user_register: "user register success",
};

export const loginUserMessage = {
  incorrect_email: "email not found, incorrect email",
  incorrect_password: "incorrect password",
  auth_user_login: "user login success",
};

export const userProfileMessage = {
  user_required: "user required",
  add_min_one_fields: "add min one fields",
  userprofile_data_success: "userprofile data add success",
  user_image_update_failed: "user image update failed",
  user_profileImage_update_success: "user profileImage update success",
};

export const multerImageMessage = {
  image_required: "image required",
};

export const userAuthorizationMessage = {
  user_not_found: "Error, You are not user. user not found",
  session_not_found: "Session not found",
  session_expired: "Session expired",
  not_authorized: "Not authorized",
  not_authorized_no_token: "Not authorized, no token",
};

export const userLogOutMessage = {
  user_log_out_success: "user log out success",
};

export const userSettingsUserActiveMessage = {
  get_user_log_success: "get user active log success",
  update_user_password_success: "update user password success",
};

export const userAddPostMessages = {
  user_required: "user required",
  add_text_or_image: "please add text or image",
  post_created_success: "post created success",
};

export const userSendFriendRequestMessage = {
  user_required: "user required",
  receiver_not_exists: "receiver not exists",
  friend_request_already_exists: "friend request already exists",
  person_already_send_you_request: "person already send you request",
  send_friend_request_success: "send friend request success",
};

export const userGetFriendRequestMessage = {
  user_required: "user required",
  get_friend_request_success: "get friend request success",
};

export const getUserFriendProfileMessage = {
  user_required: "user required",
  username_required: "username required",
  user_not_found: "user not found",
  user_get_success: "user get success",
};

export const getFriendSendRequestMessage = {
  user_required: "user required",
  get_send_request_success: "get send request success",
  you_have_not_send_request: "you_have_not_send_request",
};

export const serverErrorMessage = {
  server_error: "server error",
};
