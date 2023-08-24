import React from "react";
import {
  LoginPageForm,
  LoginPageFormContainer,
  LoginPageLogo,
  LoginPageMain,
  LoginPageNavbar,
  LoginPageNavbarButton,
  LoginPageNavbarButtons,
} from "./LoginPageStyle";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const LoginPage = () => {
  return (
    <LoginPageMain>
      <LoginPageNavbar>
        <Link to={"/"}>
          <LoginPageLogo>CONNECT</LoginPageLogo>
        </Link>
        <LoginPageNavbarButtons>
          <LoginPageNavbarButton>ABOUT</LoginPageNavbarButton>
          <LoginPageNavbarButton>INSTRUCTIONS</LoginPageNavbarButton>
        </LoginPageNavbarButtons>
      </LoginPageNavbar>
      <LoginPageFormContainer>
        <LoginPageForm>
          <Typography mb={2} component="h1" variant="h1">
            Login
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={() => loginUser()}
          >
            LOGIN
          </Button>
          <Grid mb={2} container justifyContent="flex-end">
            <Grid item>
              <Link to={"/register"}>
                <div style={{ textDecoration: "underline", color: "blue" }}>
                  Don't have an account? register
                </div>
              </Link>
            </Grid>
          </Grid>
        </LoginPageForm>
      </LoginPageFormContainer>
    </LoginPageMain>
  );
};

export default LoginPage;
