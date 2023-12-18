import React, { Fragment, useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { apiRequest, apiRequestType } from "../../../../../api/user/Api";
import { API_URL } from "../../../../../config/config";

const PostFooterLike = ({ token, postId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);

  const likePost = async () => {
    try {
      setIsLiked(true);

      window.location.pathname == "/profile" && setCount(count + 1);

      const response = await apiRequest(
        apiRequestType.post,
        false,
        API_URL.post.post.like_post,
        token,
        {
          post_id: postId,
        }
      );
      if (response?.success) {
        setIsLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removePostLike = async () => {
    try {
      const response = await apiRequest(
        apiRequestType.post,
        false,
        API_URL.post.post.remove_post_like,
        token,
        { post_id: postId }
      );
      if (response?.success) {
        setIsLiked(false);
        window.location.pathname == "/profile" && setCount(count - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkIsPostLiked = async () => {
      try {
        const response = await apiRequest(
          apiRequestType.get,
          false,
          API_URL.post.get.check_post_like + "/" + postId,
          token
        );
        if (response?.success) {
          setIsLiked(response.data.liked);
          setCount(response.data.count);
        }
      } catch (error) {
        console.log(error);
      }
    };
    setTimeout(() => {
      checkIsPostLiked();
    }, 1000);
  }, [isLiked]);

  return (
    <Fragment>
      {isLiked && count ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <FavoriteIcon
            onClick={() => {
              removePostLike();
            }}
          />
          {window.location.pathname == "/profile" && <h4>{count}</h4>}
        </div>
      ) : (
        <FavoriteBorderIcon
          onClick={() => {
            likePost();
          }}
        />
      )}
    </Fragment>
  );
};

export default PostFooterLike;
