import React, { Fragment, useEffect, useState } from "react";
import { apiRequest, apiRequestType } from "../../../api/user/Api";
import { API_URL } from "../../../config/config";
import { useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import {
  ProfileInfoContainer,
  ProfilePageMain,
} from "../profile-page/ProfilePageStyle";
import ProfileImageComponent from "../../../components/user/profile-component/profile-image/ProfileImage";
import ProfileDetailsComponent from "../../../components/user/profile-component/profile-details/ProfileDetails";
import ProfilePostComponent from "../../../components/user/profile-component/post-component/ProfilePostComponent";

const UserProfile = ({ user }) => {
  const { profileId } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRequest(
        apiRequestType.get,
        false,
        API_URL.userprofile.get.userprofile + profileId,
        user.token
      );
      if (response?.success) {
        setData([response.data]);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      {data.length > 0 ? (
        <ProfilePageMain>
          <ProfileInfoContainer>
            <ProfileImageComponent user={user} data={data} />
            <ProfileDetailsComponent user={user} data={data} />
          </ProfileInfoContainer>
          <ProfilePostComponent user={user} data={data} />
        </ProfilePageMain>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      )}
    </Fragment>
  );
};

export default UserProfile;
