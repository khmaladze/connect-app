import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useStore } from "react-redux";
import WelcomePage from "./pages/guest/welcome-page/WelcomePage";
import LoginPage from "./pages/user/auth/login-page/LoginPage";
import RegisterPage from "./pages/user/auth/register-page/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/user/profile-page/ProfilePage";
import MainPage from "./pages/user/main-page/MainPage";
import FriendPage from "./pages/user/friend-page/FriendPage";
import TopNavbar from "./components/user/navbar/TopNavbar";
import SettingsPage from "./pages/user/settings-page/SettingsPage";
import ChatPage from "./pages/user/chat-page/ChatPage";
import MessagePage from "./pages/user/chat-page/MessagePage";
import UserProfile from "./pages/user/userprofile/UserProfile";
import WelcomePageNavbar from "./components/user/navbar/WelcomePageNavbar";
import About from "./pages/guest/about/About";
import Instructions from "./pages/guest/instructions/Instructions";
import WelcomeNotification from "./components/welcome-page/WelcomeNotification";
// import MainPage from "./pages/main-page/MainPage";
// import SettingsPage from "./pages/settings-page/SettingsPage";
// import NotFound from "./pages/not-found/NotFound";

const Routing = () => {
  const navigate = useNavigate();
  const defaultState = JSON.parse(localStorage.getItem("user")) || null;

  // Simplify isAuth initialization
  const [isAuth, setIsAuth] = useState(!!defaultState);

  const store = useStore();
  const stateUser = useSelector((state) => state.auth);
  const loginUser = store.getState();

  // Simplify user assignment
  let user = stateUser?.user || loginUser?.auth?.user;

  useEffect(() => {
    if (isAuth) {
      navigate(window.location.pathname);
    } else {
      const path = window.location.pathname;
      const isAllowedPath =
        path === "/login" ||
        path === "/register" ||
        path === "/about" ||
        path == "/instructions";

      // Use ternary operator for navigation
      navigate(isAllowedPath ? path : "/");
    }
  }, [isAuth]);

  return (
    <Fragment>
      <ToastContainer />
      {isAuth ? (
        <TopNavbar user={user} customSetIsAuth={setIsAuth} />
      ) : (
        <Fragment>
          {/* Display the welcome page navbar */}
          <WelcomePageNavbar />
        </Fragment>
      )}
      {!isAuth && <WelcomeNotification />}
      <Routes>
        {isAuth ? (
          <Fragment>
            <Route
              path="/profile"
              exact
              element={<ProfilePage user={user} />}
            />
            <Route path="/main" element={<MainPage user={user} />} />
            <Route
              path="/settings"
              exact
              element={<SettingsPage user={user} />}
            />
            <Route path="/" exact element={<MainPage user={user} />} />
            <Route path="/friend" exact element={<FriendPage user={user} />} />
            <Route path="/chat" exact element={<ChatPage user={user} />} />
            <Route
              path="/chat/:friendId"
              exact
              element={<MessagePage user={user} />}
            />
            <Route
              path="/userprofile/:profileId"
              exact
              element={<UserProfile user={user} />}
            />
            {/* <Route path="*" exact element={<NotFound />} /> */}
          </Fragment>
        ) : (
          <Fragment>
            <Route path="/" exact element={<WelcomePage />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/instructions" exact element={<Instructions />} />
            <Route
              path="/login"
              exact
              element={<LoginPage updateSetIsAuth={setIsAuth} />}
            />
            <Route path="/register" exact element={<RegisterPage />} />
          </Fragment>
        )}
      </Routes>
    </Fragment>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
};

export default App;
