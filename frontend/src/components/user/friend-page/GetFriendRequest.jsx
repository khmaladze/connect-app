import React, { Fragment } from "react";
import {
  FriendPageCardDiv,
  FriendPageHeaderText,
} from "../../../pages/user/friend-page/FriendPageStyle";
import GetRequest from "./friend-cards/get-request/GetRequest";

const GetFriendRequest = ({ user }) => {
  return (
    <Fragment>
      <FriendPageHeaderText>
        <h2>Friend Request</h2>
      </FriendPageHeaderText>
      <FriendPageCardDiv>
        <GetRequest token={user.token} />
      </FriendPageCardDiv>
    </Fragment>
  );
};

export default GetFriendRequest;
