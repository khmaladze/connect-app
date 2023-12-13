import React, { Fragment } from "react";
import { ProfilePostFooter } from "./ProfilePostStyle";
import ProfilePostFooterLike from "./ProfilePostFooterLike";
import ProfilePostFooterComment from "./ProfilePostFooterComment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ProfilePostFooterComponent = ({
  list,
  postId,
  token,
  isComment,
  commentText,
  setCommentText,
  commentBool,
  handleCommentSubmit,
  toggleComment,
}) => {
  return (
    <Fragment>
      <ProfilePostFooter borderColor={list}>
        <div>
          {/* Profile post footer like component */}
          <ProfilePostFooterLike token={token} postId={postId} />

          {/* Profile post footer comment component */}
          <ProfilePostFooterComment
            isComment={isComment}
            commentText={commentText}
            setCommentText={setCommentText}
            handleCommentSubmit={handleCommentSubmit}
            toggleComment={toggleComment}
            commentBool={commentBool}
          />
        </div>
      </ProfilePostFooter>
      {isComment && !commentBool && (
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
      )}
    </Fragment>
  );
};

export default ProfilePostFooterComponent;
