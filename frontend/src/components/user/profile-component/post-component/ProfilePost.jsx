import React from "react";
import { Avatar } from "@mui/material";
import { userProfileImage } from "../../../../api/user/Api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCommentIcon from "@mui/icons-material/AddComment";
import {
  ProfilePostBodyImage,
  ProfilePostBodyText,
  ProfilePostContainer,
  ProfilePostDiv,
  ProfilePostFooter,
  ProfilePostHeader,
  ProfilePostHeaderContainer,
  ProfilePostHeaderDiv,
} from "./ProfilePostStyle";

const ProfilePost = ({
  firstname,
  lastname,
  text,
  image,
  profileImage,
  createdAt,
  gender,
}) => {
  return (
    <ProfilePostContainer>
      <ProfilePostDiv>
        <ProfilePostHeader>
          <ProfilePostHeaderContainer>
            <Avatar
              style={{ height: "55px", width: "55px" }}
              alt="user"
              src={userProfileImage(gender, profileImage)}
            />
            <ProfilePostHeaderDiv />
            <h3>{firstname + " " + lastname}</h3>
          </ProfilePostHeaderContainer>
          <h3>{createdAt.slice(0, 10)}</h3>
        </ProfilePostHeader>
        {text && (
          <ProfilePostBodyText>
            <h4>{text} </h4>
          </ProfilePostBodyText>
        )}
        {image !== "" && (
          <ProfilePostBodyImage image={image}></ProfilePostBodyImage>
        )}
        <ProfilePostFooter>
          <div>
            <FavoriteBorderIcon />
            <AddCommentIcon />
          </div>
        </ProfilePostFooter>
      </ProfilePostDiv>
    </ProfilePostContainer>
  );
};

export default ProfilePost;
