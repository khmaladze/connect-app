import { Grid, Typography } from "@mui/material";
import React from "react";
import { CustomTextarea } from "../ProfileAddPostStyle";

const AddPostText = ({ friendList, text, setText }) => {
  return (
    <Typography gutterBottom variant="h5" component="div">
      <Grid item xs={12}>
        <CustomTextarea
          placeholder="Add Text"
          borderColor={friendList}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Grid>
    </Typography>
  );
};

export default AddPostText;
