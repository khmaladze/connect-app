import React from "react";
import { passions } from "../../../../data/userInfoData";
import ProfileDetailsDropdown from "./ProfileDetailsDropdown";

const PassionDropdown = ({ selectPassion, handlePassionChange }) => {
  return (
    <ProfileDetailsDropdown
      InputLabelText={"Passion"}
      selectId={"passion"}
      data={passions}
      selectValue={selectPassion}
      onChangeFunction={handlePassionChange}
    />
  );
};

export default PassionDropdown;
