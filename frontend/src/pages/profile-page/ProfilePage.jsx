import React, { useEffect, useState } from "react";
import { ProfileInfoContainer, ProfilePageMain } from "./ProfilePageStyle";
import { apiGetRequest } from "../../api/Api";
import { API_URL } from "../../config/config";
import UserPost from "../../components/post/UserPost";
import AddPost from "../../components/post/AddPost";
import ProfileImageComponent from "../../components/profile-page/ProfileImage";
import ProfileDetailsComponent from "../../components/profile-page/ProfileDetails";

const ProfilePage = ({ user }) => {
  const [profilePosts, setProfilePosts] = useState("");

  useEffect(() => {
    const fetchProfilePost = async () => {
      const response = await apiGetRequest(API_URL.profileGetPost, user.token);
      if (response?.success) {
        setProfilePosts(response.data);
      }
    };
    fetchProfilePost();
  }, []);

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
      {profilePosts
        ? profilePosts.map((item) => {
            return (
              <div key={item._id}>
                <UserPost
                  firstname={user.firstname}
                  lastname={user.lastname}
                  createdAt={item.createdAt}
                  profileImage={user.profileImage}
                  gender={user.gender}
                  text={item.text || ""}
                  image={item.media.length > 0 ? item.media[0].url : ""}
                />
              </div>
            );
          })
        : ""}
    </ProfilePageMain>
  );
};

export default ProfilePage;
