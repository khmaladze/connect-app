import React from "react";
import { Avatar } from "@mui/material";
import { userProfileImage } from "../../api/Api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCommentIcon from "@mui/icons-material/AddComment";

const UserPost = ({
  firstname,
  lastname,
  text,
  image,
  profileImage,
  createdAt,
  gender,
}) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            width: "700px",
            minHeight: "350px",
            border: "3px solid #1eff1e",
            background: "white",
            borderRadius: "15px",
            transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            boxShadow:
              " 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "70px",
              width: "100%",
              borderBottom: " 3px solid #1eff1e",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: "170px",
              }}
            >
              <Avatar
                style={{ height: "55px", width: "55px" }}
                alt="user"
                src={userProfileImage(gender, profileImage)}
              />
              <h3>{firstname + " " + lastname}</h3>
            </div>
            <h3>{createdAt.slice(0, 10)}</h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              minWidth: "170px",
              padding: "10px",
            }}
          >
            <h4>{text || ""} </h4>
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              minHeight: "350px",
              maxHeight: "500px",
              backgroundSize: "contain",
              backgroundImage: `url(${image || ""})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "50px",
              width: "100%",
              borderTop: "3px solid #1eff1e",
              padding: "10px",
            }}
          >
            <div>
              <FavoriteBorderIcon />
              <AddCommentIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPost;
