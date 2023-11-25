import React, { useState } from "react";
import { ProfilePostFooter } from "./ProfilePostStyle";
import { apiRequest } from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const ProfilePostFooterComponent = ({ list, postId, token }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isComment, setIsComment] = useState(false);

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

  return (
    <ProfilePostFooter borderColor={list}>
      <div>
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
        {isComment ? <AddCommentIcon /> : <ChatBubbleOutlineIcon />}
      </div>
    </ProfilePostFooter>
  );
};

export default ProfilePostFooterComponent;
