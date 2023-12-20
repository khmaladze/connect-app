import React, { useState } from "react";
import StoryComponent from "./StoryComponent";
import { Button, Grid } from "@mui/material";

const StorySwitcher = ({ data }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const switchToNextStory = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex < data.length - 1 ? prevIndex + 1 : 0
    );
  };

  const switchToPrevStory = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : data.length - 1
    );
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <StoryComponent data={data[currentStoryIndex]} />
      </Grid>
      <Grid item container justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={switchToPrevStory}>
          Previous Story
        </Button>
        <Button variant="contained" color="primary" onClick={switchToNextStory}>
          Next Story
        </Button>
      </Grid>
    </Grid>
  );
};

export default StorySwitcher;
