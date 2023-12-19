import React from "react";
import { languages } from "../../../../data/userInfoData";
import ProfileDetailsDropdown from "./ProfileDetailsDropdown";

const LanguageDropdown = ({ selectLanguage, handleLanguageChange }) => {
  return (
    <ProfileDetailsDropdown
      InputLabelText={"Language"}
      selectId={"language"}
      data={languages}
      selectValue={selectLanguage}
      onChangeFunction={handleLanguageChange}
    />
  );
};

export default LanguageDropdown;
