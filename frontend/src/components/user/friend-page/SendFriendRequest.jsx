import React, { Fragment, useState } from "react";
import {
  FriendMainPageSendRequestSmallText,
  FriendMainPageSendRequestText,
  FriendPageSendRequestDiv,
  FriendRequstSearchBar,
} from "../../../pages/user/friend-page/FriendPageStyle";
import SearchBar from "./search-bar/SearchBar";
import SendRequests from "./friend-cards/send-request/SendRequests";
import { apiRequest, apiRequestType } from "../../../api/user/Api";
import { toast } from "react-toastify";

const SendFriendRequest = ({ user }) => {
  const [searchResult, setSearchResult] = useState("");
  const handleSearch = async (searchTerm, updateSearchBar) => {
    if (searchTerm.length <= 0) {
      toast.error("can't find user with empty field");
      return;
    }

    const response = await apiRequest(
      apiRequestType.get,
      false,
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
    <Fragment>
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
    </Fragment>
  );
};

export default SendFriendRequest;
