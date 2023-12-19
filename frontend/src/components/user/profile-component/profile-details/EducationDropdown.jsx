import React from "react";
import { education } from "../../../../data/userInfoData";
import ProfileDetailsDropdown from "./ProfileDetailsDropdown";

const EducationDropdown = ({ selectEducation, handleEducationChange }) => {
  return (
    <ProfileDetailsDropdown
      InputLabelText={"Degree"}
      selectId={"education"}
      data={education}
      selectValue={selectEducation}
      onChangeFunction={handleEducationChange}
    />
  );
};

export default EducationDropdown;
