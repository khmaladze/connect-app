import React, { Fragment } from "react";
import { PostBodyImage, PostBodyText } from "../PostStyle";
import PostBodyVideo from "./PostBodyVideo";

const ProfilePostBodyComponent = ({ text, media }) => {
  const mediaType = media.slice(media.length - 3, media.length);
  return (
    <Fragment>
      {text && (
        <PostBodyText>
          <h4>{text} </h4>
        </PostBodyText>
      )}
      {media.length > 0 && media !== "" && mediaType !== "mp4" ? (
        <PostBodyImage image={media}></PostBodyImage>
      ) : (
        media.length > 0 && <PostBodyVideo video={media} />
      )}
    </Fragment>
  );
};

export default ProfilePostBodyComponent;
