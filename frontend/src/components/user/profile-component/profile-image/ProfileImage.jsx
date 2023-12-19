import React, { Fragment, useEffect, useState } from "react";
import {
  apiRequest,
  apiRequestType,
  userProfileImage,
} from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import Button from "@mui/material/Button";
import MyModal from "../../modal/MyModal";
import "filepond/dist/filepond.min.css";
import { Grid } from "@mui/material";
import { ProfileImage } from "./ProfileImageStyle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageUploader from "../../../image-uploader/ImageUploader";
import ButtonUpdateUserImage from "./ButtonUpdateUserImage";

const ProfileImageComponent = ({ user }) => {
  const [image, setImage] = useState();
  const [profileStory, setProfileStory] = useState();

  const fetchProfilePost = async () => {
    try {
      const response = await apiRequest(
        apiRequestType.get,
        false,
        `${API_URL.profile.get.profile_story}`,
        user.token
      );

      if (response?.success) {
        setProfileStory(response.data);
      } else {
        console.error("Error fetching profile story:", response?.message);
      }
    } catch (error) {
      console.error("Error fetching profile story:", error);
    }
  };

  useEffect(() => {
    fetchProfilePost();
  }, [user.token]);

  return (
    <Fragment>
      <ProfileImage image={userProfileImage(user.gender, user.profileImage)}>
        <MyModal
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
              <ImageUploader files={image} setFiles={setImage} />
              <ButtonUpdateUserImage image={image} token={user.token} />
            </Grid>
          }
        />
      </ProfileImage>
    </Fragment>
  );
};

export default ProfileImageComponent;
