import React, { useEffect, useState } from "react";
import {
  apiRequest,
  apiRequestType,
  setLocalstorage,
  userLocalstorage,
} from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import { ProfileDetails } from "./ProfileDetailsStyle";
import ProfileDetailsInfo from "./ProfileDetailsInfo";
import UpdateInfo from "./UpdateInfo";

const ProfileDetailsComponent = ({ user }) => {
  const [userProfileData, setUserProfileData] = useState("");
  const userProfileInfoData =
    JSON.parse(
      localStorage.getItem(userLocalstorage.auth.userProfileInfoData)
    ) || null;

  const [selectLanguage, setselectLanguage] = useState(
    userProfileInfoData ? userProfileInfoData.languages[0] : ""
  );
  const [selectEducation, setselectEducation] = useState(
    userProfileInfoData ? userProfileInfoData.education : ""
  );
  const [selectPassion, setselectPassion] = useState(
    userProfileInfoData ? userProfileInfoData.passions[0] : ""
  );

  const handleLanguageChange = (event) => {
    setselectLanguage(event.target.value);
  };

  const handleEducationChange = (event) => {
    setselectEducation(event.target.value);
  };

  const handlePassionChange = (event) => {
    setselectPassion(event.target.value);
  };

  useEffect(() => {
    const fetchProfileInfoData = async () => {
      const response = await apiRequest(
        apiRequestType.get,
        false,
        API_URL.profile.get.user_profile,
        user.token
      );
      if (response?.success) {
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
  }, []);

  return (
    <ProfileDetails>
      <div>
        <ProfileDetailsInfo
          userProfileData={userProfileData}
          firstname={user.firstname}
          lastname={user.lastname}
          username={user.username}
        />
        <UpdateInfo
          selectEducation={selectEducation}
          selectLanguage={selectLanguage}
          selectPassion={selectPassion}
          handleEducationChange={handleEducationChange}
          handleLanguageChange={handleLanguageChange}
          handlePassionChange={handlePassionChange}
          token={user.token}
        />
      </div>
    </ProfileDetails>
  );
};

export default ProfileDetailsComponent;
