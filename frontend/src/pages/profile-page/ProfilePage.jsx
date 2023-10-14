import React, { Fragment, useEffect, useState } from "react";
import {
  ProfileDetails,
  ProfileImage,
  ProfileInfoContainer,
  ProfilePageMain,
} from "./ProfilePageStyle";
import {
  apiGetRequest,
  apiPutRequest,
  setLocalstorage,
  userLocalstorage,
  userProfileImage,
} from "../../api/Api";
import {
  API_CONTENT_TYPE,
  API_URL,
  API_URL_REQUEST,
} from "../../config/config";
import UserPost from "../../components/post/UserPost";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import MyModal from "../../components/modal/MyModal";
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

// Register the plugins
registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);
const ProfilePage = ({ user }) => {
  const [userProfileData, setUserProfileData] = useState("");
  const userProfileInfoData =
    JSON.parse(
      localStorage.getItem(userLocalstorage.auth.userProfileInfoData)
    ) || null;

  const [image, setImage] = useState();

  const updateuserprofileimageRequestUrl =
    API_URL.user.user_profile.update_profile_image;

  const updateUserImageHandle = async () => {
    const formData = new FormData();
    formData.append("image", image[0]["file"]);
    const response = await apiPutRequest(
      updateuserprofileimageRequestUrl,
      formData,
      user.token,
      API_CONTENT_TYPE.update_user_profile_image
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
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetRequest(
        API_URL_REQUEST.userprofilegetRequestUrl,
        user.token
      );
      if (response.success) {
        setUserProfileData(response.data);
        setLocalstorage(userLocalstorage.auth.userProfileInfoData, {
          ...response.data,
        });
      }
    };
    if (userProfileInfoData == null) {
      fetchData();
    } else {
      setUserProfileData(userProfileInfoData);
    }
  }, []);

  return (
    <ProfilePageMain>
      <ProfileInfoContainer>
        <ProfileImage image={userProfileImage(user.gender, user.profileImage)}>
          <MyModal
            title={"Update Profile Image"}
            ButtonText={
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddPhotoAlternateIcon />}
              >
                Update Image
              </Button>
            }
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
        <ProfileDetails>
          <div>
            <h2>{user.firstname + " " + user.lastname}</h2>
            <h3>username {user.username}</h3>
            {userProfileData && (
              <Fragment>
                <h3>languages: {userProfileData?.languages[0]}</h3>
                <h3>zodiac: {userProfileData?.zodiac}</h3>
                <h3>degree: {userProfileData?.education}</h3>
                <h3>passion: {userProfileData?.passions[0]}</h3>
              </Fragment>
            )}
          </div>
        </ProfileDetails>
      </ProfileInfoContainer>
      <UserPost />
    </ProfilePageMain>
  );
};

export default ProfilePage;
