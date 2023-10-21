import React from "react";
import { ProfileInfoContainer, ProfilePageMain } from "./ProfilePageStyle";
import AddPost from "../../components/post/AddPost";
import ProfileImageComponent from "../../components/profile-page/ProfileImage";
import ProfileDetailsComponent from "../../components/profile-page/ProfileDetails";
import ProfilePostComponent from "../../components/profile-page/ProfilePost";

const ProfilePage = ({ user }) => {
  return (
    <ProfilePageMain>
      <ProfileInfoContainer>
        <ProfileImageComponent user={user} />
        <ProfileDetailsComponent user={user} />
      </ProfileInfoContainer>
      <AddPost
        firstname={user.firstname}
        lastname={user.firstname}
        profileImage={user.profileImage}
        gender={user.gender}
        jwt={user.token}
      />
      <ProfilePostComponent user={user} />
    </ProfilePageMain>
  );
};

export default ProfilePage;
