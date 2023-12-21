import React from "react";
import MyModal from "../modal/MyModal";
import { Button, Grid } from "@mui/material";

const StoryDeleteComment = ({
  deleteUserPostCommenthandle,
  token,
  storyId,
}) => {
  return (
    <MyModal
      title="Delete Story Comment"
      ButtonText={<span className="material-symbols-outlined">delete</span>}
      body={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p>
              When you click 'Delete Story Comment' your comment will be
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
                await deleteUserPostCommenthandle(storyId, token);
              }}
            >
              Delete Story Comment
            </Button>
          </Grid>
        </Grid>
      }
    />
  );
};

export default StoryDeleteComment;
