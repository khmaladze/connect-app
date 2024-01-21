import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import registerPageImage from "../../../images/register-page.png";

const Register = () => {
  return (
    <Fragment>
      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom>
        User Registration
      </Typography>
      {/* Image */}
      <Paper elevation={3} style={{ width: "100%", marginBottom: "20px" }}>
        <img
          src={registerPageImage}
          alt="Instructions"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Paper>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" gutterBottom>
          Welcome to our community! Follow these instructions to register and
          start your journey:
        </Typography>

        <List>
          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                <strong>Firstname:</strong> Enter your first name.
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                <strong>Lastname:</strong> Enter your last name.
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                <strong>Username:</strong> Choose a unique username.
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                <strong>Email:</strong> Use an email address from Gmail, Yahoo,
                or Outlook for registration.
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                <strong>Date of Birth:</strong> Provide your date of birth (Day,
                Month, Year).
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                <strong>Password:</strong> Create a strong password with at
                least 10 characters, including one lowercase letter, one
                uppercase letter, one digit, and one special character. example:
                aA1234567890!
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                <strong>Confirm Password:</strong> Re-enter your password for
                confirmation.
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Paper>
      <Typography variant="body1" align="justify" gutterBottom>
        These guidelines will help ensure the security of your account and
        provide you with a seamless registration process. If you encounter any
        issues or have questions, feel free to reach out for assistance.
      </Typography>
    </Fragment>
  );
};

export default Register;
