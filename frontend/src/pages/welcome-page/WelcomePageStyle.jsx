import styled from "styled-components";

export const WelcomePageMain = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const WelcomePageNavbar = styled.div`
  height: 110px;
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WelcomePageLogo = styled.div`
  height: 50px;
  font-size: 32px;
  color: #001aff;
  cursor: pointer;
`;

export const WelcomePageNavbarButtons = styled.div`
  width: 350px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WelcomePageNavbarButton = styled.div`
  color: #000000;
  font-size: 28px;
  cursor: pointer;
`;

export const WelcomePageMovingText = styled.div`
  margin-top: 10%;
  margin-bottom: 50px;
  min-height: 200px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
