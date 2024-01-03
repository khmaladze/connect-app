import React, { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  apiRequest,
  apiRequestType,
  userProfileImage,
} from "../../../api/user/Api";
import { API_URL } from "../../../config/config";
import { useParams } from "react-router-dom";

const MessagePage = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { friendId } = useParams();

  const sendMessage = async () => {
    try {
      if (inputMessage.trim() !== "") {
        const response = await apiRequest(
          apiRequestType.post,
          false,
          API_URL.chat.post.send_message,
          user.token,
          {
            receiver: userData._id,
            message: inputMessage,
          }
        );
        setMessages([...messages, { message: inputMessage, sender: user._id }]);
        setInputMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getFriendList = async () => {
      try {
        const response = await apiRequest(
          apiRequestType.get,
          false,
          API_URL.chat.get.get_user + "/" + friendId,
          user.token
        );
        if (response?.success) {
          setUserData(response.data);
        } else {
          setUserData(0);
        }
      } catch (error) {
        console.error("Error fetching friend list:", error);
      } finally {
        setLoading(false);
      }
    };

    getFriendList();
  }, [user.token, friendId]);

  const getUserMessages = async () => {
    try {
      const response = await apiRequest(
        apiRequestType.get,
        false,
        API_URL.chat.get.get_user_message + "/" + userData._id,
        user.token
      );
      if (response?.success) setMessages(response.data);
    } catch (error) {
      console.error("Error fetching user messages:", error);
    }
  };

  useEffect(() => {
    if (userData._id) {
      getUserMessages();
    }
  }, [userData]);

  const divRef = useRef();

  useEffect(() => {
    const scrollToBottom = () => {
      if (divRef.current) {
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "500px",
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        minHeight: "100%",
      }}
    >
      {/* User Info */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <Avatar
          src={userProfileImage(userData.gender, userData.profileImage)}
          alt="User"
        />
        <div style={{ marginLeft: "10px", marginRight: "auto" }}>
          {userData.username}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", height: "200px" }} ref={divRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.sender === user._id ? "right" : "left",
              background: message.sender === user._id ? "#fff" : "#2196f3",
              color: message.sender === user._id ? "#000" : "#fff",
              padding: "8px",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          >
            {message.message}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div style={{ display: "flex", marginTop: "20px" }}>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          style={{ marginLeft: "10px" }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessagePage;
