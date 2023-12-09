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
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { ProfileDetails } from "./ProfileDetailsStyle";
import InfoIcon from "@mui/icons-material/Info";
import { education, languages, passions } from "../../../../data/userInfoData";

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
      toast.error("Please fill in all the fields");
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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
        <Typography variant="h4">
          {user.firstname + " " + user.lastname}
        </Typography>
        <Typography variant="h5">Username: {user.username}</Typography>
        {userProfileData && (
          <Fragment>
            <Typography variant="h5">
              Languages: {userProfileData?.languages[0]}
            </Typography>
            <Typography variant="h5">
              Zodiac: {userProfileData?.zodiac}
            </Typography>
            <Typography variant="h5">
              Degree: {userProfileData?.education}
            </Typography>
            <Typography variant="h5">
              Passion: {userProfileData?.passions[0]}
            </Typography>
          </Fragment>
        )}
        <MyModal
          title="Update Info"
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
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="language-label">Language</InputLabel>
                  <Select
                    labelId="language-label"
                    id="language"
                    value={selectLanguage}
                    onChange={handleLanguageChange}
                  >
                    {languages.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl style={{ width: "100%", marginTop: "10px" }}>
                  <InputLabel id="education-label">Degree</InputLabel>
                  <Select
                    labelId="education-label"
                    id="education"
                    value={selectEducation}
                    onChange={handleEducationChange}
                  >
                    {education.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl style={{ width: "100%", marginTop: "10px" }}>
                  <InputLabel id="passion-label">Passion</InputLabel>
                  <Select
                    labelId="passion-label"
                    id="passion"
                    value={selectPassion}
                    onChange={handlePassionChange}
                  >
                    {passions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
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
