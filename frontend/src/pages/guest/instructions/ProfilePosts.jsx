import React, { Fragment } from "react";
import { Paper, Typography } from "@mui/material";
import closeFriendImage from "../../../images/closeFriend-post.png";
import friendImage from "../../../images/friend-post.png";
import favoriteImage from "../../../images/favorite-post.png";
import mainFriendPost from "../../../images/main-friend-post.png";
import showMainFriendPost from "../../../images/show-main-friend-post.png";

const ProfilePosts = () => {
  return (
    <Fragment>
      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom>
        Posts
      </Typography>

      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom>
        Friend
      </Typography>

      {/* Image */}
      <Paper elevation={3} style={{ width: "100%", marginBottom: "20px" }}>
        <img
          src={friendImage}
          alt="Instructions"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Paper>

      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom>
        CloseFriend
      </Typography>

      {/* Image */}
      <Paper elevation={3} style={{ width: "100%", marginBottom: "20px" }}>
        <img
          src={closeFriendImage}
          alt="Instructions"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Paper>

      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom>
        Favorite
      </Typography>

      {/* Image */}
      <Paper elevation={3} style={{ width: "100%", marginBottom: "20px" }}>
        <img
          src={favoriteImage}
          alt="Instructions"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Paper>

      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom>
        Create Friend Post
      </Typography>

      {/* Image */}
      <Paper elevation={3} style={{ width: "100%", marginBottom: "20px" }}>
        <img
          src={mainFriendPost}
          alt="Instructions"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Paper>

      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" gutterBottom>
          Click Create Post
        </Typography>
      </Paper>

      {/* Image */}
      <Paper elevation={3} style={{ width: "100%", marginBottom: "20px" }}>
        <img
          src={showMainFriendPost}
          alt="Instructions"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Paper>
    </Fragment>
  );
};

export default ProfilePosts;
