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
  border: 5px solid
    ${(props) =>
      props.isStory === "Friend"
        ? "#0500ff"
        : props.isStory === "CloseFriend"
        ? "#1eff1e"
        : props.isStory === "Favorite"
        ? "#FF008A"
        : "white"};
  display: flex;
  justify-content: center;
  align-items: end;
  cursor: ${(props) =>
    props.isStory === "Friend" ||
    props.isStory === "CloseFriend" ||
    props.isStory === "Favorite"
      ? "pointer"
      : "default"};
`;
