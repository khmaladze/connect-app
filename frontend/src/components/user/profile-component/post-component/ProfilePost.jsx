import React from "react";
import { ProfilePostContainer, ProfilePostDiv } from "./ProfilePostStyle";
import ProfilePostHeaderComponent from "./ProfilePostHeader";
import ProfilePostBodyComponent from "./ProfilePostBody";
import ProfilePostFooterComponent from "./ProfilePostFooter";

const ProfilePost = ({
  postId,
  firstname,
  lastname,
  text,
  image,
  profileImage,
  createdAt,
  gender,
  list,
  token,
}) => {
  return (
    <ProfilePostContainer>
      <ProfilePostDiv borderColor={list}>
        <ProfilePostHeaderComponent
          gender={gender}
          profileImage={profileImage}
          firstname={firstname}
          lastname={lastname}
          createdAt={createdAt.slice(0, 10)}
          list={list}
        />
        <ProfilePostBodyComponent
          text={text ? text : ""}
          image={image ? image : ""}
        />
        <ProfilePostFooterComponent list={list} postId={postId} token={token} />
      </ProfilePostDiv>
    </ProfilePostContainer>
  );
};

export default ProfilePost;
