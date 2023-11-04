import React, { useState } from "react";
import SearchBar from "../../../components/user/friend-page/search-bar/SearchBar";
import { apiGetRequest } from "../../../api/user/Api";
import SendRequests from "../../../components/user/friend-page/friend-cards/send-request/SendRequests";
import { toast } from "react-toastify";

const FriendPage = ({ user }) => {
  const [searchResult, setSearchResult] = useState("");
  const handleSearch = async (searchTerm, updateSearchBar) => {
    if (searchTerm.length <= 0) {
      toast.error("can't find user with empty field");
      return;
    }

    const response = await apiGetRequest(
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
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Add Friend</h2>
      </div>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        <h4>Search user with username</h4>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        <SearchBar onSearch={handleSearch} />
      </div>
      {searchResult && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          <SendRequests
            imageUrl={searchResult.profileImage}
            username={searchResult.username}
            gender={searchResult.gender}
            id={searchResult._id}
            token={user.token}
            onButtonClick={() => {
              console.log("hi");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FriendPage;
