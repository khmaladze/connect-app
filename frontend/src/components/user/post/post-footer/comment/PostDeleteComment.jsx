import React from "react";
import { Button, Grid } from "@mui/material";
import MyModal from "../../../modal/MyModal";

const PostDeleteComment = ({ deleteUserPostCommenthandle, postId, token }) => {
  return (
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
  );
};

export default PostDeleteComment;
