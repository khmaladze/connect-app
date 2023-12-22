import React from "react";

const StoryVideo = ({ video }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "410px",
        paddingBottom: "56.25%",
      }}
    >
      <video
        controls
        controlsList="nodownload"
        style={{
          top: "0",
          left: "0",
          minHeight: "400px",
          maxWidth: "400px",
          minWidth: "200px",
          width: "100%",
          height: "100%",
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default StoryVideo;
