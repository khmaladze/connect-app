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
  user_profileImage_update_success: "user profileImage update success",
  // user_backgroundImage_update_success: "user backgroundImage update success",
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

export const serverErrorMessage = {
  server_error: "server error",
};