import { Button, TextField } from "@mui/material";
import React from "react";

const AddCommentField = ({
  commentText,
  setCommentText,
  handleCommentSubmit,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "75px",
        width: "100%",
        padding: "10px",
      }}
    >
      <TextField
        style={{
          width: "70%",
          height: "37px",
        }}
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
      />
      <Button
        style={{
          height: "50px",
        }}
        onClick={handleCommentSubmit}
        color="primary"
      >
        Submit
      </Button>
    </div>
  );
};

export default AddCommentField;
