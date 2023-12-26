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

const CommentsSection = ({ activeTab, comments }) => {
  return (
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
                    src={userProfileImage(comment.gender, comment.profileImage)}
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
  );
};

export default CommentsSection;
