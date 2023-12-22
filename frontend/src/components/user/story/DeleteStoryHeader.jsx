import React, { Fragment } from "react";
import { Button, Grid } from "@mui/material";
import MyModal from "../modal/MyModal";
import DeleteStoryButton from "./DeleteStoryButton";

const DeleteStoryHeader = ({ storyId, token }) => {
  return (
    <Fragment>
      {window.location.pathname == "/profile" && (
        <Fragment>
          <div style={{ width: "10px" }}></div>
          <MyModal
            title="Delete Story"
            ButtonText={
              <Button
                style={{
                  width: "100%",
                  marginTop: "10px",
                  color: "red",
                  borderColor: "red",
                }}
                variant="outlined"
              >
                Delete Story
              </Button>
            }
            body={
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p>
                    When you click 'Delete Story' your story will be permanently
                    removed
                  </p>
                  <DeleteStoryButton storyId={storyId} token={token} />
                </Grid>
              </Grid>
            }
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default DeleteStoryHeader;
