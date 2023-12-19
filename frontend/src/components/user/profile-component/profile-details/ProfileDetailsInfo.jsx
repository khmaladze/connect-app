import { Typography } from "@mui/material";
import React, { Fragment } from "react";

const ProfileDetailsInfo = ({
  userProfileData,
  firstname,
  lastname,
  username,
}) => {
  return (
    <Fragment>
      <Typography variant="h4">{`${firstname} ${lastname}`}</Typography>
      <Typography variant="h5">Username: {username}</Typography>
      {userProfileData && (
        <Fragment>
          <Typography variant="h5">
            Languages: {userProfileData.languages[0]}
          </Typography>
          <Typography variant="h5">Zodiac: {userProfileData.zodiac}</Typography>
          <Typography variant="h5">
            Degree: {userProfileData.education}
          </Typography>
          <Typography variant="h5">
            Passion: {userProfileData.passions[0]}
          </Typography>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProfileDetailsInfo;
