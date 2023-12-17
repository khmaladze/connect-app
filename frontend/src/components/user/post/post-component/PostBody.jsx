import React, { Fragment } from "react";
import { PostBodyImage, PostBodyText } from "./PostStyle";

const ProfilePostBodyComponent = ({ text, image }) => {
  return (
    <Fragment>
      {text && (
        <PostBodyText>
          <h4>{text} </h4>
        </PostBodyText>
      )}
      {image !== "" && <PostBodyImage image={image}></PostBodyImage>}
    </Fragment>
  );
};

export default ProfilePostBodyComponent;
