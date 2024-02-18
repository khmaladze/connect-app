import React, { Fragment, useEffect, useState } from "react";
import { apiRequest, apiRequestType } from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import Loading from "../../../loading/Loading";
import ProfilePost from "../../post/ProfilePost";

const ProfilePostComponent = ({ user, data }) => {
  const [profilePosts, setProfilePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

        setHasMore(response.data.length === 5);
      } else {
        console.error("Error fetching profile posts:", response?.message);
      }
    } catch (error) {
      console.error("Error fetching profile posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, hasMore, loading, user.token]);

  useEffect(() => {
    if (data == undefined) {
      fetchProfilePost();
    } else {
      setLoading(false);
    }
  }, [page, user.token]);

  return (
    <Fragment>
      {data
        ? data[0].posts.map((item, index) => {
            const { firstname, lastname, profileImage, gender } = data[0].user;
            return (
              <div key={`${item._id}_${index}`}>
                <ProfilePost
                  postId={item._id}
                  postedUserId={item.author}
                  firstname={firstname}
                  lastname={lastname}
                  createdAt={item.createdAt}
                  profileImage={profileImage}
                  gender={gender}
                  text={item.text || ""}
                  media={item.media.length > 0 ? item.media[0].url : ""}
                  list={item.list}
                  token={user.token}
                  profilePosts={profilePosts}
                  setProfilePosts={setProfilePosts}
                />
              </div>
            );
          })
        : profilePosts.map((item, index) => {
            const { firstname, lastname, profileImage, gender } = user;
            return (
              <div key={`${item._id}_${index}`}>
                <ProfilePost
                  postId={item._id}
                  postedUserId={item.author}
                  firstname={firstname}
                  lastname={lastname}
                  createdAt={item.createdAt}
                  profileImage={profileImage}
                  gender={gender}
                  text={item.text || ""}
                  media={item.media.length > 0 ? item.media[0].url : ""}
                  list={item.list}
                  token={user.token}
                  profilePosts={profilePosts}
                  setProfilePosts={setProfilePosts}
                />
              </div>
            );
          })}

      {loading && hasMore && <Loading />}
    </Fragment>
  );
};

export default ProfilePostComponent;
