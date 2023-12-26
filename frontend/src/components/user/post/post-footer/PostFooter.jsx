import React, { Fragment } from "react";
import { PostFooter } from "../PostStyle";
import PostFooterLike from "./like/PostFooterLike";
import PostStatistic from "./statistic/PostStatistic";
import PostFooterComment from "./comment/PostFooterComment";
import AddCommentField from "./AddCommentField";

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
  gender,
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

          {window.location.pathname == "/profile" && (
            <PostStatistic
              token={token}
              postId={postId}
              borderColor={list}
              gender={gender}
            />
          )}
        </div>
      </PostFooter>
      {isOpenCommentField && (
        <AddCommentField
          commentText={commentText}
          setCommentText={setCommentText}
          handleCommentSubmit={handleCommentSubmit}
        />
      )}
    </Fragment>
  );
};

export default PostFooterComponent;
