import React, { Fragment } from "react";
import {
  FriendPageCardDiv,
  FriendPageHeaderText,
} from "../../../pages/user/friend-page/FriendPageStyle";
import GetSendRequest from "./friend-cards/sent-request/GetSentRequest";

const SentFriendRequests = ({ user }) => {
  return (
    <Fragment>
      <FriendPageHeaderText>
        <h2>Sent Friend Requests</h2>
      </FriendPageHeaderText>
      <FriendPageCardDiv>
        <GetSendRequest token={user.token} />
      </FriendPageCardDiv>
    </Fragment>
  );
};

export default SentFriendRequests;
