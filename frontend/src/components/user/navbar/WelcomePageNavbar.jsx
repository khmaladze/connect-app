import React from "react";
import {
  WelcomePageLogo,
  WelcomePageNavbarButton,
  WelcomePageNavbarButtons,
  WelcomePageNavbarMain,
} from "./WelcomePageNavbarStyle";
import { Link } from "react-router-dom";

const WelcomePageNavbar = () => {
  return (
    <WelcomePageNavbarMain>
      <Link to={"/"}>
        <WelcomePageLogo>CONNECT</WelcomePageLogo>
      </Link>
      <WelcomePageNavbarButtons>
        <Link to={"/about"}>
          <WelcomePageNavbarButton>ABOUT</WelcomePageNavbarButton>
        </Link>
        <Link to={"/instructions"}>
          <WelcomePageNavbarButton>INSTRUCTIONS</WelcomePageNavbarButton>
        </Link>
      </WelcomePageNavbarButtons>
    </WelcomePageNavbarMain>
  );
};

export default WelcomePageNavbar;
