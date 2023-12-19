import React, { Fragment } from "react";
import MyModal from "../../modal/MyModal";
import { Grid } from "@mui/material";
import DeletePostButton from "./DeletePostButton";

const DeletePostComponent = ({
  postId,
  token,
  profilePosts,
  setProfilePosts,
}) => {
  return (
    <Fragment>
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
                  <DeletePostButton
                    postId={postId}
                    token={token}
                    profilePosts={profilePosts}
                    setProfilePosts={setProfilePosts}
                  />
                </Grid>
              </Grid>
            }
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default DeletePostComponent;
