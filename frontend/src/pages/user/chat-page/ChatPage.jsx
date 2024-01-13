import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import {
  apiRequest,
  apiRequestType,
  userProfileImage,
} from "../../../api/user/Api";
import { API_URL } from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { ListItemText } from "@mui/material";
import Loading from "../../../components/loading/Loading";

const ChatPage = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFriendList = async () => {
      try {
        const response = await apiRequest(
          apiRequestType.get,
          false,
          API_URL.friend.get.friend_list,
          user.token
        );
        if (response?.success) {
          setUsers(response.data);
        } else {
          setUsers(0);
        }
      } catch (error) {
        console.error("Error fetching friend list:", error);
      } finally {
        setLoading(false);
      }
    };

    getFriendList();
  }, [user.token]);

  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "10px",
      }}
    >
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      ) : (
        <List>
          {users.map((userData) => (
            <ListItem
              style={{
                background: "white",
                marginTop: "10px",
                cursor: "pointer",
              }}
              key={userData.user._id}
              onClick={() => {
                navigate("/chat/" + userData.user._id);
              }}
            >
              <Avatar
                style={{
                  height: "70px",
                  width: "70px",
                }}
                src={userProfileImage(
                  userData.user.gender,
                  userData.user.profileImage
                )}
                alt={userData.user.username}
              />
              <ListItemText
                style={{
                  marginLeft: "20px",
                }}
                primary={<h2>{userData.user.username}</h2>}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ChatPage;
