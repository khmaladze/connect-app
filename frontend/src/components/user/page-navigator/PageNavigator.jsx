import React from "react";
import {
  NavigationBar,
  NavigationContainer,
  NavigationMain,
} from "./PageNavigatorStyle";
import { Link } from "react-router-dom";
// import HomeIcon from "@mui/icons-material/Home";
// import ChatIcon from "@mui/icons-material/Chat";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import PersonIcon from "@mui/icons-material/Person";
// import SettingsIcon from "@mui/icons-material/Settings";

const PageNavigator = () => {
  return (
    <NavigationMain>
      <NavigationContainer>
        <NavigationBar>
          <Link to={"/"}>
            {/* <HomeIcon /> */}
            <span className="material-symbols-outlined">home</span>
          </Link>
        </NavigationBar>
        <NavigationBar>
          <Link to={"/chat"}>
            {/* <ChatIcon /> */}
            <span className="material-symbols-outlined">chat_bubble</span>
          </Link>
        </NavigationBar>
        <NavigationBar>
          <Link to={"/friend"}>
            {/* <PeopleAltIcon /> */}
            <span className="material-symbols-outlined">group</span>
          </Link>
        </NavigationBar>
        <NavigationBar>
          <Link to={"/profile"}>
            {/* <PersonIcon /> */}
            <span className="material-symbols-outlined">person</span>
          </Link>
        </NavigationBar>
        <NavigationBar>
          <Link to={"/settings"}>
            {/* <SettingsIcon /> */}
            <span className="material-symbols-outlined">settings</span>
          </Link>
        </NavigationBar>
      </NavigationContainer>
    </NavigationMain>
  );
};

export default PageNavigator;
