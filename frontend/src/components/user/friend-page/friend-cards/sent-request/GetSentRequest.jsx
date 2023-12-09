import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import {
  apiRequest,
  apiRequestType,
  userProfileImage,
} from "../../../../../api/user/Api";
import { API_URL } from "../../../../../config/config";

const GetSendRequest = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [friendRequest, setFriendRequest] = useState([]);

  useEffect(() => {
    const getFriendRequest = async () => {
      try {
        const response = await apiRequest(
          apiRequestType.get,
          false,
          API_URL.friend.get.get_send_requests,
          token
        );

        if (response?.success) {
          setFriendRequest(response.data);
          setLoading(false);
        } else {
          setLoading(false);
          console.error("Error fetching friend requests:", response?.error);
        }
      } catch (error) {
        console.error("Error fetching friend requests:", error);
        setLoading(false);
      }
    };
    getFriendRequest();
  }, [token]);

  const removeFriendRequest = async (id) => {
    try {
      const response = await apiRequest(
        apiRequestType.put,
        true,
        API_URL.friend.put.friend_request_remove,
        token,
        { id: id }
      );

      if (response?.success) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.error("Error removing friend request:", response?.error);
      }
    } catch (error) {
      console.error("Error removing friend request:", error);
    }
  };

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && friendRequest.length === 0 && <h4>No requests</h4>}
      {friendRequest.length > 0 &&
        friendRequest.map((item) => (
          <div key={item.user._id} style={{ width: "300px", height: "350px" }}>
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
        ))}
    </>
  );
};

export default GetSendRequest;
