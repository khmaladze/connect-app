import React from "react";
import MyModal from "../../modal/MyModal";
import { Button, Grid } from "@mui/material";
import StorySwitcher from "../../story/StorySwitcher";

const ViewStoryModal = ({ user, profileStory }) => {
  return (
    <MyModal
      customStyle={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        width: "100%",
        maxWidth: "500px",
      }}
      modalWidth="800px"
      ButtonText={
        <Button
          variant="contained"
          color="primary"
          startIcon={<span className="material-symbols-outlined">preview</span>}
        >
          View Story
        </Button>
      }
      title="View Story"
      body={
        <Grid item xs={12}>
          <StorySwitcher
            data={profileStory}
            token={user.token}
            gender={user.gender}
          />
        </Grid>
      }
    />
  );
};

export default ViewStoryModal;
