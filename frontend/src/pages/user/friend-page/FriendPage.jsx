import React from "react";
import SearchBar from "../../../components/user/friend-page/search-bar/SearchBar";
import { apiGetRequest } from "../../../api/user/Api";

const FriendPage = ({ user }) => {
  const handleSearch = async (searchTerm, updateSearchBar) => {
    // Perform a search using the searchTerm
    console.log("Search term:", searchTerm);
    // Add your search logic here

    const response = await apiGetRequest(
      "/api/user/friend/user/" + searchTerm,
      user.token
    );

    if (!response) {
      updateSearchBar("");
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
    </div>
  );
};

export default FriendPage;
