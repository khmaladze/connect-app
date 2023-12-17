import React from "react";
import { CommentContainer, CommentContainerMain } from "./PostStyle";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import MyModal from "../../modal/MyModal";

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
      <MyModal
        title="Delete Post Comment"
        ButtonText={<span className="material-symbols-outlined">delete</span>}
        body={
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p>
                When you click 'Delete Post Comment' your comment will be
                permanently removed
              </p>
              <Button
                style={{
                  width: "100%",
                  marginTop: "10px",
                  color: "red",
                  borderColor: "red",
                }}
                variant="outlined"
                onClick={async () => {
                  await deleteUserPostCommenthandle(postId, token);
                }}
              >
                Delete Post Comment
              </Button>
            </Grid>
          </Grid>
        }
      />
    </CommentContainerMain>
  );
};

export default PostCommentComponent;
