import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ButtonUpdateUserImage from "./ButtonUpdateUserImage";
import MyModal from "../../modal/MyModal";
import { Button, Grid } from "@mui/material";
import FileImageVideoUploader from "../../../image-video-uploader/ImageVideoUploader";

const UpdateProfileImageModal = ({
  image,
  setImage,
  user,
  updateImageStyle,
}) => {
  return (
    <MyModal
      customStyle={updateImageStyle}
      modalWidth="500px"
      ButtonText={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddPhotoAlternateIcon />}
        >
          Update Image
        </Button>
      }
      title="Update Profile Image"
      body={
        <Grid item xs={12}>
          <FileImageVideoUploader
            files={image}
            setFiles={setImage}
            acceptedFileTypes={["image/*"]}
          />
          <ButtonUpdateUserImage image={image} token={user.token} />
        </Grid>
      }
    />
  );
};

export default UpdateProfileImageModal;
