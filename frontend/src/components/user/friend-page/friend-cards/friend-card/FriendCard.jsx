import React, { Fragment, useEffect, useState } from "react";
import { apiRequest, apiRequestType } from "../../../../../api/user/Api";
import { CircularProgress } from "@mui/material";
import { API_URL } from "../../../../../config/config";
import FriendListComponent from "./FriendListComponent";

const FriendCard = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [friendList, setFriendList] = useState([]);
  const [status, setStatus] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const getFriendList = async () => {
      try {
        const response = await apiRequest(
          apiRequestType.get,
          false,
          API_URL.friend.get.friend_list,
          token
        );
        if (response?.success) {
          setFriendList(response.data);
        } else {
          setFriendList(0);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friend list:", error);
      }
    };

    getFriendList();
  }, [token]);

  return (
    <Fragment>
      {loading && <CircularProgress />}
      {!loading && friendList.length === 0 && <h4>no friends</h4>}
      <FriendListComponent
        friendList={friendList}
        token={token}
        openUpdate={openUpdate}
        selectedUserId={selectedUserId}
        status={status}
        setStatus={setStatus}
        setOpenUpdate={setOpenUpdate}
        setSelectedUserId={setSelectedUserId}
      />
    </Fragment>
  );
};

export default FriendCard;
