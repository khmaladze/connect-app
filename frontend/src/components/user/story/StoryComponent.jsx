import React, { Fragment } from "react";
import StoryFooterComponent from "./StoryFooterComponent";
import DeleteStoryHeader from "./DeleteStoryHeader";
import { PostBodyImage } from "../post/PostStyle";
import StoryVideo from "./StoryVideo";

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
    maxWidth: "400px",
  };

  const itemStyle = {
    marginTop: "10px",
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "330px",
    maxWidth: "100%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const footerStyle = {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    textAlign: "center",
    maxWidth: "330px",
  };

  const mediaType =
    data.media[0] &&
    data.media[0].url.slice(
      data.media[0].url.length - 3,
      data.media[0].url.length
    );

  return (
    <div style={storyStyle}>
      <Fragment key={storyId}>
        {window.location.pathname == "/profile" && (
          <DeleteStoryHeader storyId={storyId} token={token} />
        )}
        {data.text && <div style={itemStyle}>{data.text}</div>}
        {data &&
        data.media &&
        data.media[0] &&
        data.media[0].url &&
        mediaType !== "mp4" ? (
          <PostBodyImage image={data.media[0].url}></PostBodyImage>
        ) : (
          data.media.length > 0 &&
          data.media[0].url && <StoryVideo video={data.media[0].url} />
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
