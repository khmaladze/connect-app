import { Button } from "@mui/material";
import React, { useState } from "react";
import { apiRequest, apiRequestType } from "../../../../../api/user/Api";
import { API_URL } from "../../../../../config/config";

const RemoveFriendButton = ({ token, item, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const removeFriend = async (userId) => {
    try {
      setIsRemoving(true);
      const response = await apiRequest(
        apiRequestType.put,
        true,
        API_URL.friend.put.friend_list_remove,
        token,
        { user_id: userId }
      );
      if (response?.success) {
        // Trigger the onRemove callback to update the state locally
        onRemove(userId);
      }
    } catch (error) {
      console.error("Error removing friend:", error);
    } finally {
      window.location.reload();
      setIsRemoving(false);
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
      disabled={isRemoving}
    >
      {isRemoving ? "Removing..." : "Remove Friend"}
    </Button>
  );
};

export default RemoveFriendButton;
