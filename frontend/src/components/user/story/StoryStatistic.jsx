import React, { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PreviewIcon from "@mui/icons-material/Preview";
import {
  apiRequest,
  apiRequestType,
  userProfileImage,
} from "../../../api/user/Api";
import { API_URL } from "../../../config/config";
import MyModal from "../modal/MyModal";

const StoryStatistic = ({ storyId, token, borderColor, gender }) => {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [views, setViews] = useState([]);
  const [activeTab, setActiveTab] = useState("likes");

  const fetchData = async () => {
    try {
      const response = await apiRequest(
        apiRequestType.get,
        false,
        API_URL.profile.get.get_story_likes_comments + "/" + storyId,
        token
      );
      const likesData = await response.data.likes;
      setLikes(likesData.data);

      const commentsData = await response.data.comments;
      setComments(commentsData.data);

      const viewsData = await response.data.views;
      setViews(viewsData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (window.location.pathname == "/profile") fetchData();
  }, [storyId]);

  return (
    <div>
      <MyModal
        title="Story Comment & Likes Statistics"
        modalWidth="700px"
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
                    marginRight: "10px",
                  }}
                />

                <PreviewIcon
                  style={{
                    color:
                      borderColor === "Friend"
                        ? "#0500ff"
                        : borderColor === "CloseFriend"
                        ? "#1eff1e"
                        : "#FF008A",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveTab("views")}
                />

                {/* Likes Section */}
                <div>
                  {activeTab === "likes" && likes.length > 0 && (
                    <>
                      <Typography
                        style={{
                          cursor: "pointer",
                        }}
                        variant="subtitle1"
                      >
                        Likes
                      </Typography>
                      <Typography
                        style={{
                          cursor: "pointer",
                        }}
                        variant="body2"
                      >{`Total Likes: ${likes.length}`}</Typography>
                      <List>
                        {likes.map((like) => (
                          <ListItem key={like.user_id}>
                            <ListItemAvatar>
                              <Avatar
                                style={{
                                  cursor: "pointer",
                                }}
                                src={userProfileImage(
                                  like.gender,
                                  like.profileImage
                                )}
                                alt={like.username}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              style={{
                                cursor: "pointer",
                              }}
                              primary={like.username}
                            />
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
                      <Typography
                        style={{
                          cursor: "pointer",
                        }}
                        variant="subtitle1"
                      >
                        Comments
                      </Typography>
                      <Typography
                        style={{
                          cursor: "pointer",
                        }}
                        variant="body2"
                      >{`Total Comments: ${comments.length}`}</Typography>
                      <List>
                        {comments.map((comment) => (
                          <ListItem key={comment.user_id}>
                            <ListItemAvatar>
                              <Avatar
                                style={{
                                  cursor: "pointer",
                                }}
                                src={userProfileImage(
                                  comment.gender,
                                  comment.profileImage
                                )}
                                alt={comment.username}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              style={{
                                cursor: "pointer",
                              }}
                              primary={comment.username}
                              secondary={comment.comment_text}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </div>
                <div>
                  {activeTab === "views" && views.length > 0 && (
                    <>
                      <Typography
                        style={{
                          cursor: "pointer",
                        }}
                        variant="subtitle1"
                      >
                        Views
                      </Typography>
                      <Typography
                        style={{
                          cursor: "pointer",
                        }}
                        variant="body2"
                      >{`Total Views: ${views.length}`}</Typography>
                      <List>
                        {views.map((view) => (
                          <ListItem key={view.user_id}>
                            <ListItemAvatar>
                              <Avatar
                                style={{
                                  cursor: "pointer",
                                }}
                                src={userProfileImage(
                                  view.gender,
                                  view.profileImage
                                )}
                                alt={view.username}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              style={{
                                cursor: "pointer",
                              }}
                              primary={view.username}
                              secondary={view.createdAt.slice(0, 10)}
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

export default StoryStatistic;
