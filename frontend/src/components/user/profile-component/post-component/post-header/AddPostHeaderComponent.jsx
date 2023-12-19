import React from "react";
import {
  AddPostHeader,
  AddPostHeaderContainer,
  AddPostHeaderDiv,
} from "../ProfileAddPostStyle";
import { Avatar } from "@mui/material";
import { userProfileImage } from "../../../../../api/user/Api";

const AddPostHeaderComponent = ({
  borderColor,
  gender,
  profileImage,
  firstname,
  lastname,
  postCreateDate,
}) => {
  return (
    <AddPostHeader borderColor={borderColor}>
      <AddPostHeaderContainer>
        <Avatar
          style={{ height: "55px", width: "55px" }}
          alt="user"
          src={userProfileImage(gender, profileImage)}
        />
        <AddPostHeaderDiv />
        <h3>{`${firstname} ${lastname}`}</h3>
      </AddPostHeaderContainer>
      <h3>{postCreateDate}</h3>
    </AddPostHeader>
  );
};

export default AddPostHeaderComponent;
