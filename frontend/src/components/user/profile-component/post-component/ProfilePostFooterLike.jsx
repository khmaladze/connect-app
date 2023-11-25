import React, { Fragment, useEffect, useState } from "react";
import { apiRequest } from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProfilePostFooterLike = ({ token, postId }) => {
  const [isLiked, setIsLiked] = useState(false);

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
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkIsPostLiked();
  }, [isLiked]);

  return (
    <Fragment>
      {isLiked ? (
        <FavoriteIcon
          onClick={() => {
            likePost();
          }}
        />
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
