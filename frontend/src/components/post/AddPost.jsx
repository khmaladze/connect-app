import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Avatar } from "@mui/material";
import { apiPostRequest, userProfileImage } from "../../api/Api";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
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
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_CONTENT_TYPE, API_URL } from "../../config/config";

// Register the plugins
registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);
const AddPost = ({ gender, profileImage, firstname, lastname, jwt }) => {
  const dateNow = new Date(Date.now());
  const postCreateDate = dateNow.toISOString().slice(0, 10);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

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
        jwt,
        API_CONTENT_TYPE.update_user_profile_image
      );

      if (response.success) {
        window.location.reload();
      }
    } else {
      toast.error("please add image or text");
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            width: "700px",
            minHeight: "350px",
            border: "3px solid #1eff1e",
            background: "white",
            borderRadius: "15px",
            transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            boxShadow:
              " 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "70px",
              width: "100%",
              borderBottom: " 3px solid #1eff1e",
              padding: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: "170px",
              }}
            >
              <Avatar
                style={{ height: "55px", width: "55px" }}
                alt="user"
                src={userProfileImage(gender, profileImage)}
              />
              <h3>{firstname + " " + lastname}</h3>
            </div>
            <h3>{postCreateDate}</h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              <Grid item xs={12}>
                <TextField
                  style={{ minWidth: "670px" }}
                  fullWidth
                  id="Text"
                  label="Text"
                  name="Text"
                  autoComplete="Text"
                  multiline
                  rows={4} // Set the number of rows you want
                  variant="outlined"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Grid>
            </Typography>
          </div>
          <div
            style={{
              width: "95%",
              margin: "0 auto",
            }}
          >
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
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "50px",
              width: "100%",
              borderTop: "3px solid #1eff1e",
              padding: "10px",
            }}
          >
            <div>
              <FavoriteBorderIcon />
              <AddCommentIcon />
            </div>
            <div>
              <Button onClick={createPost}>Create Post</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
