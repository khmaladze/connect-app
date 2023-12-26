import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AddPostContainer, AddPostDiv } from "./ProfileAddPostStyle";
import AddPostFooterComponent from "./post-footer/AddPostFooterComponent";
import AddPostHeaderComponent from "./post-header/AddPostHeaderComponent";
import AddPostBodyComponent from "./post-body/AddPostBodyComponent";

const ProfileAddPostComponent = ({ user }) => {
  const dateNow = new Date(Date.now());
  const postCreateDate = dateNow.toISOString().slice(0, 10);
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [friendList, setFriendList] = useState("Friend");

  return (
    <AddPostContainer>
      <AddPostDiv
        borderColor={friendList}
        style={{ width: "100%", maxWidth: "700px" }}
      >
        <AddPostHeaderComponent
          borderColor={friendList}
          gender={user.gender}
          profileImage={user.profileImage}
          firstname={user.firstname}
          lastname={user.lastname}
          postCreateDate={postCreateDate}
        />
        <AddPostBodyComponent
          friendList={friendList}
          text={text}
          setText={setText}
          file={file}
          setFile={setFile}
          setFriendList={setFriendList}
        />
        <AddPostFooterComponent
          borderColor={friendList}
          friendList={friendList}
          token={user.token}
          file={file}
          text={text}
        />
      </AddPostDiv>
    </AddPostContainer>
  );
};

export default ProfileAddPostComponent;
