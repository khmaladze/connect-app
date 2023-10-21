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
import { API_CONTENT_TYPE_LIST, API_URL } from "../../config/config";
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
import InfoIcon from "@mui/icons-material/Info";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { education, languages, passions } from "../../data/userInfoData";
import { toast } from "react-toastify";
import AddPost from "../../components/post/AddPost";

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
  const [selectLanguage, setselectLanguage] = useState(
    userProfileInfoData ? userProfileInfoData.languages[0] : ""
  );
  const [selectEducation, setselectEducation] = useState(
    userProfileInfoData ? userProfileInfoData.education : ""
  );
  const [selectPassion, setselectPassion] = useState(
    userProfileInfoData ? userProfileInfoData.passions[0] : ""
  );
  const [profilePosts, setProfilePosts] = useState("");

  const updateUserImageHandle = async () => {
    if (image && image[0] && image[0]["file"]) {
      const formData = new FormData();
      formData.append("image", image[0]["file"]);
      const response = await apiPutRequest(
        API_URL.updateUserProfileImageRequestUrl,
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

  const updateUserInfoHandle = async () => {
    if (!selectLanguage || !selectPassion || !selectEducation) {
      toast.error("please add all the fields");
      return;
    }

    const postData = {
      languages: [selectLanguage],
      passions: [selectPassion],
      education: selectEducation,
    };

    const response = await apiPutRequest(
      API_URL.updateUserProfileInfoRequestUrl,
      postData,
      user.token
    );

    if (response?.success) {
      localStorage.removeItem(userLocalstorage.auth.userProfileInfoData);
      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchProfileInfoData = async () => {
      const response = await apiGetRequest(
        API_URL.userprofilegetRequestUrl,
        user.token
      );
      if (response.success) {
        setUserProfileData(response.data);
        setLocalstorage(userLocalstorage.auth.userProfileInfoData, {
          ...response.data,
        });
        setselectLanguage(response.data.languages[0]);
        setselectEducation(response.data.education);
        setselectPassion(response.data.passions[0]);
      }
    };
    if (userProfileInfoData == null) {
      fetchProfileInfoData();
    } else {
      setUserProfileData(userProfileInfoData);
      setselectLanguage(userProfileInfoData.languages[0]);
      setselectEducation(userProfileInfoData.education);
      setselectPassion(userProfileInfoData.passions[0]);
    }
    const fetchProfilePost = async () => {
      const response = await apiGetRequest(API_URL.profileGetPost, user.token);
      if (response?.success) {
        setProfilePosts(response.data);
      }
    };
    fetchProfilePost();
  }, []);

  const handleLanguageChange = (event) => {
    setselectLanguage(event.target.value);
  };

  const handleEducationChange = (event) => {
    setselectEducation(event.target.value);
  };

  const handlePassionChange = (event) => {
    setselectPassion(event.target.value);
  };

  return (
    <ProfilePageMain>
      <ProfileInfoContainer>
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
            <MyModal
              title={"Update Info"}
              ButtonText={
                <Button
                  style={{ width: "100%", marginTop: "10px" }}
                  variant="contained"
                  color="primary"
                  startIcon={<InfoIcon />}
                >
                  Update Info
                </Button>
              }
              body={
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl
                      style={{
                        width: "100%",
                      }}
                    >
                      <InputLabel id="dropdown-label">Language</InputLabel>
                      <Select
                        labelId="dropdown-label"
                        id="dropdown"
                        value={selectLanguage}
                        onChange={handleLanguageChange}
                      >
                        {languages.map((item) => {
                          return (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                    >
                      <InputLabel id="dropdown-label">degree</InputLabel>
                      <Select
                        labelId="dropdown-label"
                        id="dropdown"
                        value={selectEducation}
                        onChange={handleEducationChange}
                      >
                        {education.map((item) => {
                          return (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                    >
                      <InputLabel id="dropdown-label">passion</InputLabel>
                      <Select
                        labelId="dropdown-label"
                        id="dropdown"
                        value={selectPassion}
                        onChange={handlePassionChange}
                      >
                        {passions.map((item) => {
                          return (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <Button
                      style={{ width: "100%", marginTop: "10px" }}
                      variant="contained"
                      color="primary"
                      onClick={updateUserInfoHandle}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              }
            />
          </div>
        </ProfileDetails>
      </ProfileInfoContainer>
      <AddPost
        firstname={user.firstname}
        lastname={user.firstname}
        profileImage={user.profileImage}
        gender={user.gender}
        jwt={user.token}
      />
      {profilePosts
        ? profilePosts.map((item) => {
            return (
              <div key={item._id}>
                <UserPost
                  firstname={user.firstname}
                  lastname={user.lastname}
                  createdAt={item.createdAt}
                  profileImage={user.profileImage}
                  gender={user.gender}
                  text={item.text || ""}
                  image={item.media.length > 0 ? item.media[0].url : ""}
                />
              </div>
            );
          })
        : ""}
    </ProfilePageMain>
  );
};

export default ProfilePage;
