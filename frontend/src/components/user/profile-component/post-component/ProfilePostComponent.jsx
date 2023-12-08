import React, { Fragment, useEffect, useState } from "react";
import { apiRequest, apiRequestType } from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import ProfilePost from "./ProfilePost";
import Loading from "../../../loading/Loading";

const ProfilePostComponent = ({ user }) => {
  const [profilePosts, setProfilePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
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

  useEffect(() => {
    const fetchProfilePost = async () => {
      try {
        const response = await apiRequest(
          apiRequestType.get,
          false,
          `${API_URL.profile.get.profile_post}?page=${page}&pageSize=5`,
          user.token
        );

        if (response?.success) {
          setLoading(false);
          setProfilePosts((prevPosts) =>
            page === 1 ? response.data : [...prevPosts, ...response.data]
          );

          if (response.data.length < 5) {
            setHasMore(false);
          }
        } else {
          setError("Failed to fetch profile posts");
        }
      } catch (error) {
        console.error("Error fetching profile posts:", error);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfilePost();
  }, [page, user.token]);

  return (
    <Fragment>
      {profilePosts.length > 0 &&
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
      {loading && <Loading />}
      {error && <div>Error: {error}</div>}
    </Fragment>
  );
};

export default ProfilePostComponent;
