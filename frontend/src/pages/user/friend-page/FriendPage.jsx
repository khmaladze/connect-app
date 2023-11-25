import React from "react";
import { FriendMainPage } from "./FriendPageStyle";
import SendFriendRequest from "../../../components/user/friend-page/SendFriendRequest";
import GetFriendRequest from "../../../components/user/friend-page/GetFriendRequest";
import SentFriendRequests from "../../../components/user/friend-page/SentFriendRequests";
import GetFriendList from "../../../components/user/friend-page/GetFriendList";

const FriendPage = ({ user }) => {
  return (
    <FriendMainPage>
      <SendFriendRequest user={user} />
      <GetFriendRequest user={user} />
      <SentFriendRequests user={user} />
      <GetFriendList user={user} />
    </FriendMainPage>
  );
};

export default FriendPage;
