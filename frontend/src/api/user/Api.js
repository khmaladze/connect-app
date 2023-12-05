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

export const apiRequestType = {
  get: "GET",
  post: "POST",
  put: "PUT",
};

export const apiRequest = async (
  method,
  message,
  request,
  token,
  postData,
  contentType
) => {
  try {
    const axiosConfig = {
      headers: {
        "Content-Type": contentType ? contentType : "application/json",
        Authorization: token ? "Bearer " + token : undefined,
      },
    };

    let axiosResponse;

    switch (method.toUpperCase()) {
      case "GET":
        axiosResponse = await axios.get(request, token && axiosConfig);
        break;
      case "POST":
        axiosResponse = await axios.post(
          request,
          postData,
          token && axiosConfig
        );
        break;
      case "PUT":
        axiosResponse = await axios.put(
          request,
          postData,
          token && axiosConfig
        );
        break;
      default:
        throw new Error("Invalid HTTP method");
    }

    const response = axiosResponse.data;

    if (response?.success) {
      if (message) {
        toast.success(response.message);
      }
      return response;
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
