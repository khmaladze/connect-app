import React from "react";
import { ProfileInfoContainer, ProfilePageMain } from "./ProfilePageStyle";
import ProfileImageComponent from "../../components/profile-page/profile-image/ProfileImage";
import ProfileDetailsComponent from "../../components/profile-page/profile-details/ProfileDetails";
import ProfilePostComponent from "../../components/profile-page/post-component/ProfilePostComponent";
import ProfileAddPostComponent from "../../components/profile-page/post-component/ProfileAddPost";

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
