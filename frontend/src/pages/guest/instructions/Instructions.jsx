import React from "react";
import { Typography, Paper, Container } from "@mui/material";
import { StyledDisclaimer } from "../about/About";
import welcomePageImage from "../../../images/welcome-page.png";
import Register from "./Register";
import LoginInstructions from "./Login";
import Profile from "./Profile";
import ProfilePosts from "./ProfilePosts";

const Instructions = () => {
  return (
    <Container maxWidth="md">
      <StyledDisclaimer>
        <Typography variant="body1" paragraph>
          This is a portfolio project intended for demonstration purposes only.
          It is not meant for real-world use but rather to showcase my skills to
          potential recruiters and employers.
        </Typography>
      </StyledDisclaimer>

      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom>
        Instructions
      </Typography>

      {/* Image */}
      <Paper elevation={3} style={{ width: "100%", marginBottom: "20px" }}>
        <img
          src={welcomePageImage}
          alt="Instructions"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Paper>

      {/* Description */}
      <Typography variant="body1" align="justify" gutterBottom>
        Welcome to our Portfolio Application!
      </Typography>

      {/* Add more descriptions as needed */}

      <Register />

      <LoginInstructions />

      <Profile />

      <ProfilePosts />
    </Container>
  );
};

export default Instructions;
