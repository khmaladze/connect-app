import React, { Fragment } from "react";
import { PostFooter } from "../PostStyle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PostStatistic from "./statistic/PostStatistic";
import PostFooterComment from "./comment/PostFooterComment";
import PostFooterLike from "./like/PostFooterLike";

const PostFooterComponent = ({
  list,
  postId,
  token,
  isOpenCommentField,
  commentText,
  setCommentText,
  handleCommentSubmit,
  toggleComment,
  userAlreadyComment,
}) => {
  return (
    <Fragment>
      <PostFooter borderColor={list}>
        <div>
          {/* Profile post footer like component */}
          <PostFooterLike token={token} postId={postId} />
          <div style={{ width: "10px" }}></div>

          {/* Profile post footer comment component */}
          <PostFooterComment
            userAlreadyComment={userAlreadyComment}
            toggleComment={toggleComment}
          />
          <div style={{ width: "10px" }}></div>

          <PostStatistic token={token} postId={postId} borderColor={list} />
        </div>
      </PostFooter>
      {isOpenCommentField && (
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

export default PostFooterComponent;
