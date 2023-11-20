import axios from "axios";
import { toast } from "react-toastify";
import manImage from "../../images/man-profile.jpg";
import girlImage from "../../images/girl-profile.jpg";

export const userLocalstorage = {
  auth: {
    user: "user",
    userProfileInfoData: "userProfileInfoData",
  },
};

const userAuthorizationMessage = {
  session_not_found: "Session not found",
  session_expired: "Session expired",
  not_authorized: "Not authorized",
  not_authorized_no_token: "Not authorized, no token",
  error_you_are_not_user_user_not_found:
    "Error, You are not user. user not found",
};

const clearUserAuthLocalstorage = () => {
  for (let value of Object.values(userLocalstorage.auth)) {
    localStorage.removeItem(value);
  }
};

export const apiPostRequest = async (request, postData, token, contentType) => {
  try {
    const res = await axios.post(
      request,
      postData,
      token && {
        headers: {
          "Content-Type": contentType ? contentType : "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const response = res.data;
    if (response?.success) {
      toast.success(response.message);
      return res.data;
    }
  } catch (error) {
    if (error && error.response && error.response.data) {
      toast.error(error.response.data.message);
      userNotAuthorizedAction(error);
    }
  }
};

export const apiGetRequest = async (request, token) => {
  try {
    const res = await axios.get(
      request,
      token && {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const response = res.data;
    if (response.success) {
      return res.data;
    }
  } catch (error) {
    if (error && error.response && error.response.data) {
      toast.error(error.response.data.message);
      userNotAuthorizedAction(error);
    }
  }
};

export const apiPutRequest = async (request, postData, token, contentType) => {
  try {
    const res = await axios.put(
      request,
      postData,
      token && {
        headers: {
          "Content-Type": contentType ? contentType : "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const response = res.data;
    if (response.success) {
      toast.success(response.message);
      return res.data;
    }
  } catch (error) {
    if (error && error.response && error.response.data) {
      toast.error(error.response.data.message);
      userNotAuthorizedAction(error);
    }
  }
};

export const setLocalstorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

const userProfileImage = (gender, image) => {
  if (!image) return gender === "female" ? girlImage : manImage;
  return image;
};

const userNotAuthorizedAction = (error) => {
  if (
    error.response.data.message ===
      userAuthorizationMessage.session_not_found ||
    error.response.data.message === userAuthorizationMessage.session_expired ||
    error.response.data.message === userAuthorizationMessage.not_authorized ||
    error.response.data.message ===
      userAuthorizationMessage.not_authorized_no_token ||
    error.response.data.message ===
      userAuthorizationMessage.error_you_are_not_user_user_not_found
  ) {
    setTimeout(() => {
      clearUserAuthLocalstorage();
      window.location.reload();
    }, 1500);
  }
};

export { userProfileImage, clearUserAuthLocalstorage };
