import styled from "styled-components";

export const LoginPageMain = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LoginPageNavbar = styled.div`
  height: 110px;
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LoginPageLogo = styled.div`
  height: 50px;
  font-size: 32px;
  color: #001aff;
  cursor: pointer;
`;

export const LoginPageNavbarButtons = styled.div`
  width: 350px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LoginPageNavbarButton = styled.div`
  color: #000000;
  font-size: 28px;
  cursor: pointer;
`;

export const LoginPageFormContainer = styled.div`
  min-height: calc(100vh - 110px);
  height: 100%;
  width: 95%;
  margin: 0 auto;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

export const LoginPageForm = styled.div`
  width: 350px;
  margin: 0 auto;
  margin-top: 200px;
  h1 {
    text-align: center;
  }
`;
