import React from "react";
import ActicityLog from "../../../components/user/settings/ActicityLog";
import UpdatePassword from "../../../components/user/settings/UpdatePassword";
import { SettingsItem, SettingsMainDiv } from "./SettingsPageStyle";

const SettingsPage = ({ user }) => {
  return (
    <SettingsMainDiv>
      <SettingsItem>
        <ActicityLog user={user} />
      </SettingsItem>
      <SettingsItem>
        <UpdatePassword user={user} />
      </SettingsItem>
    </SettingsMainDiv>
  );
};

export default SettingsPage;
