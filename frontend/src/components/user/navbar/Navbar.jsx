import React, { useState } from "react";
import { FixedNavbar, NavbarLogo, NavbarMain } from "./NavbarStyle";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { API_URL } from "../../../config/config";
import { logOut } from "../../../store/auth";
import {
  apiPutRequest,
  clearUserAuthLocalstorage,
  userProfileImage,
} from "../../../api/user/Api";

const settings = ["profile", "main", "chat", "friend", "logout"];

const Navbar = ({ user, updateSetIsAuth }) => {
  const dispatch = useDispatch();

  const logOutHandle = async () => {
    const response = await apiPutRequest(
      API_URL.auth.put.logout,
      {},
      user.token
    );
    if (response.success) {
      updateSetIsAuth(false);
      setTimeout(() => {
        dispatch(logOut());
        clearUserAuthLocalstorage();
      }, 100);
    }
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <FixedNavbar>
      <NavbarMain>
        <Link to={"/"}>
          <NavbarLogo>CONNECT</NavbarLogo>
        </Link>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open Menu">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                style={{ height: "55px", width: "55px" }}
                alt="user"
                src={userProfileImage(user.gender, user.profileImage)}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                {setting === "logout" ? (
                  <div
                    onClick={logOutHandle}
                    style={{
                      color: "red",
                    }}
                  >
                    {setting}
                  </div>
                ) : (
                  <Typography textAlign="center">
                    <Link to={"/" + setting}>{setting}</Link>
                  </Typography>
                )}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </NavbarMain>
    </FixedNavbar>
  );
};

export default Navbar;
