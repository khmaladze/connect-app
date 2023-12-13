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
import { Avatar } from "@mui/material";
import { toast } from "react-toastify";

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
  const [comments, setComments] = useState([]);
  const [isComment, setIsComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentBool, setCommentBool] = useState(false);

  const toggleComment = () => {
    setIsComment(!isComment);
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
          setCommentBool(true);
          setIsComment(true);
          setCommentText(response.data);
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
          setComments(response.data);
          if (response.data[0]._id) {
            setCommentBool(true);
            setIsComment(true);
            setCommentText(response.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [postId, token, comments]);

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
          isComment={isComment}
          setIsComment={setIsComment}
          commentText={commentText}
          setCommentText={setCommentText}
          commentBool={commentBool}
          setCommentBool={setCommentBool}
          handleCommentSubmit={handleCommentSubmit}
          toggleComment={toggleComment}
        />
        {comments &&
          comments.map((comment) => {
            return (
              <CommentContainerMain key={comment._id} borderColor={list}>
                <Avatar src={profileImage} />
                {/* <UsernameContainer>{username}</UsernameContainer> */}
                <CommentContainer>
                  <Typography variant="p">
                    comment: {comment.comment}
                  </Typography>
                </CommentContainer>
                <span className="material-symbols-outlined">delete</span>
              </CommentContainerMain>
            );
          })}
      </ProfilePostDiv>
    </ProfilePostContainer>
  );
};

export default ProfilePost;
