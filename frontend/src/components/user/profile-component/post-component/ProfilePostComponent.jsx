import React, { Fragment, useEffect, useState } from "react";
import { apiRequest } from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import ProfilePost from "./ProfilePost";
import Loading from "../../../loading/Loading";

const ProfilePostComponent = ({ user }) => {
  const [profilePosts, setProfilePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProfilePost = async () => {
      try {
        const response = await apiRequest(
          "GET",
          false,
          `${API_URL.profile.get.profile_post}?page=${page}&pageSize=5`,
          user.token
        );

        if (response?.success) {
          setLoading(false);
          setProfilePosts((prevPosts) => [...prevPosts, ...response.data]);

          if (response.data.length < 5) {
            setHasMore(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching profile posts:", error);
        setLoading(false);
      }
    };

    fetchProfilePost();

    const handleScroll = () => {
      // Fetch more posts when the user is near the bottom of the page
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, hasMore, user.token]);

  return (
    <Fragment>
      {loading && <Loading />}
      {profilePosts &&
        profilePosts.map((item, index) => (
          <div key={`${item._id}_${index}`}>
            <ProfilePost
              postId={item._id}
              firstname={user.firstname}
              lastname={user.lastname}
              createdAt={item.createdAt}
              profileImage={user.profileImage}
              gender={user.gender}
              text={item.text || ""}
              image={item.media.length > 0 ? item.media[0].url : ""}
              list={item.list}
              token={user.token}
            />
          </div>
        ))}
    </Fragment>
  );
};

export default ProfilePostComponent;
