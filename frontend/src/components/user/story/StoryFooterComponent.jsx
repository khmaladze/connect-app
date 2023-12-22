import React, { Fragment } from "react";
import StoryFooterLike from "./StoryFooterLike";
import { PostFooter } from "../post/PostStyle";
import StoryFooterComment from "./StoryFooterComment";
import StoryComment from "./StoryComment";
import StoryStatistic from "./StoryStatistic";

const StoryFooterComponent = ({
  token,
  borderColor,
  storyId,
  toggleComment,
  deleteUserPostCommenthandle,
  commentsData,
  list,
  gender,
  currentStoryIndex,
  userAlreadyComment,
}) => {
  return (
    <Fragment>
      <PostFooter borderColor={borderColor}>
        <div>
          <StoryFooterLike
            token={token}
            storyId={storyId}
            currentStoryIndex={currentStoryIndex}
          />
          <div style={{ width: "10px" }}></div>
          <StoryFooterComment
            userAlreadyComment={userAlreadyComment}
            toggleComment={toggleComment}
            currentStoryIndex={currentStoryIndex}
            storyId={storyId}
          />
          <div style={{ width: "10px" }}></div>
          {window.location.pathname == "/profile" && (
            <StoryStatistic
              storyId={storyId}
              token={token}
              borderColor={list}
              gender={gender}
            />
          )}
        </div>
      </PostFooter>
      {commentsData &&
        commentsData
          .filter((comment) => comment.story_id === storyId)
          .map((filteredComment) => (
            <StoryComment
              key={filteredComment._id}
              comment={filteredComment}
              list={list}
              storyId={storyId}
              token={token}
              gender={gender}
              profileImage={filteredComment.author_profileImage}
              deleteUserPostCommenthandle={deleteUserPostCommenthandle}
              currentStoryIndex={currentStoryIndex}
            />
          ))}
    </Fragment>
  );
};

export default StoryFooterComponent;
