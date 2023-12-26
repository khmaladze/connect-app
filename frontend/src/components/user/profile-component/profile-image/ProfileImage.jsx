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
import StorySwitcher from "../../story/StorySwitcher";

const ProfileImageComponent = ({ user }) => {
  const [image, setImage] = useState();
  const [profileStory, setProfileStory] = useState([]);
  const [isStory, setIsStory] = useState("");
  const [updateImageStyle, setUpdateImageStyle] = useState({
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: "5px",
  });

  useEffect(() => {
    const fetchProfileStory = async () => {
      try {
        const response = await apiRequest(
          apiRequestType.get,
          false,
          `${API_URL.profile.get.profile_story}`,
          user.token
        );

        if (response?.success) {
          setProfileStory(response.data);
          if (
            response.data &&
            response.data.length > 0 &&
            (response.data[0].list === "Favorite" ||
              response.data[0].list === "CloseFriend" ||
              response.data[0].list === "Friend")
          ) {
            setIsStory(response.data[0].list);
            setUpdateImageStyle({
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              marginTop: "5px",
            });
          }
        } else {
          console.error("Error fetching profile story:", response?.message);
        }
      } catch (error) {
        console.error("Error fetching profile story:", error);
      }
    };
    fetchProfileStory();
  }, [user.token]);

  return (
    <Fragment>
      <ProfileImage
        image={userProfileImage(user.gender, user.profileImage)}
        isStory={isStory}
      >
        {isStory.length > 0 && (
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
                startIcon={
                  <span className="material-symbols-outlined">preview</span>
                }
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
        )}
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
