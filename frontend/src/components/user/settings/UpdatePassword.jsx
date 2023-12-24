import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import MyModal from "../modal/MyModal";
import { API_URL } from "../../../config/config";
import { apiRequest, apiRequestType } from "../../../api/user/Api";

const UpdatePassword = ({ user }) => {
  const [password, setPassword] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState([]);

  const updateUserPassword = async () => {
    const response = await apiRequest(
      apiRequestType.put,
      true,
      API_URL.settings.put.user_password_update,
      user.token,
      { password: password, confirmPassword: confirmPassword }
    );
    if (response.success) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <MyModal
      title="Update Password"
      customStyle={{
        width: "200px",
        maxWidth: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ButtonText={
        <Button variant="contained" color="primary">
          Update Password
        </Button>
      }
      body={
        <Grid container>
          {/* Password */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          {/* Confirm Password */}
          <Grid
            item
            xs={12}
            style={{
              marginTop: "15px",
            }}
          >
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Button
            style={{
              marginTop: "15px",
            }}
            variant="contained"
            color="primary"
            onClick={() => {
              updateUserPassword();
            }}
          >
            Update Password
          </Button>
        </Grid>
      }
    />
  );
};

export default UpdatePassword;
