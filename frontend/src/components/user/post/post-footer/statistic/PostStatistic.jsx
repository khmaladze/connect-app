import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { apiRequest, apiRequestType } from "../../../../../api/user/Api";
import { API_URL } from "../../../../../config/config";
import MyModal from "../../../modal/MyModal";
import LikesSection from "./LikesSection";
import CommentsSection from "./CommentsSection";

const PostStatistic = ({ postId, token, borderColor }) => {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState("likes");

  const fetchData = async () => {
    try {
      const response = await apiRequest(
        apiRequestType.get,
        false,
        API_URL.profile.get.get_likes_comments + "/" + postId,
        token
      );
      const likesData = await response.data.likes;
      setLikes(likesData.data);

      const commentsData = await response.data.comments;
      setComments(commentsData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (window.location.pathname == "/profile") fetchData();
  }, [postId]);

  return (
    <div>
      <MyModal
        title="Post Comment & Likes Statistics"
        ButtonText={
          <span
            onClick={() => {
              fetchData();
            }}
            className="material-symbols-outlined"
          >
            monitoring
          </span>
        }
        body={
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div>
                <FavoriteIcon
                  style={{
                    color:
                      borderColor === "Friend"
                        ? "#0500ff"
                        : borderColor === "CloseFriend"
                        ? "#1eff1e"
                        : "#FF008A",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveTab("likes")}
                />

                <ChatBubbleIcon
                  onClick={() => setActiveTab("comments")}
                  style={{
                    color:
                      borderColor === "Friend"
                        ? "#0500ff"
                        : borderColor === "CloseFriend"
                        ? "#1eff1e"
                        : "#FF008A",
                    cursor: "pointer",
                  }}
                />

                {/* Likes Section */}
                <LikesSection activeTab={activeTab} likes={likes} />

                {/* Comments Section */}
                <CommentsSection activeTab={activeTab} comments={comments} />
              </div>
            </Grid>
          </Grid>
        }
      />
    </div>
  );
};

export default PostStatistic;
