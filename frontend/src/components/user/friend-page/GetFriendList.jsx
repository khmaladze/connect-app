import React, { Fragment } from "react";
import {
  FriendPageCardDiv,
  FriendPageHeaderText,
} from "../../../pages/user/friend-page/FriendPageStyle";
import FriendCard from "./friend-cards/friend-card/FriendCard";

const GetFriendList = ({ user }) => {
  return (
    <Fragment>
      <FriendPageHeaderText>
        <h2>Friend List</h2>
      </FriendPageHeaderText>
      <FriendPageCardDiv>
        <FriendCard token={user.token} />
      </FriendPageCardDiv>
    </Fragment>
  );
};

export default GetFriendList;
