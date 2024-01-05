import React, { memo } from "react";
import MyModal from "../modal/MyModal";
import StorySwitcher from "../story/StorySwitcher";
import { userProfileImage } from "../../../api/user/Api";

const MainStoryDiv = ({ data, user }) => {
  return (
    <div
      style={{
        height: "75px",
        width: "75px",
        background: "white",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
        border: `1px solid ${
          data.list === "Friend"
            ? "#0500ff"
            : data.list === "CloseFriend"
            ? "#1eff1e"
            : "#FF008A"
        }`,
        marginRight: "15px",
      }}
    >
      <MyModal
        title="View Story"
        modalWidth="800px"
        ButtonText={
          <div
            style={{
              height: "65px",
              width: "65px",
              borderRadius: "50%",
              backgroundImage: `url(${userProfileImage(
                data.user.gender,
                data.user.profileImage
              )})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        }
        body={
          <StorySwitcher data={data} token={user.token} gender={user.gender} />
        }
      />
    </div>
  );
};

export default memo(MainStoryDiv);
