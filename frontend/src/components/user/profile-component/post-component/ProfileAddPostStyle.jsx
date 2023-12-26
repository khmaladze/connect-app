import styled from "styled-components";

export const AddPostContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const AddPostDiv = styled.div`
  max-width: 700px;
  width: 100%;
  border: 3px solid
    ${(props) =>
      props.borderColor === "Friend"
        ? "#0500ff"
        : props.borderColor === "CloseFriend"
        ? "#1eff1e"
        : "#FF008A"};
  background: white;
  border-radius: 15px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

export const AddPostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  /* border-bottom: 3px solid
    ${(props) =>
    props.borderColor === "Friend"
      ? "#0500ff"
      : props.borderColor === "CloseFriend"
      ? "#1eff1e"
      : "#FF008A"}; */
  padding: 10px;
`;

export const AddPostHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const AddPostHeaderDiv = styled.div`
  width: 15px;
`;

export const AddPostTextBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const AddPostImageBody = styled.div`
  width: 95%;
  margin: 0 auto;
`;

export const AddPostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  /* border-top: 3px solid
    ${(props) =>
    props.borderColor === "Friend"
      ? "#0500ff"
      : props.borderColor === "CloseFriend"
      ? "#1eff1e"
      : "#FF008A"}; */
  padding: 10px;
  color: ${(props) =>
    props.borderColor === "Friend"
      ? "#0500ff"
      : props.borderColor === "CloseFriend"
      ? "#1eff1e"
      : "#FF008A"};

  button {
    color: ${(props) =>
      props.borderColor === "Friend"
        ? "#0500ff"
        : props.borderColor === "CloseFriend"
        ? "#1eff1e"
        : "#FF008A"};
  }

  div:nth-child(1) {
    width: 55px;
    display: flex;
    justify-content: space-between;

    svg:hover {
      cursor: pointer;
    }
  }
`;

export const CustomTextarea = styled.textarea`
  width: 100%;
  max-width: 670px;
  min-height: 100px;
  max-height: 300px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid
    ${(props) =>
      props.borderColor === "Friend"
        ? "#0500ff"
        : props.borderColor === "CloseFriend"
        ? "#1eff1e"
        : "#FF008A"};
  border-radius: 5px;
  outline: none;

  &:hover {
    border-color: ${(props) =>
      props.borderColor === "Friend"
        ? "#0500ff"
        : props.borderColor === "CloseFriend"
        ? "#1eff1e"
        : "#FF008A"};
  }

  &:focus {
    border-color: ${(props) =>
      props.borderColor === "Friend"
        ? "#0500ff"
        : props.borderColor === "CloseFriend"
        ? "#1eff1e"
        : "#FF008A"};
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;
