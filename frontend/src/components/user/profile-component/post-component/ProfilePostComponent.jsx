import React, { Fragment, useEffect, useState } from "react";
import { apiRequest, apiRequestType } from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import Loading from "../../../loading/Loading";
import ProfilePost from "../../post/Post";

const ProfilePostComponent = ({ user }) => {
  const [profilePosts, setProfilePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
          setProfilePosts((prevPosts) =>
            page === 1 ? response.data : [...prevPosts, ...response.data]
          );

          if (response.data.length < 5) {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching profile posts:", error);
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
              profilePosts={profilePosts}
              setProfilePosts={setProfilePosts}
            />
          </div>
        ))}
      {loading && <Loading />}
    </Fragment>
  );
};

export default ProfilePostComponent;
