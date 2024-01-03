import React, { Fragment } from "react";
import Navbar from "./Navbar";
import PageNavigator from "../page-navigator/PageNavigator";

const TopNavbar = ({ user, customSetIsAuth }) => {
  return (
    <Fragment>
      <Navbar updateSetIsAuth={customSetIsAuth} user={user} />
      <div className="navbar__bottom"></div>
      {window.location.pathname !== "/profile" &&
        window.location.pathname.startsWith("/userprofile") == false && (
          <Fragment>
            <PageNavigator />
          </Fragment>
        )}
    </Fragment>
  );
};

export default TopNavbar;
