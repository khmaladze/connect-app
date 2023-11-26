import React, { Fragment, useEffect, useState } from "react";
import { apiRequest } from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProfilePostFooterLike = ({ token, postId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);

  const likePost = async () => {
    try {
      const response = await apiRequest(
        "POST",
        API_URL.profile.post.like_post,
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
        "POST",
        API_URL.profile.post.remove_post_like,
        token,
        { post_id: postId }
      );
      if (response?.success) {
        setIsLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkIsPostLiked = async () => {
      try {
        const response = await apiRequest(
          "GET",
          API_URL.profile.get.check_post_like + "/" + postId,
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
    checkIsPostLiked();
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
          <h4>{count}</h4>
          <div style={{ width: "10px" }}></div>
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

export default ProfilePostFooterLike;
