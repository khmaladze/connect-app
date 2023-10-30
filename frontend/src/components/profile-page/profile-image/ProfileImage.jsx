import React, { useState } from "react";
import {
  apiPutRequest,
  setLocalstorage,
  userLocalstorage,
  userProfileImage,
} from "../../../api/user/Api";
import { API_CONTENT_TYPE_LIST, API_URL } from "../../../config/config";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import MyModal from "../../user/modal/MyModal";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Import the plugin code
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// Import the plugin code
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { ProfileImage } from "./ProfileImageStyle";

// Register the plugins
registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);
const ProfileImageComponent = ({ user }) => {
  const [image, setImage] = useState();

  const updateUserImageHandle = async () => {
    if (image && image[0] && image[0]["file"]) {
      const formData = new FormData();
      formData.append("image", image[0]["file"]);
      const response = await apiPutRequest(
        API_URL.profile.put.updateUserProfileImage,
        formData,
        user.token,
        API_CONTENT_TYPE_LIST.application_x_www_form_urlencoded
      );

      if (response.success) {
        const userProfileData = JSON.parse(
          localStorage.getItem(userLocalstorage.auth.user)
        );

        localStorage.removeItem(userLocalstorage.auth.user);
        setLocalstorage(userLocalstorage.auth.user, {
          ...userProfileData,
          ...response.data,
        });
        window.location.reload();
      }
    } else {
      toast.error("please add image");
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
        title={"Update Profile Image"}
        body={
          <div>
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
                style={{ width: "100%" }}
                variant="contained"
                color="primary"
                onClick={updateUserImageHandle}
              >
                Update
              </Button>
            </Grid>
          </div>
        }
      />
    </ProfileImage>
  );
};

export default ProfileImageComponent;
