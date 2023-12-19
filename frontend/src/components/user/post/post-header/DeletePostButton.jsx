import { Button } from "@mui/material";
import React from "react";
import { apiRequest, apiRequestType } from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";

const DeletePostButton = ({ postId, token, profilePosts, setProfilePosts }) => {
  const removeObjectFromArray = (arr, postIdToRemove) => {
    return arr.filter((item) => item._id !== postIdToRemove);
  };

  const deleteUserPosthandle = async (postId, token) => {
    if (window.location.pathname == "/profile")
      try {
        const response = await apiRequest(
          apiRequestType.post,
          true,
          API_URL.profile.post.delete_post + postId,
          token
        );
        if (response?.success) {
          setProfilePosts(removeObjectFromArray(profilePosts, postId));
          if (profilePosts.length === 1) {
            window.location.reload();
          }
        }
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <Button
      style={{
        width: "100%",
        marginTop: "10px",
        color: "red",
        borderColor: "red",
      }}
      variant="outlined"
      onClick={async () => {
        await deleteUserPosthandle(postId, token);
      }}
    >
      Delete Post
    </Button>
  );
};

export default DeletePostButton;
