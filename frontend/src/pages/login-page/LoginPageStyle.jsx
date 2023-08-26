import styled from "styled-components";

export const LoginPageMain = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
