import React, { Fragment } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
const ProfilePostFooterComment = ({ isComment, toggleComment }) => {
  return (
    <Fragment>
      {isComment ? (
        <ChatBubbleIcon onClick={toggleComment} />
      ) : (
        <ChatBubbleOutlineIcon onClick={toggleComment} />
      )}
    </Fragment>
  );
};

export default ProfilePostFooterComment;
