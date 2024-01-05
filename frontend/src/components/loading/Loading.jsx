import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const Loading = () => {
  return <StyledCircularProgress />;
};

const StyledCircularProgress = styled(CircularProgress)`
  max-width: 1500px;
  margin: 15px auto;
  display: block;
`;

export default Loading;
