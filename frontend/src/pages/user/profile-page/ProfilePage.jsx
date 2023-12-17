import React from "react";
import { ProfileInfoContainer, ProfilePageMain } from "./ProfilePageStyle";
import ProfileAddPostComponent from "../../../components/user/profile-component/post-component/ProfileAddPost";
import ProfileDetailsComponent from "../../../components/user/profile-component/profile-details/ProfileDetails";
import ProfileImageComponent from "../../../components/user/profile-component/profile-image/ProfileImage";
import ProfilePostComponent from "../../../components/user/profile-component/post-component/ProfilePostComponent";

const ProfilePage = ({ user }) => {
  return (
    <ProfilePageMain>
      <ProfileInfoContainer>
        <ProfileImageComponent user={user} />
        <ProfileDetailsComponent user={user} />
      </ProfileInfoContainer>
      <ProfileAddPostComponent user={user} />
      <ProfilePostComponent user={user} />
    </ProfilePageMain>
  );
};

export default ProfilePage;
