import React, { Fragment, useEffect, useState } from "react";
import {
  apiRequest,
  apiRequestType,
  userProfileImage,
} from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import "filepond/dist/filepond.min.css";
import { ProfileImage } from "./ProfileImageStyle";
import UpdateProfileImageModal from "./UpdateProfileImageModal";
import ViewStoryModal from "./ViewStoryModal";

const ProfileImageComponent = ({ user, data }) => {
  let userImage = data ? data[0].user.profileImage : user.profileImage;
  let userGender = data ? data[0].user.gender : user.gender;

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
    if (window.location.pathname == "/profile") fetchProfileStory();
  }, [user.token]);

  return (
    <Fragment>
      <ProfileImage
        image={userProfileImage(userGender, userImage)}
        isStory={isStory}
      >
        {window.location.pathname.startsWith("/userprofile") == false &&
          isStory.length > 0 && (
            <ViewStoryModal user={user} profileStory={profileStory} />
          )}
        {window.location.pathname.startsWith("/userprofile") == false && (
          <UpdateProfileImageModal
            image={image}
            setImage={setImage}
            user={user}
            updateImageStyle={updateImageStyle}
          />
        )}
      </ProfileImage>
    </Fragment>
  );
};

export default ProfileImageComponent;
