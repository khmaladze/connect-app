import { Button } from "@mui/material";
import React, { useState } from "react";
import { apiRequest, apiRequestType } from "../../../../../api/user/Api";
import { API_URL } from "../../../../../config/config";

const UpdateFriendButton = ({
  openUpdate,
  setOpenUpdate,
  setSelectedUserId,
  item,
  status,
  token,
}) => {
  const [loading, setLoading] = useState(false);

  const updateFriendList = async (userId, previousStatus) => {
    if (
      status !== previousStatus &&
      ["Friend", "CloseFriend", "Favorite"].includes(status)
    ) {
      try {
        const response = await apiRequest(
          apiRequestType.put,
          true,
          API_URL.friend.put.friend_list_update,
          token,
          { friendId: userId, newFriendListType: status }
        );
        if (response?.success) {
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        console.error("Error updating friend list:", error);
      } finally {
        setLoading(false);
        window.location.reload();
      }
    }
  };

  return (
    <Button
      style={{ width: "100%", marginTop: "15px" }}
      variant="contained"
      color="primary"
      fullWidth
      size="large"
      disabled={loading}
      onClick={() => {
        setOpenUpdate(!openUpdate);
        setSelectedUserId(item.user._id);
        updateFriendList(item.user._id, item.request.friend_list);
      }}
    >
      {loading ? "Updating..." : "Update Friend"}
    </Button>
  );
};

export default UpdateFriendButton;
