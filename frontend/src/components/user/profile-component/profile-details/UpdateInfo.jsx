import React from "react";
import MyModal from "../../modal/MyModal";
import { Button, Grid } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import LanguageDropdown from "./LanguageDropdown";
import EducationDropdown from "./EducationDropdown";
import PassionDropdown from "./PassionDropdown";
import ButtonUpdateUserInfo from "./ButtonUpdateUserInfo";

const UpdateInfo = ({
  selectEducation,
  selectLanguage,
  selectPassion,
  handleEducationChange,
  handleLanguageChange,
  handlePassionChange,
  token,
}) => {
  return (
    <MyModal
      title="Update Info"
      modalWidth="500px"
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
            <LanguageDropdown
              selectLanguage={selectLanguage}
              handleLanguageChange={handleLanguageChange}
            />
            <EducationDropdown
              selectEducation={selectEducation}
              handleEducationChange={handleEducationChange}
            />
            <PassionDropdown
              selectPassion={selectPassion}
              handlePassionChange={handlePassionChange}
            />
            <ButtonUpdateUserInfo
              selectLanguage={selectLanguage}
              selectEducation={selectEducation}
              selectPassion={selectPassion}
              token={token}
            />
          </Grid>
        </Grid>
      }
    />
  );
};

export default UpdateInfo;
