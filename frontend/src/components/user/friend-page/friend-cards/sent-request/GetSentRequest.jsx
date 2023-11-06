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
import { API_URL } from "../../../../../config/config";

const GetSendRequest = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [friendRequest, setFriendRequest] = useState(false);

  useEffect(() => {
    const getFriendRequest = async () => {
      const response = await apiGetRequest(
        API_URL.friend.get.get_send_requests,
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

  const removeFriendRequest = async (id, status, friendList = "Friend") => {
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
            <div
              key={item.user._id}
              style={{
                width: "300px",
                height: "350px",
              }}
            >
              <Card>
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
                    onClick={() => removeFriendRequest(item.request._id)}
                  >
                    Remove Request
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        })}
    </Fragment>
  );
};

export default GetSendRequest;