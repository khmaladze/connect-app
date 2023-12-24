import React from "react";
import Typewriter from "typewriter-effect";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import WelcomePageNavbar from "../../../components/user/navbar/WelcomePageNavbar";
import { WelcomePageMain, WelcomePageMovingText } from "./WelcomePageStyle";

const WelcomePage = () => {
  return (
    <WelcomePageMain>
      <WelcomePageNavbar />
      <WelcomePageMovingText>
        <div className="welcome__text">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .pasteString(
                  "CREATE ACCOUNT, LOG IN, CREATE POST, LIKE & COMMENT, UPLOAD IMAGES VIDEOS, ADD FRIEND, MESSAGE TO YOUR FRIEND  "
                )
                .pauseFor(5000)
                .deleteAll()
                .typeString(
                  "CREATE ACCOUNT, LOG IN, CREATE POST, LIKE & COMMENT, UPLOAD IMAGES VIDEOS, ADD FRIEND, MESSAGE TO YOUR FRIEND  "
                )
                .start();
            }}
            options={{
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </WelcomePageMovingText>
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "column", md: "row" }}
        alignItems="center"
      >
        <Link to={"/login"}>
          <Button
            variant="outlined"
            style={{
              background: "white",
              color: "black",
              border: "black 1px solid",
              height: "50px",
              width: "100%",
              maxWidth: "200px",
              fontFamily: "'Raleway', sans-serif",
            }}
          >
            LOGIN
          </Button>
        </Link>
        <div
          style={{ margin: "10px", display: "none", sm: "block", md: "block" }}
        ></div>
        <Link to={"/register"}>
          <Button
            variant="contained"
            style={{
              background: "black",
              color: "white",
              height: "50px",
              width: "100%",
              maxWidth: "200px",
              fontFamily: "'Raleway', sans-serif",
            }}
          >
            REGISTER
          </Button>
        </Link>
      </Stack>
    </WelcomePageMain>
  );
};

export default WelcomePage;
