import React from "react";
import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import { friendListData } from "../../api/user/Api";

const FriendListDropdown = ({ friendList, setFriendList, showHeaderText }) => {
  return (
    <Grid item xs={12}>
      {showHeaderText && <h4>Select Friend List</h4>}
      <FormControl
        style={{
          width: "100%",
          margin: "10px 0",
        }}
      >
        <Select
          labelId="dropdown-label"
          id="dropdown"
          value={friendList}
          onChange={(e) => setFriendList(e.target.value)}
        >
          {friendListData.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default FriendListDropdown;
