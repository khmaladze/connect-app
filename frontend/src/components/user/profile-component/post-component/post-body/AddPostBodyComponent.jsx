import React, { Fragment } from "react";
import { AddPostImageBody, AddPostTextBody } from "../ProfileAddPostStyle";
import AddPostText from "./AddPostText";
import { Grid } from "@mui/material";
import FriendListDropdown from "../../../FriendListDropdown";
import { friendListData } from "../../../../../api/user/Api";
import FileImageVideoUploader from "../../../../image-video-uploader/ImageVideoUploader";

const AddPostBodyComponent = ({
  friendList,
  text,
  setText,
  file,
  setFile,
  setFriendList,
}) => {
  return (
    <Fragment>
      <AddPostTextBody style={{ maxWidth: "700px", width: "100%" }}>
        <AddPostText
          style={{ maxWidth: "700px", width: "100%" }}
          friendList={friendList}
          text={text}
          setText={setText}
        />
      </AddPostTextBody>
      <AddPostImageBody>
        <Grid item xs={12}>
          <h4 style={{ cursor: "pointer" }}>Upload Image or Video</h4>
          <FileImageVideoUploader files={file} setFiles={setFile} />
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
