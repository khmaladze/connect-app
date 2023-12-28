import React, { Fragment, useEffect, useState } from "react";
import { apiRequest, apiRequestType } from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import Loading from "../../../loading/Loading";
import ProfilePost from "../../post/ProfilePost";

const MainPostComponent = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProfilePost = async () => {
    try {
      const response = await apiRequest(
        apiRequestType.get,
        false,
        `${API_URL.post.get.posts}?page=${page}`, // Use a query parameter for pagination
        user.token
      );

      if (response?.success) {
        setPosts((prevPosts) =>
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
    // Attach event listener for infinite scrolling
    window.addEventListener("scroll", handleScroll);

    // Detach event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, hasMore, loading, user.token]);

  useEffect(() => {
    fetchProfilePost();
  }, [page, user.token]);

  return (
    <Fragment>
      {posts.map((item, index) => (
        <div key={`${item._id}_${index}`}>
          <ProfilePost
            postId={item._id}
            firstname={item.user.firstname}
            lastname={item.user.lastname}
            createdAt={item.createdAt}
            postedUserId={item.author}
            profileImage={item.user.profileImage}
            gender={item.user.gender}
            text={item.text || ""}
            media={item.media.length > 0 ? item.media[0].url : ""}
            list={item.list}
            token={user.token}
            posts={posts}
            setPosts={setPosts}
          />
        </div>
      ))}
      {loading && hasMore && (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      )}
      {!loading && posts && posts.length == 0 && (
        <h4 style={{ textAlign: "center" }}>NO POST.</h4>
      )}
    </Fragment>
  );
};

export default MainPostComponent;
