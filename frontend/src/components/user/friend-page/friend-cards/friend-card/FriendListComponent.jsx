import React, { Fragment } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { userProfileImage } from "../../../../../api/user/Api";
import { MenuItem, Select } from "@mui/material";
import FriendListDropdown from "../../../FriendListDropdown";
import { CardBorder, FriendListCard } from "./FriendCardStyle";
import UpdateFriendButton from "./UpdateFriendButton";
import RemoveFriendButton from "./RemoveFriendButton";

const FriendListComponent = ({
  friendList,
  token,
  openUpdate,
  selectedUserId,
  status,
  setStatus,
  setOpenUpdate,
  setSelectedUserId,
}) => {
  return (
    <Fragment>
      {friendList.map((item) => (
        <FriendListCard key={item.user._id}>
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
                {openUpdate && selectedUserId === item.user._id ? (
                  <FriendListDropdown
                    friendList={status}
                    setFriendList={setStatus}
                    showHeaderText={false}
                  />
                ) : (
                  <Select
                    disabled
                    style={{ width: "100%", marginTop: "10px" }}
                    labelId="dropdown-label"
                    id="dropdown"
                    value={item.request.friend_list}
                  >
                    <MenuItem value={item.request.friend_list}>
                      {item.request.friend_list}
                    </MenuItem>
                  </Select>
                )}
                <UpdateFriendButton
                  item={item}
                  openUpdate={openUpdate}
                  setOpenUpdate={setOpenUpdate}
                  setSelectedUserId={setSelectedUserId}
                  status={status}
                  token={token}
                />
                <RemoveFriendButton token={token} item={item} />
              </CardContent>
            </Card>
          </CardBorder>
        </FriendListCard>
      ))}
    </Fragment>
  );
};

export default FriendListComponent;
