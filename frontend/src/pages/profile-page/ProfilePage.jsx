import React from "react";
import { ProfileInfoContainer, ProfilePageMain } from "./ProfilePageStyle";
import ProfileImageComponent from "../../components/user/profile-component/profile-image/ProfileImage";
import ProfileDetailsComponent from "../../components/user/profile-component/profile-details/ProfileDetails";
import ProfilePostComponent from "../../components/user/profile-component/post-component/ProfilePostComponent";
import ProfileAddPostComponent from "../../components/user/profile-component/post-component/ProfileAddPost";

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
