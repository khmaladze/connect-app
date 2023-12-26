import styled from "styled-components";

export const ProfilePageMain = styled.div`
  height: auto;
  width: 70%;
  margin: 0 auto;

  @media screen and (max-width: 750px) {
    width: 100%;
  }
`;

export const ProfileInfoContainer = styled.div`
  height: 385px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;

  @media screen and (max-width: 750px) {
    width: 97%;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    height: 570px;
    max-width: 360px;
  }

  @media screen and (max-width: 500px) {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    height: 570px;
    max-width: 360px;
  }
`;
