import React, { Fragment } from "react";
import StoryFooterComponent from "./StoryFooterComponent";

const StoryComponent = ({
  data,
  token,
  gender,
  storyId,
  userAlreadyComment,
  toggleComment,
  deleteUserPostCommenthandle,
  commentsData,
}) => {
  const storyStyle = {
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const itemStyle = {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    minWidth: "370px",
    textAlign: "center",
  };

  const footerStyle = {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    textAlign: "center",
  };

  return (
    <div style={storyStyle}>
      <Fragment key={storyId}>
        {data.text && <div style={itemStyle}>{data.text}</div>}
        {data.media && data.media[0] && data.media[0].url && (
          <img
            style={{
              height: "100%",
              width: "100%",
              maxHeight: "500px",
            }}
            src={data.media[0].url}
            alt={`story-${storyId}`}
          />
        )}
        <div style={footerStyle}>
          <StoryFooterComponent
            token={token}
            borderColor={data.list}
            storyId={storyId}
            userAlreadyComment={userAlreadyComment}
            toggleComment={toggleComment}
            deleteUserPostCommenthandle={deleteUserPostCommenthandle}
            commentsData={commentsData}
            list={data.list}
            gender={gender}
          />
        </div>
      </Fragment>
    </div>
  );
};

export default StoryComponent;
