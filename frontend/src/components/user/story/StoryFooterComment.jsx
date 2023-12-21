// StoryFooterComment.js
import React, { Fragment } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const StoryFooterComment = ({
  userAlreadyComment,
  toggleComment,
  storyId,
  isOpenCommentField,
}) => {
  const show = userAlreadyComment.includes(storyId) || isOpenCommentField;

  return (
    <Fragment>
      {show ? (
        <ChatBubbleIcon onClick={toggleComment} />
      ) : (
        <ChatBubbleOutlineIcon onClick={toggleComment} />
      )}
    </Fragment>
  );
};

export default StoryFooterComment;
