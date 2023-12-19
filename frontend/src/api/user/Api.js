import axios from "axios";
import { toast } from "react-toastify";
import manImage from "../../images/man-profile.jpg";
import girlImage from "../../images/girl-profile.jpg";

export const friendListData = ["Friend", "CloseFriend", "Favorite"];

// Constants for local storage keys related to user authentication
export const userLocalstorage = {
  auth: {
    user: "user",
    userProfileInfoData: "userProfileInfoData",
  },
};

// Messages related to user authorization errors
const userAuthorizationMessage = {
  session_not_found: "Session not found",
  session_expired: "Session expired",
  not_authorized: "Not authorized",
  not_authorized_no_token: "Not authorized, no token",
  user_required: "User required",
  error_you_are_not_user_user_not_found:
    "Error, You are not a user. User not found",
};

// Clear user authentication-related data from local storage
const clearUserAuthLocalstorage = () => {
  Object.values(userLocalstorage.auth).forEach((value) =>
    localStorage.removeItem(value)
  );
};

// Constants for API request types
export const apiRequestType = {
  get: "GET",
  post: "POST",
  put: "PUT",
};

// Function to handle API requests
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
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };

    let axiosResponse;

    switch (method.toUpperCase()) {
      case apiRequestType.get:
        axiosResponse = await axios.get(request, token && axiosConfig);
        break;
      case apiRequestType.post:
        axiosResponse = await axios.post(
          request,
          postData,
          token && axiosConfig
        );
        break;
      case apiRequestType.put:
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

// Set data in local storage
export const setLocalstorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

// Function to determine user profile image based on gender and provided image
const userProfileImage = (gender, image) => {
  if (!image) return gender === "female" ? girlImage : manImage;
  return image;
};

// Action to take when the user is not authorized (e.g., session expired)
const userNotAuthorizedAction = (error) => {
  const { message } = error.response.data;

  if (Object.values(userAuthorizationMessage).includes(message)) {
    setTimeout(() => {
      clearUserAuthLocalstorage();
      window.location.reload();
    }, 1500);
  }
};

// Export relevant functions and constants
export { userProfileImage, clearUserAuthLocalstorage };
