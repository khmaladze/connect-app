import React, { Fragment, useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { API_URL } from "../../../config/config";
import { apiRequest, apiRequestType } from "../../../api/user/Api";

const StoryFooterLike = ({ token, storyId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);

  const likeStorie = async () => {
    try {
      setIsLiked(true);

      window.location.pathname === "/profile" && setCount(count + 1);

      const response = await apiRequest(
        apiRequestType.post,
        false,
        API_URL.story.post.like_story,
        token,
        {
          story_id: storyId,
        }
      );
      if (response?.success) {
        setIsLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeStorieLike = async () => {
    try {
      const response = await apiRequest(
        apiRequestType.post,
        false,
        API_URL.story.post.remove_story_like,
        token,
        { story_id: storyId }
      );
      if (response?.success) {
        setIsLiked(false);
        window.location.pathname === "/profile" && setCount(count - 1);
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
          API_URL.story.get.check_story_like + "/" + storyId,
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
              removeStorieLike();
            }}
          />
          {window.location.pathname === "/profile" && <h4>{count}</h4>}
        </div>
      ) : (
        <FavoriteBorderIcon
          onClick={() => {
            likeStorie();
          }}
        />
      )}
    </Fragment>
  );
};

export default StoryFooterLike;
