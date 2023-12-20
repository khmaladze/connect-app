import React from "react";
import { Avatar, Typography } from "@mui/material";
import { CommentContainer, CommentContainerMain } from "../../PostStyle";
import PostDeleteComment from "./PostDeleteComment";
import { userProfileImage } from "../../../../../api/user/Api";

const PostCommentComponent = ({
  comment,
  list,
  profileImage,
  postId,
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
      <PostDeleteComment
        postId={postId}
        token={token}
        deleteUserPostCommenthandle={deleteUserPostCommenthandle}
      />
    </CommentContainerMain>
  );
};

export default PostCommentComponent;
