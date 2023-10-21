import styled from "styled-components";

export const ProfileImage = styled.div`
  max-height: 250px;
  max-width: 250px;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  border: 10px solid white;
  display: flex;
  justify-content: center;
  align-items: end;
`;
