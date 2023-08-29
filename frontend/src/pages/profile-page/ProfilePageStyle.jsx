import styled from "styled-components";

export const ProfilePageMain = styled.div`
  height: auto;
  width: 70%;
  margin: 0 auto;
`;

export const ProfileInfoContainer = styled.div`
  height: 385px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
`;

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
`;

export const ProfileDetails = styled.div`
  height: 300px;
  width: 700px;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  font-size: 20px;
`;
