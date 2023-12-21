import React from "react";
import { CommentContainer, CommentContainerMain } from "../post/PostStyle";
import { Avatar, Typography } from "@mui/material";
import { userProfileImage } from "../../../api/user/Api";
import StoryDeleteComment from "./StoryDeleteComment";

const StoryComment = ({
  comment,
  list,
  profileImage,
  storyId,
  token,
  deleteUserPostCommenthandle,
  gender,
}) => {
  return (
    <CommentContainerMain key={comment._id} borderColor={list}>
      <Avatar
        style={{
          cursor: "pointer",
        }}
        src={userProfileImage(gender, profileImage)}
      />
      {/* <UsernameContainer>{username}</UsernameContainer> */}
      <CommentContainer>
        <Typography
          style={{
            cursor: "pointer",
          }}
          variant="p"
        >
          comment: {comment.comment}
        </Typography>
      </CommentContainer>
      <StoryDeleteComment
        storyId={storyId}
        token={token}
        deleteUserPostCommenthandle={deleteUserPostCommenthandle}
      />
    </CommentContainerMain>
  );
};

export default StoryComment;
