import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { userProfileImage } from "../../../../../api/user/Api";

const LikesSection = ({ activeTab, likes }) => {
  return (
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
                    src={userProfileImage(like.gender, like.profileImage)}
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
  );
};

export default LikesSection;
