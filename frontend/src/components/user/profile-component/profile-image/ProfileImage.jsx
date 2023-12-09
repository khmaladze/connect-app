import React, { useState } from "react";
import {
  apiRequest,
  apiRequestType,
  setLocalstorage,
  userLocalstorage,
  userProfileImage,
} from "../../../../api/user/Api";
import { API_CONTENT_TYPE_LIST, API_URL } from "../../../../config/config";
import Button from "@mui/material/Button";
import MyModal from "../../modal/MyModal";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { ProfileImage } from "./ProfileImageStyle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

const ProfileImageComponent = ({ user }) => {
  const [image, setImage] = useState();
  // const [profileImage, setProfileImage] = useState();

  const updateUserImageHandle = async () => {
    if (!image || !image[0] || !image[0].file) {
      toast.error("Please add an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image[0].file);

    try {
      const response = await apiRequest(
        apiRequestType.put,
        true,
        API_URL.profile.put.updateUserProfileImage,
        user.token,
        formData,
        API_CONTENT_TYPE_LIST.application_x_www_form_urlencoded
      );

      if (response?.success) {
        const userProfileData = JSON.parse(
          localStorage.getItem(userLocalstorage.auth.user)
        );

        localStorage.removeItem(userLocalstorage.auth.user);
        setLocalstorage(userLocalstorage.auth.user, {
          ...userProfileData,
          ...response.data,
        });

        // setProfileImage(response.data.profileImage);

        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  return (
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
            <FilePond
              files={image}
              allowMultiple={false}
              maxFiles={1}
              onupdatefiles={setImage}
              allowFileSizeValidation={true}
              maxFileSize={"5MB"}
              acceptedFileTypes={["image/*"]}
              name="files"
              labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
            />
            <Button
              style={{ width: "100%", marginTop: "10px" }}
              variant="contained"
              color="primary"
              onClick={updateUserImageHandle}
            >
              Update
            </Button>
          </Grid>
        }
      />
    </ProfileImage>
  );
};

export default ProfileImageComponent;
