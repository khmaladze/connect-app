import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingComponent>
      <CircularProgress />
    </LoadingComponent>
  );
};

const LoadingComponent = styled.div`
  max-width: 1500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

export default Loading;
