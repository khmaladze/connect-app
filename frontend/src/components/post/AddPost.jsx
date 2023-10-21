import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Avatar } from "@mui/material";
import { apiPostRequest, userProfileImage } from "../../api/Api";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Import the plugin code
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// Import the plugin code
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_CONTENT_TYPE_LIST, API_URL } from "../../config/config";
import {
  AddPostContainer,
  AddPostDiv,
  AddPostFooter,
  AddPostHeader,
  AddPostHeaderContainer,
  AddPostHeaderDiv,
  AddPostImageBody,
  AddPostTextBody,
} from "./AddPostStyle";

// Register the plugins
registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);
const AddPost = ({ user }) => {
  const dateNow = new Date(Date.now());
  const postCreateDate = dateNow.toISOString().slice(0, 10);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [borderColor, setBorderColor] = useState("friend");

  const createPost = async () => {
    if (image || text) {
      const formData = new FormData();
      if (image) {
        formData.append("image", image[0]["file"]);
      }
      if (text) {
        formData.append("text", text);
      }

      const response = await apiPostRequest(
        API_URL.addpost,
        formData,
        user.token,
        API_CONTENT_TYPE_LIST.application_x_www_form_urlencoded
      );

      if (response.success) {
        window.location.reload();
      }
    } else {
      toast.error("please add image or text");
    }
  };

  return (
    <AddPostContainer>
      <AddPostDiv borderColor={borderColor}>
        <AddPostHeader borderColor={borderColor}>
          <AddPostHeaderContainer>
            <Avatar
              style={{ height: "55px", width: "55px" }}
              alt="user"
              src={userProfileImage(user.gender, user.profileImage)}
            />
            <AddPostHeaderDiv />
            <h3>{user.firstname + " " + user.lastname}</h3>
          </AddPostHeaderContainer>
          <h3>{postCreateDate}</h3>
        </AddPostHeader>
        <AddPostTextBody>
          <Typography gutterBottom variant="h5" component="div">
            <Grid item xs={12}>
              <TextField
                style={{ maxWidth: "670px", width: "670px" }}
                fullWidth
                id="Text"
                label="Text"
                name="Text"
                autoComplete="Text"
                multiline
                rows={3}
                variant="outlined"
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
        <AddPostFooter borderColor={borderColor}>
          <div>
            <FavoriteBorderIcon />
            <AddCommentIcon />
          </div>
          <div>
            <Button onClick={createPost}>Create Post</Button>
          </div>
        </AddPostFooter>
      </AddPostDiv>
    </AddPostContainer>
  );
};

export default AddPost;
