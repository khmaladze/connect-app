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
        <WelcomePageNavbarButton>ABOUT</WelcomePageNavbarButton>
        <WelcomePageNavbarButton>INSTRUCTIONS</WelcomePageNavbarButton>
      </WelcomePageNavbarButtons>
    </WelcomePageNavbarMain>
  );
};

export default WelcomePageNavbar;
