import React from "react";
import {
  ProfilePostHeader,
  ProfilePostHeaderContainer,
  ProfilePostHeaderDiv,
} from "./ProfilePostStyle";
import { Avatar } from "@mui/material";
import { userProfileImage } from "../../../../api/user/Api";

const ProfilePostHeaderComponent = ({
  gender,
  profileImage,
  firstname,
  lastname,
  createdAt,
  list,
}) => {
  return (
    <ProfilePostHeader borderColor={list}>
      <ProfilePostHeaderContainer>
        <Avatar
          style={{ height: "55px", width: "55px" }}
          alt="user"
          src={userProfileImage(gender, profileImage)}
        />
        <ProfilePostHeaderDiv />
        <h3>{firstname + " " + lastname}</h3>
      </ProfilePostHeaderContainer>
      <h3>{createdAt && createdAt}</h3>
    </ProfilePostHeader>
  );
};

export default ProfilePostHeaderComponent;
