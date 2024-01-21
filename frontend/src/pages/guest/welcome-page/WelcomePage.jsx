import React, { Fragment } from "react";
import Typewriter from "typewriter-effect";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { WelcomePageMain, WelcomePageMovingText } from "./WelcomePageStyle";
import { StyledDisclaimer } from "../about/About";
import { Typography } from "@mui/material";

const WelcomePage = () => {
  return (
    <Fragment>
      <WelcomePageMain>
        <WelcomePageMovingText>
          <div className="welcome__text">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .pasteString(
                    "CREATE ACCOUNT, LOG IN, CREATE POST, CREATE STORY, LIKE & COMMENT, UPLOAD IMAGES VIDEOS, ADD FRIEND, MESSAGE TO YOUR FRIEND  "
                  )
                  .pauseFor(5000)
                  .deleteAll()
                  .typeString(
                    "CREATE ACCOUNT, LOG IN, CREATE POST, CREATE STORY, LIKE & COMMENT, UPLOAD IMAGES VIDEOS, ADD FRIEND, MESSAGE TO YOUR FRIEND  "
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
            style={{
              margin: "10px",
              display: "none",
              sm: "block",
              md: "block",
            }}
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
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "column", md: "row" }}
          alignItems="center"
          style={{
            marginTop: "30px",
          }}
        >
          <StyledDisclaimer>
            <Typography variant="body1" paragraph>
              This is a portfolio project intended for demonstration purposes
              only. It is not meant for real-world use but rather to showcase my
              skills to potential recruiters and employers.
            </Typography>
          </StyledDisclaimer>
        </Stack>
      </WelcomePageMain>
    </Fragment>
  );
};

export default WelcomePage;
