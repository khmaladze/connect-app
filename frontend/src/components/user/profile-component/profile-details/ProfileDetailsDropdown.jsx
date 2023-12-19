import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ProfileDetailsDropdown = ({
  InputLabelText,
  selectId,
  data,
  selectValue,
  onChangeFunction,
}) => {
  return (
    <FormControl style={{ width: "100%", marginTop: "10px" }}>
      <InputLabel id={selectId + "education-label"}>
        {InputLabelText}
      </InputLabel>
      <Select
        labelId={selectId + "-label"}
        id={selectId}
        value={selectValue}
        onChange={onChangeFunction}
      >
        {data.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProfileDetailsDropdown;
