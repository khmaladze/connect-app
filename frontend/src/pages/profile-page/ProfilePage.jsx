import React, { Fragment, useEffect, useState } from "react";
import {
  ProfileDetails,
  ProfileImage,
  ProfileInfoContainer,
  ProfilePageMain,
} from "./ProfilePageStyle";
import {
  apiGetRequest,
  setLocalstorage,
  userLocalstorage,
  userProfileImage,
} from "../../api/Api";
import { API_URL_REQUEST } from "../../config/config";

const ProfilePage = ({ user }) => {
  const [userProfileData, setUserProfileData] = useState("");
  const userProfileInfoData =
    JSON.parse(
      localStorage.getItem(userLocalstorage.auth.userProfileInfoData)
    ) || null;

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
        <ProfileImage
          image={userProfileImage(user.gender, user.profileImage)}
        />
        <ProfileDetails>
          <h2>{user.firstname + " " + user.lastname}</h2>
          <h3>username: {user.username}</h3>
          {userProfileData && (
            <Fragment>
              <h3>languages: {userProfileData?.languages[0]}</h3>
              <h3>zodiac: {userProfileData?.zodiac}</h3>
              <h3>degree: {userProfileData?.education}</h3>
              <h3>passion: {userProfileData?.passions[0]}</h3>
            </Fragment>
          )}
        </ProfileDetails>
      </ProfileInfoContainer>
    </ProfilePageMain>
  );
};

export default ProfilePage;
