import React, { Fragment, useState } from "react";
import { ProfilePostFooter } from "./ProfilePostStyle";
import ProfilePostFooterLike from "./ProfilePostFooterLike";
import ProfilePostFooterComment from "./ProfilePostFooterComment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { apiRequest, apiRequestType } from "../../../../api/user/Api";
import { API_CONTENT_TYPE_LIST, API_URL } from "../../../../config/config";

const ProfilePostFooterComponent = ({ list, postId, token }) => {
  const [isComment, setIsComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comment, setComment] = useState(false);

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
          // window.location.reload();
          setComment(true);
        }
      } else {
        toast.error("Please add text");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Fragment>
      <ProfilePostFooter borderColor={list}>
        <div>
          {/* Profile post footer like component */}
          <ProfilePostFooterLike token={token} postId={postId} />

          {/* Profile post footer comment component */}
          <ProfilePostFooterComment
            isComment={isComment}
            commentText={commentText}
            setCommentText={setCommentText}
            handleCommentSubmit={handleCommentSubmit}
            toggleComment={toggleComment}
          />
        </div>
      </ProfilePostFooter>
      {isComment && !comment && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "75px",
            width: "100%",
            padding: "10px",
          }}
        >
          <TextField
            style={{
              width: "70%",
              height: "37px",
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
      )}
    </Fragment>
  );
};

export default ProfilePostFooterComponent;
