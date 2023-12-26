import { Button } from "@mui/material";
import React from "react";
import { apiRequest, apiRequestType } from "../../../../../api/user/Api";
import { API_URL } from "../../../../../config/config";

const RemoveFriendButton = ({ token, item }) => {
  const removeFriend = async (userId) => {
    try {
      const response = await apiRequest(
        apiRequestType.put,
        true,
        API_URL.friend.put.friend_list_remove,
        token,
        { user_id: userId }
      );
      if (response?.success) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  return (
    <Button
      style={{
        width: "100%",
        marginTop: "15px",
        backgroundColor: "red",
      }}
      variant="contained"
      color="primary"
      fullWidth
      size="large"
      onClick={() => removeFriend(item.user._id)}
    >
      Remove Friend
    </Button>
  );
};

export default RemoveFriendButton;
