import React, { Fragment } from "react";
import { ProfilePostBodyImage, ProfilePostBodyText } from "./ProfilePostStyle";

const ProfilePostBodyComponent = ({ text, image }) => {
  return (
    <Fragment>
      {text && (
        <ProfilePostBodyText>
          <h4>{text} </h4>
        </ProfilePostBodyText>
      )}
      {image !== "" && (
        <ProfilePostBodyImage image={image}></ProfilePostBodyImage>
      )}
    </Fragment>
  );
};

export default ProfilePostBodyComponent;
