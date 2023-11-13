import React, { Fragment, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  apiGetRequest,
  //   apiPutRequest,
  userProfileImage,
} from "../../../../../api/user/Api";
import { CircularProgress, MenuItem, Select } from "@mui/material";
import { API_URL } from "../../../../../config/config";

const FriendCard = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [friendList, setFriendList] = useState(false);
  //   const [status, setStatus] = useState("Friend");

  useEffect(() => {
    const getFriendList = async () => {
      const response = await apiGetRequest(
        API_URL.friend.get.friend_list,
        token
      );
      if (response?.success) {
        setFriendList(response.data);
        if (response.data.length > 0) {
          setLoading(false);
        } else {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      }
    };
    getFriendList();
  }, []);

  return (
    <Fragment>
      {loading && <CircularProgress />}
      {!loading && friendList.length === 0 && <h4>no friends</h4>}
      {friendList.length > 0 &&
        friendList.map((item) => {
          return (
            <div
              key={item.user._id}
              style={{
                width: "300px",
                height: "380px",
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
                  <Select
                    disabled
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                    labelId="dropdown-label"
                    id="dropdown"
                    value={item.request.friend_list}
                    // onChange={(event) => setStatus(event.target.value)}
                  >
                    <MenuItem
                      key={item.request.friend_list}
                      value={item.request.friend_list}
                    >
                      {item.request.friend_list}
                    </MenuItem>
                    {/* <MenuItem key={"CloseFriend"} value={"CloseFriend"}>
                      close friend
                    </MenuItem>
                    <MenuItem key={"Favorite"} value={"Favorite"}>
                      Favorite
                    </MenuItem> */}
                  </Select>
                </CardContent>
              </Card>
            </div>
          );
        })}
    </Fragment>
  );
};

export default FriendCard;
