import React from "react";
import StoryFooterLike from "./StoryFooterLike";
import { PostFooter } from "../post/PostStyle";

const StoryFooterComponent = ({ token, borderColor, comment, storyId }) => {
  return (
    <PostFooter borderColor={borderColor}>
      <StoryFooterLike token={token} storyId={storyId} />
    </PostFooter>
  );
};

export default StoryFooterComponent;
