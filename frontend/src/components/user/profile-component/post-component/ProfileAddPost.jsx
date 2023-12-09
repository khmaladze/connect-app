import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Avatar, FormControl, MenuItem, Select } from "@mui/material";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {
  apiRequest,
  apiRequestType,
  userProfileImage,
} from "../../../../api/user/Api";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_CONTENT_TYPE_LIST, API_URL } from "../../../../config/config";
import {
  AddPostContainer,
  AddPostDiv,
  AddPostFooter,
  AddPostHeader,
  AddPostHeaderContainer,
  AddPostHeaderDiv,
  AddPostImageBody,
  AddPostTextBody,
  CustomTextarea,
} from "./ProfileAddPostStyle";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ProfileAddPostComponent = ({ user }) => {
  const dateNow = new Date(Date.now());
  const postCreateDate = dateNow.toISOString().slice(0, 10);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [friendList, setFriendList] = useState("Friend");

  const friendListData = ["Friend", "CloseFriend", "Favorite"];

  const createPost = async () => {
    try {
      if (image || text) {
        const formData = new FormData();
        if (image) {
          formData.append("image", image[0].file);
        }
        if (text) {
          formData.append("text", text);
        }
        if (friendList) {
          formData.append("friendList", friendList);
        }

        const response = await apiRequest(
          apiRequestType.post,
          true,
          API_URL.profile.post.add_post,
          user.token,
          formData,
          API_CONTENT_TYPE_LIST.application_x_www_form_urlencoded
        );

        if (response?.success) {
          window.location.reload();
        }
      } else {
        toast.error("Please add image or text");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <AddPostContainer>
      <AddPostDiv borderColor={friendList}>
        <AddPostHeader borderColor={friendList}>
          <AddPostHeaderContainer>
            <Avatar
              style={{ height: "55px", width: "55px" }}
              alt="user"
              src={userProfileImage(user.gender, user.profileImage)}
            />
            <AddPostHeaderDiv />
            <h3>{`${user.firstname} ${user.lastname}`}</h3>
          </AddPostHeaderContainer>
          <h3>{postCreateDate}</h3>
        </AddPostHeader>
        <AddPostTextBody>
          <Typography gutterBottom variant="h5" component="div">
            <Grid item xs={12}>
              <CustomTextarea
                placeholder="Add Text"
                borderColor={friendList}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Grid>
          </Typography>
        </AddPostTextBody>
        <AddPostImageBody>
          <Grid item xs={12}>
            <h4>Upload Image</h4>
            <FilePond
              files={image}
              allowMultiple={false}
              maxFiles={1}
              onupdatefiles={setImage}
              allowFileSizeValidation={true}
              maxFileSize={"5MB"}
              acceptedFileTypes={["image/*"]}
              name="files"
              labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
            />
          </Grid>
        </AddPostImageBody>
        <AddPostImageBody>
          <Grid item xs={12}>
            <h4>Select Friend List</h4>
            <FormControl
              style={{
                width: "100%",
                marginTop: "10px",
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
        </AddPostImageBody>
        <AddPostFooter borderColor={friendList}>
          <div>
            <FavoriteBorderIcon />
            <ChatBubbleOutlineIcon />
          </div>
          <div>
            <Button onClick={createPost}>Create Post</Button>
          </div>
        </AddPostFooter>
      </AddPostDiv>
    </AddPostContainer>
  );
};

export default ProfileAddPostComponent;
