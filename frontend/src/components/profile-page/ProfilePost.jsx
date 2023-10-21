import React, { Fragment, useEffect, useState } from "react";
import UserPost from "../post/UserPost";
import { apiGetRequest } from "../../api/Api";
import { API_URL } from "../../config/config";

const ProfilePostComponent = ({ user }) => {
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
    <Fragment>
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
    </Fragment>
  );
};

export default ProfilePostComponent;
