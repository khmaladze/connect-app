import React from "react";
import { ProfilePostFooter } from "./ProfilePostStyle";
import ProfilePostFooterLike from "./ProfilePostFooterLike";
import ProfilePostFooterComment from "./ProfilePostFooterComment";

const ProfilePostFooterComponent = ({ list, postId, token }) => {
  return (
    <ProfilePostFooter borderColor={list}>
      <div>
        {/* Profile post footer like component */}
        <ProfilePostFooterLike token={token} postId={postId} />

        {/* Profile post footer comment component */}
        <ProfilePostFooterComment />
      </div>
    </ProfilePostFooter>
  );
};

export default ProfilePostFooterComponent;
