import React, { Fragment } from "react";
import { Paper, Typography } from "@mui/material";
import profilePageImage from "../../../images/profile-page.png";

const Profile = () => {
  return (
    <Fragment>
      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom>
        User Profile Page
      </Typography>
      {/* Image */}
      <Paper elevation={3} style={{ width: "100%", marginBottom: "20px" }}>
        <img
          src={profilePageImage}
          alt="Instructions"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Paper>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" gutterBottom>
          After logging in, you can visit to your personalized profile page,
          where you can manage and showcase your information. On this page, you
          have the ability to update your profile image and provide details
          about yourself, including your preferred languages, educational
          degree, and passions. Profile Information: Profile Image: Easily
          update your profile picture to reflect your current style or mood.
          Languages: Share the languages you speak or are learning. Degree:
          Highlight your educational background by adding your degree
          information. Passion: Express your passions and interests to connect
          with like-minded individuals. Here, you can: Create Posts: Share your
          updates, thoughts, and moments with your network. Share Stories: Craft
          engaging stories using images, videos, and text to captivate your
          audience. Feel free to utilize the platform to express yourself,
          connect with friends, and make your profile uniquely yours!
        </Typography>
      </Paper>
    </Fragment>
  );
};

export default Profile;
