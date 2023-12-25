import styled from "styled-components";

export const WelcomePageNavbarMain = styled.div`
  height: 110px;
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 750px) {
    font-size: 25px;
    width: 92%;
  }

  @media screen and (max-width: 550px) {
    font-size: 20px;
    width: 95%;
  }
`;

export const WelcomePageLogo = styled.div`
  height: 50px;
  font-size: 32px;
  color: #001aff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Raleway", sans-serif;

  @media screen and (max-width: 750px) {
    font-size: 25px;
  }

  @media screen and (max-width: 550px) {
    font-size: 22px;
  }
`;

export const WelcomePageNavbarButtons = styled.div`
  width: 350px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Raleway", sans-serif;

  @media screen and (max-width: 750px) {
    width: 285px;
  }

  @media screen and (max-width: 550px) {
    width: 250px;
  }
`;

export const WelcomePageNavbarButton = styled.div`
  color: #000000;
  font-size: 28px;
  cursor: pointer;

  @media screen and (max-width: 750px) {
    font-size: 25px;
  }

  @media screen and (max-width: 550px) {
    font-size: 22px;
  }
`;
