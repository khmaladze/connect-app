import React from "react";
import { Avatar, Typography } from "@mui/material";
import { CommentContainer, CommentContainerMain } from "../../PostStyle";
import PostDeleteComment from "./PostDeleteComment";

const PostCommentComponent = ({
  comment,
  list,
  profileImage,
  postId,
  token,
  deleteUserPostCommenthandle,
}) => {
  return (
    <CommentContainerMain key={comment._id} borderColor={list}>
      <Avatar src={profileImage} />
      {/* <UsernameContainer>{username}</UsernameContainer> */}
      <CommentContainer>
        <Typography variant="p">comment: {comment.comment}</Typography>
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
