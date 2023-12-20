import React from "react";
import { AddPostFooter } from "../ProfileAddPostStyle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CreatePostOrStoryButton from "../post-body/CreatePostOrStoryButton";

const AddPostFooterComponent = ({
  borderColor,
  file,
  text,
  friendList,
  token,
}) => {
  return (
    <AddPostFooter borderColor={borderColor}>
      <div>
        <FavoriteBorderIcon />
        <ChatBubbleOutlineIcon />
      </div>
      <div
        style={{
          width: "255px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CreatePostOrStoryButton
          file={file}
          text={text}
          token={token}
          friendList={friendList}
          buttonText={"Create Post"}
          buttonType={"post"}
        />
        <h4>OR</h4>
        <CreatePostOrStoryButton
          file={file}
          text={text}
          token={token}
          friendList={friendList}
          buttonText={"Create Story"}
          buttonType={"story"}
        />
      </div>
    </AddPostFooter>
  );
};

export default AddPostFooterComponent;
