import React from "react";
import {
  apiRequest,
  apiRequestType,
  userLocalstorage,
} from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import { toast } from "react-toastify";
import CustomButton from "../CustomButton";

const ButtonUpdateUserInfo = ({
  selectLanguage,
  selectEducation,
  selectPassion,
  token,
}) => {
  const updateUserInfoHandle = async () => {
    try {
      if (!selectLanguage || !selectPassion || !selectEducation) {
        toast.error("Please fill in all the fields");
        return;
      }

      const postData = {
        languages: [selectLanguage],
        passions: [selectPassion],
        education: selectEducation,
      };

      const response = await apiRequest(
        apiRequestType.put,
        true,
        API_URL.profile.put.updateUserProfileInfo,
        token,
        postData
      );

      if (response?.success) {
        localStorage.removeItem(userLocalstorage.auth.userProfileInfoData);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <CustomButton
      style={{ width: "100%", marginTop: "10px" }}
      variant={"contained"}
      color={"primary"}
      onClickFuntion={updateUserInfoHandle}
      buttonText={"Update"}
    />
  );
};

export default ButtonUpdateUserInfo;
