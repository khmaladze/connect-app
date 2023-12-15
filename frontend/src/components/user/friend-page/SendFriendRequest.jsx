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
      toast.error("Please enter a username to search for.");
      return;
    }

    if (user.username === searchTerm) {
      toast.error("it's your username");
      return;
    }

    try {
      const response = await apiRequest(
        apiRequestType.get,
        false,
        `/api/user/friend/user/${searchTerm}`,
        user.token
      );

      if (response?.data) {
        setSearchResult(response.data);
      } else {
        updateSearchBar("");
        toast.error("User not found.");
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      toast.error("An error occurred while searching for user.");
    }
  };

  return (
    <Fragment>
      <FriendMainPageSendRequestText>
        <h2>Add Friend</h2>
      </FriendMainPageSendRequestText>
      <FriendMainPageSendRequestSmallText>
        <h4>Search for a user by username</h4>
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
