import React, { Fragment, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import {
  apiRequest,
  apiRequestType,
  userProfileImage,
} from "../../../../../api/user/Api";
import { API_URL } from "../../../../../config/config";
import FriendListDropdown from "../../../FriendListDropdown";

const GetRequest = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [friendRequest, setFriendRequest] = useState([]);
  const [status, setStatus] = useState("Friend");

  useEffect(() => {
    const getFriendRequest = async () => {
      try {
        const response = await apiRequest(
          apiRequestType.get,
          false,
          API_URL.friend.get.friend_request,
          token
        );

        if (response?.success) {
          setFriendRequest(response.data);
          setLoading(false);
        } else {
          console.error("Error fetching friend requests:", response?.error);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching friend requests:", error);
        setLoading(false);
      }
    };

    getFriendRequest();
  }, [token]);

  const sendFriendRequestResponse = async (
    id,
    status,
    friendList = "Friend"
  ) => {
    try {
      const response = await apiRequest(
        apiRequestType.put,
        true,
        API_URL.friend.put.friend_request_response,
        token,
        { id: id, status: status, friend_list: friendList }
      );

      if (response?.success) {
        // Update local state instead of reloading the window
        setFriendRequest((prevRequests) =>
          prevRequests.filter((request) => request.request._id !== id)
        );
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("Error responding to friend request:", error);
    }
  };

  const MemoizedFriendListDropdown = React.memo(FriendListDropdown);

  return (
    <Fragment>
      {loading && <CircularProgress />}
      {!loading && friendRequest.length === 0 && <h4>No friend requests</h4>}
      {friendRequest.length > 0 &&
        friendRequest.map((item) => (
          <div key={item.user._id} style={{ width: "300px", height: "480px" }}>
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
                <MemoizedFriendListDropdown
                  friendList={status}
                  setFriendList={setStatus}
                  showHeaderText={false}
                />
              </CardContent>
              <CardActions>
                <Button
                  style={{ width: "100%", marginTop: "15px" }}
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
              </CardActions>
            </Card>
          </div>
        ))}
    </Fragment>
  );
};

export default GetRequest;
