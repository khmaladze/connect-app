import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  apiRequest,
  apiRequestType,
  userProfileImage,
} from "../../../../../api/user/Api";
import { API_URL } from "../../../../../config/config";
import FriendListDropdown from "../../../FriendListDropdown";

const SendRequests = ({ id, gender, imageUrl, username, token }) => {
  const [status, setStatus] = useState("Friend");

  const sendFriendRequest = async () => {
    try {
      const response = await apiRequest(
        apiRequestType.post,
        true,
        API_URL.friend.post.friend_request,
        token,
        {
          receiver: id,
          friend_list: status,
        }
      );

      if (response?.success) {
        setStatus("Friend");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const MemoizedFriendListDropdown = React.memo(FriendListDropdown);

  return (
    <Card style={{ width: "300px", height: "400px" }}>
      <CardMedia
        component="img"
        alt="User Image"
        height="200"
        image={userProfileImage(gender, imageUrl)}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {username}
        </Typography>
        <MemoizedFriendListDropdown
          friendList={status}
          setFriendList={setStatus}
          showHeaderText={false}
        />
        <Button
          style={{ width: "100%", marginTop: "15px" }}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={sendFriendRequest}
        >
          Add Friend
        </Button>
      </CardContent>
    </Card>
  );
};

export default SendRequests;
