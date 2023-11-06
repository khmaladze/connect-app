import React, { Fragment, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  apiGetRequest,
  apiPostRequest,
  userProfileImage,
} from "../../../../../api/user/Api";
import { MenuItem, Select } from "@mui/material";
import { API_URL } from "../../../../../config/config";

const GetRequest = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [friendRequest, setFriendRequest] = useState(false);
  const [status, setStatus] = useState("Friend");

  useEffect(() => {
    const getFriendRequest = async () => {
      const response = await apiGetRequest(
        API_URL.friend.get.friend_request,
        token
      );
      if (response?.success) {
        setFriendRequest(response.data);
        if (response.data.length > 0) {
          setLoading(!loading);
        } else {
          setTimeout(() => {
            setLoading(!loading);
          }, 2000);
        }
      }
    };
    getFriendRequest();
  }, []);

  const sendFriendRequestResponse = async (
    id,
    status,
    friendList = "Friend"
  ) => {
    const response = await apiPostRequest(
      API_URL.friend.post.friend_request_response,
      { id: id, status: status, friend_list: friendList },
      token
    );

    if (response?.success) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <Fragment>
      {loading && <h4>loading</h4>}
      {!loading && friendRequest.length === 0 && <h4>no request</h4>}
      {friendRequest.length > 0 &&
        friendRequest.map((item) => {
          return (
            <Card key={item.user._id}>
              <CardMedia
                component="img"
                alt="User Image"
                height="200"
                image={userProfileImage(
                  item.user.gender,
                  item.user.profileImage
                )}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.user.username}
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
                  onClick={() =>
                    sendFriendRequestResponse(
                      item.request._id,
                      "accepted",
                      status
                    )
                  }
                >
                  Accept
                </Button>
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
                  onClick={() =>
                    sendFriendRequestResponse(item.request._id, "rejected")
                  }
                >
                  Reject
                </Button>
              </CardContent>
            </Card>
          );
        })}
    </Fragment>
  );
};

export default GetRequest;
