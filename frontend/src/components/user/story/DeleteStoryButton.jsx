import { Button } from "@mui/material";
import React from "react";
import { apiRequest, apiRequestType } from "../../../api/user/Api";
import { API_URL } from "../../../config/config";

const DeleteStoryButton = ({ storyId, token }) => {
  const deleteUserPosthandle = async (storyId, token) => {
    if (window.location.pathname == "/profile")
      try {
        const response = await apiRequest(
          apiRequestType.post,
          true,
          API_URL.profile.post.delete_story + storyId,
          token
        );
        if (response?.success) {
          window.location.reload();
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
        await deleteUserPosthandle(storyId, token);
      }}
    >
      Delete Story
    </Button>
  );
};

export default DeleteStoryButton;
