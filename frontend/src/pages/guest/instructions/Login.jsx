import React, { Fragment } from "react";
import { Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import loginPageImage from "../../../images/login-page.png";

const LoginInstructions = () => {
  return (
    <Fragment>
      <Typography variant="h4" align="center" gutterBottom>
        User Login
      </Typography>

      <Paper elevation={3} style={{ width: "100%", marginBottom: "20px" }}>
        <img
          src={loginPageImage}
          alt="Instructions"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Paper>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" gutterBottom>
          Welcome back! To access your account, follow these simple
          instructions:
        </Typography>

        <List>
          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                <strong>Email:</strong> Enter the email address associated with
                your account.
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                <strong>Password:</strong> Provide your secure password.
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Paper>

      <Typography variant="body1" align="justify" gutterBottom>
        Once you've entered your credentials, click the login button to access
        your personalized experience. If you encounter any issues or have
        questions, feel free to reach out for assistance.
      </Typography>
    </Fragment>
  );
};

export default LoginInstructions;
