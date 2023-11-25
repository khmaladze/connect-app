import React from "react";
import { ProfilePostFooter } from "./ProfilePostStyle";
import ProfilePostFooterLike from "./ProfilePostFooterLike";
import ProfilePostFooterComment from "./ProfilePostFooterComment";

const ProfilePostFooterComponent = ({ list, postId, token }) => {
  return (
    <ProfilePostFooter borderColor={list}>
      <div>
        <ProfilePostFooterLike token={token} postId={postId} />
        <ProfilePostFooterComment />
      </div>
    </ProfilePostFooter>
  );
};

export default ProfilePostFooterComponent;
