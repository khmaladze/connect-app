import React, { useEffect, useState } from "react";
import {
  CommentContainer,
  CommentContainerMain,
  ProfilePostContainer,
  ProfilePostDiv,
  // UsernameContainer,
} from "./ProfilePostStyle";
import ProfilePostHeaderComponent from "./ProfilePostHeader";
import ProfilePostBodyComponent from "./ProfilePostBody";
import ProfilePostFooterComponent from "./ProfilePostFooter";
import Typography from "@mui/material/Typography";
import { apiRequest, apiRequestType } from "../../../../api/user/Api";
import { API_CONTENT_TYPE_LIST, API_URL } from "../../../../config/config";
import { Avatar, Button, Grid } from "@mui/material";
import { toast } from "react-toastify";
import MyModal from "../../modal/MyModal";

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
  profilePosts,
  setProfilePosts,
}) => {
  const [commentsData, setCommentsData] = useState([]);
  const [isOpenCommentField, setIsOpenCommentField] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommentDataFetched, setIsCommentDataFetched] = useState(false);
  const [userAlreadyComment, setIsUserAlreadyComment] = useState(false);

  const toggleComment = () => {
    if (userAlreadyComment === false) {
      setIsOpenCommentField(!isOpenCommentField);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      if (commentText) {
        const response = await apiRequest(
          apiRequestType.post,
          false,
          API_URL.profile.post.add_comment,
          token,
          { comment: String(commentText), post_id: String(postId) },
          API_CONTENT_TYPE_LIST.application_json
        );

        if (response?.success) {
          setIsCommentDataFetched(false);
          setIsOpenCommentField(false);
          setIsUserAlreadyComment(true);
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
          `${API_URL.profile.get.get_comment}?post_id=${postId}`,
          token
        );
        if (response?.success) {
          setCommentsData(response.data);
          if (response.data && response.data[0] && response.data[0]._id) {
            setIsOpenCommentField(false);
            setIsUserAlreadyComment(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isCommentDataFetched === false) {
      setTimeout(() => {
        fetchComments();
      }, 1500);
      setIsCommentDataFetched(true);
    }
  }, [postId, token, commentsData, isCommentDataFetched]);

  const deleteUserPostCommenthandle = async (postId, token) => {
    try {
      const response = await apiRequest(
        apiRequestType.post,
        true,
        API_URL.profile.post.delete_post_comment + postId,
        token
      );
      if (response?.success) {
        setIsOpenCommentField(false);
        setIsUserAlreadyComment(false);
        setCommentText("");
        setCommentsData(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfilePostContainer>
      <ProfilePostDiv borderColor={list}>
        {/* Profile post header */}
        <ProfilePostHeaderComponent
          gender={gender}
          profileImage={profileImage}
          firstname={firstname}
          lastname={lastname}
          createdAt={createdAt.slice(0, 10)}
          list={list}
          postId={postId}
          token={token}
          profilePosts={profilePosts}
          setProfilePosts={setProfilePosts}
        />

        {/* Profile post body */}
        <ProfilePostBodyComponent
          text={text ? text : ""}
          image={image ? image : ""}
        />

        {/* Profile post footer */}
        <ProfilePostFooterComponent
          list={list}
          postId={postId}
          token={token}
          isOpenCommentField={isOpenCommentField}
          setIsOpenCommentField={setIsOpenCommentField}
          commentText={commentText}
          setCommentText={setCommentText}
          isCommentDataFetched={isCommentDataFetched}
          setIsCommentDataFetched={setIsCommentDataFetched}
          userAlreadyComment={userAlreadyComment}
          handleCommentSubmit={handleCommentSubmit}
          toggleComment={toggleComment}
        />
        {commentsData &&
          commentsData.map((comment) => {
            return (
              <CommentContainerMain key={comment._id} borderColor={list}>
                <Avatar src={profileImage} />
                {/* <UsernameContainer>{username}</UsernameContainer> */}
                <CommentContainer>
                  <Typography variant="p">
                    comment: {comment.comment}
                  </Typography>
                </CommentContainer>
                <MyModal
                  title="Delete Post Comment"
                  ButtonText={
                    <span className="material-symbols-outlined">delete</span>
                  }
                  body={
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <p>when click delete it will be deleted</p>
                        <Button
                          style={{
                            width: "100%",
                            marginTop: "10px",
                            color: "red",
                            borderColor: "red",
                          }}
                          variant="outlined"
                          onClick={async () => {
                            await deleteUserPostCommenthandle(postId, token);
                          }}
                        >
                          Delete Post Comment
                        </Button>
                      </Grid>
                    </Grid>
                  }
                />
              </CommentContainerMain>
            );
          })}
      </ProfilePostDiv>
    </ProfilePostContainer>
  );
};

export default ProfilePost;
