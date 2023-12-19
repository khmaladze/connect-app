import React from "react";
import {
  apiRequest,
  apiRequestType,
  setLocalstorage,
  userLocalstorage,
} from "../../../../api/user/Api";
import { API_CONTENT_TYPE_LIST, API_URL } from "../../../../config/config";
import { toast } from "react-toastify";
import CustomButton from "../CustomButton";

const ButtonUpdateUserImage = ({ image, token }) => {
  const updateUserImageHandle = async () => {
    if (!image || !image[0] || !image[0].file) {
      toast.error("Please add an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image[0].file);

    try {
      const response = await apiRequest(
        apiRequestType.put,
        true,
        API_URL.profile.put.updateUserProfileImage,
        token,
        formData,
        API_CONTENT_TYPE_LIST.application_x_www_form_urlencoded
      );

      if (response?.success) {
        const userProfileData = JSON.parse(
          localStorage.getItem(userLocalstorage.auth.user)
        );

        localStorage.removeItem(userLocalstorage.auth.user);
        setLocalstorage(userLocalstorage.auth.user, {
          ...userProfileData,
          ...response.data,
        });

        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  return (
    <CustomButton
      style={{ width: "100%", marginTop: "10px" }}
      varaint={"contained"}
      color={"primary"}
      onClickFuntion={updateUserImageHandle}
      buttonText={"Update"}
    />
  );
};

export default ButtonUpdateUserImage;
