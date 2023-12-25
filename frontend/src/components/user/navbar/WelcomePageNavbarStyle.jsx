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
`;

export const WelcomePageNavbarButton = styled.div`
  color: #000000;
  font-size: 28px;
  cursor: pointer;

  @media screen and (max-width: 750px) {
    font-size: 25px;
  }
`;
