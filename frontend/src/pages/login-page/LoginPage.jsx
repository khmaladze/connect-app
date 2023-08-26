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
import {
  apiPostRequest,
  setLocalstorage,
  userLocalstorage,
} from "../../api/Api";
import { API_URL_REQUEST } from "../../config/config";
import { logIn } from "../../store/auth";
import { userLogin } from "../../store/isLogIn";
import { toast } from "react-toastify";
import WelcomePageNavbar from "../../components/navbar/WelcomePageNavbar";

const LoginPage = ({ onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUserHandle = async () => {
    if (!email || !password) {
      toast.error("please add all the fields");
    }

    const postData = {
      email,
      password,
    };

    const response = await apiPostRequest(
      API_URL_REQUEST.loginRequestUrl,
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
      onClick.customSetIsAuth(true);
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
