import styled from "styled-components";

export const ProfileDetails = styled.div`
  height: 300px;
  width: 700px;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 750px) {
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 500px) {
    width: 360px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
