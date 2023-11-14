import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        maxWidth: "1500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15px",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;
