import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { apiPostRequest, userProfileImage } from "../../../../../api/user/Api";
import { MenuItem, Select } from "@mui/material";
import { API_URL } from "../../../../../config/config";

const SendRequests = ({ id, gender, imageUrl, username, token }) => {
  const [status, setStatus] = useState("Friend");

  const sendFriendRequest = async () => {
    const response = await apiPostRequest(
      API_URL.friend.post.friend_request,
      {
        receiver: id,
        friend_list: status,
      },
      token
    );

    console.log(response);
  };

  return (
    <Card>
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
        <Select
          style={{
            width: "100%",
            marginTop: "10px",
          }}
          labelId="dropdown-label"
          id="dropdown"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <MenuItem key={"Friend"} value={"Friend"}>
            Friend
          </MenuItem>
          <MenuItem key={"CloseFriend"} value={"CloseFriend"}>
            close friend
          </MenuItem>
          <MenuItem key={"Favorite"} value={"Favorite"}>
            Favorite
          </MenuItem>
        </Select>
        <Button
          style={{
            width: "100%",
            marginTop: "15px",
          }}
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
