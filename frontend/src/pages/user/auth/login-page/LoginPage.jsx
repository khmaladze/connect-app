import React, { useState } from "react";
import {
  LoginPageForm,
  LoginPageFormContainer,
  LoginPageMain,
} from "./LoginPageStyle";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../../store/isLogIn";
import { toast } from "react-toastify";
import WelcomePageNavbar from "../../../../components/user/navbar/WelcomePageNavbar";
import {
  apiRequest,
  apiRequestType,
  setLocalstorage,
  userLocalstorage,
} from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import { logIn } from "../../../../store/auth";

const LoginPage = ({ updateSetIsAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUserHandle = async () => {
    if (!email || !password) {
      toast.error("please add all the fields");
      return;
    }

    const postData = {
      email,
      password,
    };

    const response = await apiRequest(
      apiRequestType.post,
      true,
      API_URL.auth.post.login,
      null,
      postData
    );

    if (response?.success) {
      const responseData = response.data;
      const getUser = await responseData.user;
      const getUserToken = await responseData.token;
      setLocalstorage(userLocalstorage.auth.user, {
        ...getUser,
        token: getUserToken,
      });
      dispatch(
        logIn({
          ...getUser,
          token: getUserToken,
        })
      );
      dispatch(userLogin());
      updateSetIsAuth(true);
      navigate("/");
    }
  };

  return (
    <LoginPageMain>
      <WelcomePageNavbar />
      <LoginPageFormContainer>
        <LoginPageForm>
          <Typography mb={2} component="h1" variant="h1">
            Login
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => loginUserHandle()}
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
