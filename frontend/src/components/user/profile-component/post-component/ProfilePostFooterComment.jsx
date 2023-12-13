import React, { Fragment } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const ProfilePostFooterComment = ({ userAlreadyComment, toggleComment }) => {
  return (
    <Fragment>
      {userAlreadyComment ? (
        <ChatBubbleIcon onClick={toggleComment} />
      ) : (
        <ChatBubbleOutlineIcon onClick={toggleComment} />
      )}
    </Fragment>
  );
};

export default ProfilePostFooterComment;
