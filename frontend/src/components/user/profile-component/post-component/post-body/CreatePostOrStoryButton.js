import React from "react";
import { apiRequest, apiRequestType } from "../../../../../api/user/Api";
import { API_CONTENT_TYPE_LIST, API_URL } from "../../../../../config/config";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const CreatePostOrStoryButton = ({
  file,
  text,
  friendList,
  token,
  buttonText,
  buttonType,
}) => {
  const createPostOrStory = async () => {
    try {
      if (file || text) {
        const formData = new FormData();
        if (file) {
          formData.append("file", file[0].file);
        }
        if (text) {
          formData.append("text", text);
        }
        if (friendList) {
          formData.append("friendList", friendList);
        }

        let api_url;

        if (buttonType == "post") {
          api_url = API_URL.profile.post.add_post;
        } else {
          api_url = API_URL.profile.post.add_story;
        }

        const response = await apiRequest(
          apiRequestType.post,
          true,
          api_url,
          token,
          formData,
          API_CONTENT_TYPE_LIST.application_x_www_form_urlencoded
        );

        if (response?.success) {
          window.location.reload();
        }
      } else {
        toast.error("Please add file or text");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return <Button onClick={createPostOrStory}>{buttonText}</Button>;
};

export default CreatePostOrStoryButton;
