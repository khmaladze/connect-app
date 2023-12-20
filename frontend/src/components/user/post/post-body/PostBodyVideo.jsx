import React from "react";

const PostBodyVideo = ({ video }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "0",
        paddingBottom: "56.25%",
      }}
    >
      <video
        controls
        controlsList="nodownload"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default PostBodyVideo;
