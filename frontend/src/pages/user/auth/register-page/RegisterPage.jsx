import React, { useState } from "react";
import {
  RegisterPageForm,
  RegisterPageFormContainer,
  RegisterPageMain,
} from "./RegisterPageStyle";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { API_URL } from "../../../../config/config";
import WelcomePageNavbar from "../../../../components/user/navbar/WelcomePageNavbar";
import { apiRequest } from "../../../../api/user/Api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async () => {
    if (
      !firstname &&
      !lastname &&
      !username &&
      !gender &&
      !dateOfBirth &&
      !email &&
      !password &&
      !confirmPassword
    ) {
      toast.error("please add all the fields");
      return;
    }
    const postData = {
      firstname,
      lastname,
      username,
      gender,
      birthDay: String(dateOfBirth.slice(8, 10)),
      birthMonth: String(dateOfBirth.slice(5, 7)),
      birthYear: String(dateOfBirth.slice(0, 4)),
      email,
      password,
      confirmPassword,
    };
    const response = await apiRequest(
      "POST",
      API_URL.auth.post.register,
      null,
      postData
    );
    if (response?.success) {
      navigate("/");
    }
  };

  return (
    <RegisterPageMain>
      <WelcomePageNavbar />
      <RegisterPageFormContainer>
        <RegisterPageForm>
          <Typography mb={2} component="h1" variant="h1">
            Register
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                required
                fullWidth
                autoComplete="given-name"
                name="firstName"
                id="firstName"
                label="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="gender"
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="date"
                label="Birthday"
                type="date"
                fullWidth
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                inputProps={{
                  max: "2010-01-01",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
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
            <Grid item xs={12}>
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => registerUser()}
          >
            REGISTER
          </Button>
          <Grid mb={2} container justifyContent="flex-end">
            <Grid item>
              <Link to={"/login"}>
                <div style={{ textDecoration: "underline", color: "blue" }}>
                  Already have an account? login
                </div>
              </Link>
            </Grid>
          </Grid>
        </RegisterPageForm>
      </RegisterPageFormContainer>
    </RegisterPageMain>
  );
};

export default RegisterPage;
