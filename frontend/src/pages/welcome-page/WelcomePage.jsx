import React from "react";
import { WelcomePageMain, WelcomePageMovingText } from "./WelcomePageStyle";
import Typewriter from "typewriter-effect";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import WelcomePageNavbar from "../../components/navbar/WelcomePageNavbar";

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
                  "CREATE ACCOUNT, lOG IN, CREATE POST, LIKE & COMMENT, UPLOAD IMAGES VIDEOS, ADD FRIEND, MESSAGE TO YOUR FRIEND  "
                )
                .pauseFor(5000)
                .deleteAll()
                .typeString(
                  "CREATE ACCOUNT, lOG IN, CREATE POST, LIKE & COMMENT, UPLOAD IMAGES VIDEOS, ADD FRIEND, MESSAGE TO YOUR FRIEND  "
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
      <Stack spacing={2} direction="row">
        <Link to={"/login"}>
          <Button
            variant="outlined"
            style={{
              background: "white",
              color: "black",
              border: "black 1px solid",
              height: "50px",
              width: "100px",
              fontFamily: "'Raleway', sans-serif",
            }}
          >
            LOGIN
          </Button>
        </Link>
        <div style={{ width: "70px" }}></div>
        <Link to={"/register"}>
          <Button
            variant="contained"
            style={{
              background: "black",
              color: "white",
              height: "50px",
              width: "100px",
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
