import React from "react";
import ActicityLog from "../../../components/user/settings/ActicityLog";
import UpdatePassword from "../../../components/user/settings/UpdatePassword";

const SettingsPage = ({ user }) => {
  return (
    <div
      style={{
        height: "100%",
        padding: "10px",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "30px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActicityLog user={user} />
      </div>
      <div
        style={{
          marginTop: "30px",
          height: "30px",
          maxWidth: "500px",
          margin: "30px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UpdatePassword user={user} />
      </div>
    </div>
  );
};

export default SettingsPage;
