import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useStore } from "react-redux";
import WelcomePage from "./pages/welcome-page/WelcomePage";
import LoginPage from "./pages/login-page/LoginPage";
import RegisterPage from "./pages/register-page/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/profile-page/ProfilePage";
import Navbar from "./components/navbar/Navbar";
import MainPage from "./pages/main-page/MainPage";
import PageNavigator from "./components/page-navigator/PageNavigator";
// import MainPage from "./pages/main-page/MainPage";
// import SettingsPage from "./pages/settings-page/SettingsPage";
// import NotFound from "./pages/not-found/NotFound";

const Routing = () => {
  const navigate = useNavigate();
  const defaultState = JSON.parse(localStorage.getItem("user")) || null;
  let stateValue = defaultState;
  if (stateValue == null) {
    stateValue = false;
  } else {
    stateValue = true;
  }

  const [isAuth, setIsAuth] = useState(stateValue);
  const store = useStore();
  const stateUser = useSelector((state) => state.auth);
  const loginUser = store.getState();
  const customFunctions = {
    customSetIsAuthList: {
      customSetIsAuth: setIsAuth,
    },
  };

  let user;

  if (stateUser !== null) {
    if (stateUser.value !== null) {
      if (stateUser.value.user) {
        user = stateUser.value.user;
      }
    }
  }

  if (user === undefined) {
    if (loginUser.auth.value) {
      user = loginUser.auth.value;
      if (loginUser.auth.value.user) {
        user = loginUser.auth.value.user;
      }
    }
  }

  useEffect(() => {
    if (isAuth) {
      navigate(window.location.pathname);
    }

    if (isAuth === false) {
      if (window.location.pathname === "/login") {
        navigate("/login");
      }
      if (window.location.pathname === "/register") {
        navigate("/register");
      }
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/login"
      ) {
        navigate("/");
      }
    }

    if (isAuth) {
      if (window.location.pathname === "/login") {
        navigate("/profile");
      }
      if (window.location.pathname === "/register") {
        navigate("/profile");
      }
    }
  }, [isAuth]);

  return (
    <Fragment>
      <ToastContainer />
      {isAuth && (
        <Fragment>
          <Navbar onClick={setIsAuth} user={user} />
          <div className="navbar__bottom"></div>
          {window.location.pathname !== "/profile" && (
            <>
              <PageNavigator />
              <div className="navbar__bottom"></div>
            </>
          )}
        </Fragment>
      )}
      <Routes>
        {isAuth && (
          <Fragment>
            <Route
              path="/profile"
              exact
              element={<ProfilePage user={user} onClick={customFunctions} />}
            />
            {/* <Route
              path="/settings"
              exact
              element={<SettingsPage user={user} onClick={customFunctions} />}
            /> */}
            <Route
              path="/"
              exact
              element={<MainPage user={user} onClick={customFunctions} />}
            />
            {/* <Route path="*" exact element={<NotFound />} /> */}
          </Fragment>
        )}
        {isAuth === false && (
          <Fragment>
            <Route path="/" exact element={<WelcomePage />} />
            <Route
              path="/login"
              exact
              element={
                <LoginPage onClick={customFunctions.customSetIsAuthList} />
              }
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
