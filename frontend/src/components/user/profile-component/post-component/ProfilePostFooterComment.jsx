import React, { Fragment, useState } from "react";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const ProfilePostFooterComment = () => {
  const [isComment, setIsComment] = useState(false);

  return (
    <Fragment>
      {isComment ? <AddCommentIcon /> : <ChatBubbleOutlineIcon />}
    </Fragment>
  );
};

export default ProfilePostFooterComment;
