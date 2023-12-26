import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import StoryComponent from "./StoryComponent";
import { apiRequest, apiRequestType } from "../../../api/user/Api";
import { API_CONTENT_TYPE_LIST, API_URL } from "../../../config/config";
import { toast } from "react-toastify";

const StorySwitcher = ({ data, token, gender }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  let newData =
    window.location.pathname == "/profile" ? data[currentStoryIndex] : data;
  const [commentsData, setCommentsData] = useState([]);
  const [isOpenCommentField, setIsOpenCommentField] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommentDataFetched, setIsCommentDataFetched] = useState(false);
  const [userAlreadyComment, setIsUserAlreadyComment] = useState([]);
  const [fetchCurrentId, setFetchCurrentId] = useState(newData._id);

  const switchToNextStory = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex < data.length - 1 ? prevIndex + 1 : 0
    );
    setIsOpenCommentField(false);
  };

  const switchToPrevStory = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : data.length - 1
    );
    setIsOpenCommentField(false);
  };

  const toggleComment = () => {
    setIsOpenCommentField((prevIsOpenCommentField) => !prevIsOpenCommentField);
  };

  const handleCommentSubmit = async () => {
    try {
      if (commentText) {
        const response = await apiRequest(
          apiRequestType.post,
          false,
          API_URL.story.post.add_comment,
          token,
          {
            comment: String(commentText),
            story_id: String(newData._id),
          },
          API_CONTENT_TYPE_LIST.application_json
        );

        if (response?.success) {
          setIsCommentDataFetched(false);
          setIsOpenCommentField(false);
          setIsUserAlreadyComment((prevArr) => [...prevArr, newData._id]);
          setCommentText("");
        }
      } else {
        toast.error("Please add text");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiRequest(
          apiRequestType.get,
          false,
          `${API_URL.story.get.get_comment}?story_id=${newData._id}`,
          token
        );
        if (response?.success) {
          setCommentsData(response.data);
          if (response.data && response.data[0] && response.data[0]._id) {
            setIsOpenCommentField(false);
            setIsUserAlreadyComment((prevArr) => [...prevArr, newData._id]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isCommentDataFetched === false) {
      fetchComments();
      setIsCommentDataFetched(true);
    }
  }, [data, token, commentsData, isCommentDataFetched, currentStoryIndex]);

  useEffect(() => {
    if (window.location.pathname == "/profile") {
      setFetchCurrentId(newData._id);
      setIsCommentDataFetched(false);
    }
  }, [currentStoryIndex]);

  const deleteUserPostCommenthandle = async (storyId, token) => {
    try {
      const response = await apiRequest(
        apiRequestType.post,
        true,
        `${API_URL.story.post.delete_story_comment + "/" + storyId}`,
        token
      );
      if (response?.success) {
        setIsOpenCommentField(false);
        setIsUserAlreadyComment((prevArr) =>
          prevArr.filter((id) => id !== newData._id)
        );
        setCommentText("");
        setCommentsData(false);
        setIsCommentDataFetched(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const itemStyle = {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    textAlign: "center",
    maxWidth: "330px",
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <div>
          <StoryComponent
            currentStoryIndex={currentStoryIndex}
            data={newData}
            token={token}
            gender={gender}
            storyId={newData._id}
            userAlreadyComment={userAlreadyComment}
            toggleComment={toggleComment}
            deleteUserPostCommenthandle={deleteUserPostCommenthandle}
            commentsData={commentsData}
            isOpenCommentField={isOpenCommentField}
            commentText={commentText}
            handleCommentSubmit={handleCommentSubmit}
            setCommentText={setCommentText}
          />
          {isOpenCommentField && (
            <div style={itemStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "75px",
                  width: "100%",
                  padding: "10px",
                  maxWidth: "330px",
                }}
              >
                <TextField
                  style={{
                    width: "70%",
                    height: "37px",
                    maxWidth: "500px",
                  }}
                  fullWidth
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                />
                <Button
                  style={{
                    height: "50px",
                  }}
                  onClick={handleCommentSubmit}
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </Grid>
      {window.location.pathname == "/profile" && newData.length > 1 && (
        <Grid item container justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={switchToPrevStory}
          >
            Previous Story
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={switchToNextStory}
          >
            Next Story
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default StorySwitcher;
