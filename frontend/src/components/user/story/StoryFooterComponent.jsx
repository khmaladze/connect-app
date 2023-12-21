import React from "react";
import StoryFooterLike from "./StoryFooterLike";
import { PostFooter } from "../post/PostStyle";

const StoryFooterComponent = ({ token, borderColor, comment }) => {
  return (
    <PostFooter borderColor={borderColor}>
      <StoryFooterLike token={token} />
    </PostFooter>
  );
};

export default StoryFooterComponent;
