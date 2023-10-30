import React from "react";
import {
  NavigationBar,
  NavigationContainer,
  NavigationMain,
} from "./PageNavigatorStyle";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

const PageNavigator = () => {
  return (
    <NavigationMain>
      <NavigationContainer>
        <NavigationBar>
          <Link to={"/"}>
            <HomeIcon />
          </Link>
        </NavigationBar>
        <NavigationBar>
          <Link to={"/chat"}>
            <ChatIcon />
          </Link>
        </NavigationBar>
        <NavigationBar>
          <Link to={"/friend"}>
            <PeopleAltIcon />
          </Link>
        </NavigationBar>
        <NavigationBar>
          <Link to={"/profile"}>
            <PersonIcon />
          </Link>
        </NavigationBar>
        <NavigationBar>
          <Link to={"/settings"}>
            <SettingsIcon />
          </Link>
        </NavigationBar>
      </NavigationContainer>
    </NavigationMain>
  );
};

export default PageNavigator;
