import React, { Fragment, useEffect, useState } from "react";
import { apiGetRequest } from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import ProfilePost from "./ProfilePost";
import { CircularProgress } from "@mui/material";

const ProfilePostComponent = ({ user }) => {
  const [profilePosts, setProfilePosts] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfilePost = async () => {
      const response = await apiGetRequest(
        API_URL.profile.get.profile_post,
        user.token
      );
      if (response?.success) {
        setTimeout(() => {
          setLoading(!loading);
          setProfilePosts(response.data);
        }, 500);
      } else {
        setTimeout(() => {
          setLoading(!loading);
        }, 3000);
      }
    };
    fetchProfilePost();
  }, []);

  return (
    <Fragment>
      {loading && (
        <div
          style={{
            maxWidth: "1500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {profilePosts
        ? profilePosts.map((item) => {
            return (
              <div key={item._id}>
                <ProfilePost
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
