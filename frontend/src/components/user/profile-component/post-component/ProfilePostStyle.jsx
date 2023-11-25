import styled from "styled-components";

export const ProfilePostContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const ProfilePostDiv = styled.div`
  max-width: 700px;
  width: 700px;
  border: 3px solid #1eff1e;
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

export const ProfilePostHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const ProfilePostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  border-bottom: 3px solid
    ${(props) =>
      props.borderColor === "Friend"
        ? "#0500ff"
        : props.borderColor === "CloseFriend"
        ? "#1eff1e"
        : "#FF008A"};
  padding: 10px;
`;

export const ProfilePostHeaderDiv = styled.div`
  width: 15px;
`;

export const ProfilePostBodyText = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 170px;
  padding: 10px;
`;

export const ProfilePostBodyImage = styled.div`
  width: 100%;
  height: 100%;
  min-height: 350px;
  max-height: 500px;
  background-size: contain;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
`;

export const ProfilePostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  border-top: 3px solid
    ${(props) =>
      props.borderColor === "Friend"
        ? "#0500ff"
        : props.borderColor === "CloseFriend"
        ? "#1eff1e"
        : "#FF008A"};
  padding: 10px;
  color: ${(props) =>
    props.borderColor === "Friend"
      ? "#0500ff"
      : props.borderColor === "CloseFriend"
      ? "#1eff1e"
      : "#FF008A"};

  div {
    width: 55px;
    display: flex;
    justify-content: space-between;

    svg:hover {
      cursor: pointer;
    }
  }
`;
