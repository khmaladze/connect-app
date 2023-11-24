import React, { useState } from "react";
import SearchBar from "../../../components/user/friend-page/search-bar/SearchBar";
import SendRequests from "../../../components/user/friend-page/friend-cards/send-request/SendRequests";
import { toast } from "react-toastify";
import GetRequest from "../../../components/user/friend-page/friend-cards/get-request/GetRequest";
import GetSendRequest from "../../../components/user/friend-page/friend-cards/sent-request/GetSentRequest";
import {
  FriendMainPage,
  FriendMainPageSendRequestSmallText,
  FriendMainPageSendRequestText,
  FriendPageCardDiv,
  FriendPageHeaderText,
  FriendPageSendRequestDiv,
  FriendRequstSearchBar,
} from "./FriendPageStyle";
import FriendCard from "../../../components/user/friend-page/friend-cards/friend-card/FriendCard";
import { apiRequest } from "../../../api/user/Api";

const FriendPage = ({ user }) => {
  const [searchResult, setSearchResult] = useState("");
  const handleSearch = async (searchTerm, updateSearchBar) => {
    if (searchTerm.length <= 0) {
      toast.error("can't find user with empty field");
      return;
    }

    const response = await apiRequest(
      "GET",
      "/api/user/friend/user/" + searchTerm,
      user.token
    );

    if (!response) {
      updateSearchBar("");
    } else {
      setSearchResult(response.data);
    }
  };

  return (
    <FriendMainPage>
      <FriendMainPageSendRequestText>
        <h2>Add Friend</h2>
      </FriendMainPageSendRequestText>
      <FriendMainPageSendRequestSmallText>
        <h4>Search user with username</h4>
      </FriendMainPageSendRequestSmallText>
      <FriendRequstSearchBar>
        <SearchBar onSearch={handleSearch} />
      </FriendRequstSearchBar>
      {searchResult && (
        <FriendPageSendRequestDiv>
          <SendRequests
            imageUrl={searchResult.profileImage}
            username={searchResult.username}
            gender={searchResult.gender}
            id={searchResult._id}
            token={user.token}
          />
        </FriendPageSendRequestDiv>
      )}
      <FriendPageHeaderText>
        <h2>Friend Request</h2>
      </FriendPageHeaderText>
      <FriendPageCardDiv>
        <GetRequest token={user.token} />
      </FriendPageCardDiv>
      <FriendPageHeaderText>
        <h2>Sent Friend Requests</h2>
      </FriendPageHeaderText>
      <FriendPageCardDiv>
        <GetSendRequest token={user.token} />
      </FriendPageCardDiv>
      <FriendPageHeaderText>
        <h2>Friend List</h2>
      </FriendPageHeaderText>
      <FriendPageCardDiv>
        <FriendCard token={user.token} />
      </FriendPageCardDiv>
    </FriendMainPage>
  );
};

export default FriendPage;
