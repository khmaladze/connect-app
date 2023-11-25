import React, { Fragment, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { apiRequest, userProfileImage } from "../../../../../api/user/Api";
import { CircularProgress, MenuItem, Select } from "@mui/material";
import { API_URL } from "../../../../../config/config";
import styled from "styled-components";

const FriendCard = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [friendList, setFriendList] = useState(false);
  const [status, setStatus] = useState("Friend");

  useEffect(() => {
    const getFriendList = async () => {
      const response = await apiRequest(
        "GET",
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
              <CardBorder borderColor={item.request.friend_list}>
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
              </CardBorder>
            </div>
          );
        })}
    </Fragment>
  );
};

const CardBorder = styled.div`
  border: 2px solid
    ${(props) =>
      props.borderColor === "Friend"
        ? "#0500ff"
        : props.borderColor === "CloseFriend"
        ? "#1eff1e"
        : "#FF008A"};
  background: white;
  border-radius: 7px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

export default FriendCard;
