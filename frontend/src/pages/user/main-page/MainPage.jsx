import React, { Fragment } from "react";
import MainPostComponent from "../../../components/user/profile-component/post-component/MainPostComponent";
import MainStoryComponent from "../../../components/user/main-story/MainStoryComponent";

const MainPage = ({ user }) => {
  return (
    <Fragment>
      <MainStoryComponent user={user} />
      <MainPostComponent user={user} />
    </Fragment>
  );
};

export default MainPage;
