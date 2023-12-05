import React, { Fragment, useEffect, useState } from "react";
import {
  apiRequest,
  apiRequestType,
  setLocalstorage,
  userLocalstorage,
} from "../../../../api/user/Api";
import { API_URL } from "../../../../config/config";
import Button from "@mui/material/Button";
import MyModal from "../../modal/MyModal";
import { Grid } from "@mui/material";
// import InfoIcon from "@mui/icons-material/Info";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { education, languages, passions } from "../../../../data/userInfoData";
import { toast } from "react-toastify";
import { ProfileDetails } from "./ProfileDetailsStyle";

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

    const response = await apiRequest(
      apiRequestType.put,
      true,
      API_URL.profile.put.updateUserProfileInfo,
      user.token,
      postData
    );

    if (response?.success) {
      localStorage.removeItem(userLocalstorage.auth.userProfileInfoData);
      window.location.reload();
    }
  };

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
              startIcon={
                // <InfoIcon />
                <span className="material-symbols-outlined">info</span>
              }
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
  );
};

export default ProfileDetailsComponent;
