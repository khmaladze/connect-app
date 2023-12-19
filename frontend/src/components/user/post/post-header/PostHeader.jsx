import React from "react";
import { Avatar } from "@mui/material";
import { userProfileImage } from "../../../../api/user/Api";
import { PostHeader, PostHeaderContainer, PostHeaderDiv } from "../PostStyle";
import DeletePostComponent from "./DeletePostComponent";

const PostHeaderComponent = ({
  gender,
  profileImage,
  firstname,
  lastname,
  createdAt,
  list,
  postId,
  token,
  profilePosts,
  setProfilePosts,
}) => {
  return (
    <PostHeader borderColor={list}>
      <PostHeaderContainer>
        <Avatar
          style={{ height: "55px", width: "55px" }}
          alt="user"
          src={userProfileImage(gender, profileImage)}
        />
        <PostHeaderDiv />
        <h3>{firstname + " " + lastname}</h3>
      </PostHeaderContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>{createdAt && createdAt}</h3>
        <DeletePostComponent
          postId={postId}
          token={token}
          profilePosts={profilePosts}
          setProfilePosts={setProfilePosts}
        />
      </div>
    </PostHeader>
  );
};

export default PostHeaderComponent;
