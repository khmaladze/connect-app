import React, { Fragment } from "react";
import { Avatar, Button, Grid } from "@mui/material";
import {
  apiRequest,
  apiRequestType,
  userProfileImage,
} from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import { PostHeader, PostHeaderContainer, PostHeaderDiv } from "../PostStyle";
import MyModal from "../../modal/MyModal";

const PostHeaderComponent = ({
  gender,
  profileImage,
  firstname,
  lastname,
  createdAt,
  list,
  postId,
  token,
  profilePosts,
  setProfilePosts,
}) => {
  const removeObjectFromArray = (arr, postIdToRemove) => {
    return arr.filter((item) => item._id !== postIdToRemove);
  };

  const deleteUserPosthandle = async (postId, token) => {
    if (window.location.pathname == "/profile")
      try {
        const response = await apiRequest(
          apiRequestType.post,
          true,
          API_URL.profile.post.delete_post + postId,
          token
        );
        if (response?.success) {
          setProfilePosts(removeObjectFromArray(profilePosts, postId));
          if (profilePosts.length === 1) {
            window.location.reload();
          }
        }
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <PostHeader borderColor={list}>
      <PostHeaderContainer>
        <Avatar
          style={{ height: "55px", width: "55px" }}
          alt="user"
          src={userProfileImage(gender, profileImage)}
        />
        <PostHeaderDiv />
        <h3>{firstname + " " + lastname}</h3>
      </PostHeaderContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>{createdAt && createdAt}</h3>
        {window.location.pathname == "/profile" && (
          <Fragment>
            <div style={{ width: "10px" }}></div>
            <MyModal
              title="Delete Post"
              ButtonText={
                <span className="material-symbols-outlined">delete</span>
              }
              body={
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <p>
                      When you click 'Delete Post' your post will be permanently
                      removed
                    </p>
                    <Button
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        color: "red",
                        borderColor: "red",
                      }}
                      variant="outlined"
                      onClick={async () => {
                        await deleteUserPosthandle(postId, token);
                      }}
                    >
                      Delete Post
                    </Button>
                  </Grid>
                </Grid>
              }
            />
          </Fragment>
        )}
      </div>
    </PostHeader>
  );
};

export default PostHeaderComponent;
