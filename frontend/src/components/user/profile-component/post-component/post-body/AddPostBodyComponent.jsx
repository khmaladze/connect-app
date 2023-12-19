import React, { Fragment } from "react";
import { AddPostImageBody, AddPostTextBody } from "../ProfileAddPostStyle";
import AddPostText from "./AddPostText";
import { Grid } from "@mui/material";
import ImageUploader from "../../../../image-uploader/ImageUploader";
import FriendListDropdown from "../../../FriendListDropdown";
import { friendListData } from "../../../../../api/user/Api";

const AddPostBodyComponent = ({
  friendList,
  text,
  setText,
  image,
  setImage,
  setFriendList,
}) => {
  return (
    <Fragment>
      <AddPostTextBody>
        <AddPostText friendList={friendList} text={text} setText={setText} />
      </AddPostTextBody>
      <AddPostImageBody>
        <Grid item xs={12}>
          <h4 style={{ cursor: "pointer" }}>Upload Image</h4>
          <ImageUploader
            files={image}
            setFiles={setImage}
          />
        </Grid>
      </AddPostImageBody>
      <AddPostImageBody>
        <FriendListDropdown
          friendList={friendList}
          friendListData={friendListData}
          setFriendList={setFriendList}
        />
      </AddPostImageBody>
    </Fragment>
  );
};

export default AddPostBodyComponent;
