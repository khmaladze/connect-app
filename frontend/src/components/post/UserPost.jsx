import React from "react";
import { Avatar } from "@mui/material";
import { userProfileImage } from "../../api/Api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCommentIcon from "@mui/icons-material/AddComment";
import {
  UserPostBodyImage,
  UserPostBodyText,
  UserPostContainer,
  UserPostDiv,
  UserPostFooter,
  UserPostHeader,
  UserPostHeaderContainer,
} from "./UserPostStyle";

const UserPost = ({
  firstname,
  lastname,
  text,
  image,
  profileImage,
  createdAt,
  gender,
}) => {
  return (
    <UserPostContainer>
      <UserPostDiv>
        <UserPostHeader>
          <UserPostHeaderContainer>
            <Avatar
              style={{ height: "55px", width: "55px" }}
              alt="user"
              src={userProfileImage(gender, profileImage)}
            />
            <h3>{firstname + " " + lastname}</h3>
          </UserPostHeaderContainer>
          <h3>{createdAt.slice(0, 10)}</h3>
        </UserPostHeader>
        {text && (
          <UserPostBodyText>
            <h4>{text} </h4>
          </UserPostBodyText>
        )}
        {image !== "" && <UserPostBodyImage image={image}></UserPostBodyImage>}
        <UserPostFooter>
          <div>
            <FavoriteBorderIcon />
            <AddCommentIcon />
          </div>
        </UserPostFooter>
      </UserPostDiv>
    </UserPostContainer>
  );
};

export default UserPost;
