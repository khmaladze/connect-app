import React, { useEffect, useState, useCallback } from "react";
import { PostContainer, PostDiv } from "./PostStyle";
import { apiRequest, apiRequestType } from "../../../api/user/Api";
import { API_CONTENT_TYPE_LIST, API_URL } from "../../../config/config";
import { toast } from "react-toastify";
import PostHeaderComponent from "./post-header/PostHeader";
import ProfilePostBodyComponent from "./post-body/PostBody";
import PostFooterComponent from "./post-footer/PostFooter";
import PostCommentComponent from "./post-footer/comment/PostCommentComponent";

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

const ProfilePost = React.memo(
  ({
    postId,
    firstname,
    lastname,
    text,
    media,
    profileImage,
    createdAt,
    gender,
    list,
    token,
    profilePosts,
    setProfilePosts,
    postedUserId,
  }) => {
    const [commentsData, setCommentsData] = useState([]);
    const [isOpenCommentField, setIsOpenCommentField] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [isCommentDataFetched, setIsCommentDataFetched] = useState(false);
    const [userAlreadyComment, setIsUserAlreadyComment] = useState(false);

    const toggleComment = useCallback(() => {
      if (!userAlreadyComment) {
        setIsOpenCommentField(!isOpenCommentField);
      }
    }, [userAlreadyComment, isOpenCommentField]);

    const handleCommentSubmit = useCallback(async () => {
      try {
        if (commentText) {
          const response = await apiRequest(
            apiRequestType.post,
            false,
            API_URL.post.post.add_comment,
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
    }, [commentText, postId, token]);

    const fetchComments = useCallback(async () => {
      try {
        const response = await apiRequest(
          apiRequestType.get,
          false,
          `${API_URL.post.get.get_comment}?post_id=${postId}`,
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
    }, [postId, token]);

    const fetchCommentsDebounced = useCallback(debounce(fetchComments, 1000), [
      fetchComments,
    ]);

    useEffect(() => {
      if (isCommentDataFetched === false) {
        fetchCommentsDebounced();
        setIsCommentDataFetched(true);
      }
    }, [
      postId,
      token,
      commentsData,
      isCommentDataFetched,
      fetchCommentsDebounced,
    ]);

    const deleteUserPostCommenthandle = useCallback(async () => {
      try {
        const response = await apiRequest(
          apiRequestType.post,
          true,
          `${API_URL.post.post.delete_post_comment + "/" + postId}`,
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
    }, [postId, token]);

    return (
      <PostContainer>
        <PostDiv borderColor={list}>
          {/* Profile post header */}
          <PostHeaderComponent
            gender={gender}
            postedUserId={postedUserId}
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
            media={media ? media : ""}
          />

          {/* Profile post footer */}
          <PostFooterComponent
            list={list}
            postId={postId}
            token={token}
            gender={gender}
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
            commentsData.map((comment) => (
              <PostCommentComponent
                key={comment._id}
                comment={comment}
                list={list}
                postId={postId}
                token={token}
                gender={comment.gender}
                profileImage={comment.author_profileImage}
                deleteUserPostCommenthandle={deleteUserPostCommenthandle}
              />
            ))}
        </PostDiv>
      </PostContainer>
    );
  }
);

export default ProfilePost;
