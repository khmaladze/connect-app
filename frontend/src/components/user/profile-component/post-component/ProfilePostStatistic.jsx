import React, { useEffect, useState } from "react";
import MyModal from "../../modal/MyModal";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { apiRequest, apiRequestType } from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProfilePostStatistic = ({ postId, token, borderColor }) => {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState("likes");

  useEffect(() => {
    // Fetch likes and comments data from your backend using postId
    // Update state with the fetched data
    // Replace the following with your actual API calls
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
    fetchData();
  }, [postId]);

  return (
    <div>
      <MyModal
        title="Post Comment Statistics"
        ButtonText={
          <span className="material-symbols-outlined">monitoring</span>
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
                  }}
                />

                {/* Likes Section */}
                <div>
                  {activeTab === "likes" && likes.length > 0 && (
                    <>
                      <Typography variant="subtitle1">Likes</Typography>
                      <Typography variant="body2">{`Total Likes: ${likes.length}`}</Typography>
                      <List>
                        {likes.map((like) => (
                          <ListItem key={like.user_id}>
                            <ListItemAvatar>
                              <Avatar
                                src={like.profileImage}
                                alt={like.username}
                              />
                            </ListItemAvatar>
                            <ListItemText primary={like.username} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </div>

                {/* Comments Section */}
                <div>
                  {activeTab === "comments" && comments.length > 0 && (
                    <>
                      <Typography variant="subtitle1">Comments</Typography>
                      <Typography variant="body2">{`Total Comments: ${comments.length}`}</Typography>
                      <List>
                        {comments.map((comment) => (
                          <ListItem key={comment.user_id}>
                            <ListItemAvatar>
                              <Avatar
                                src={comment.profileImage}
                                alt={comment.username}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={comment.username}
                              secondary={comment.comment_text}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        }
      />
    </div>
  );
};

export default ProfilePostStatistic;
