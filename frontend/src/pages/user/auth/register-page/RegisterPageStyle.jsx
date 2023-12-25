import styled from "styled-components";

export const RegisterPageMain = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const RegisterPageFormContainer = styled.div`
  min-height: calc(100vh - 110px);
  height: 100%;
  width: 95%;
  margin: 0 auto;
`;

export const RegisterPageForm = styled.div`
  width: 350px;
  margin: 0 auto;
  margin-top: 100px;
  h1 {
    text-align: center;
  }

  @media screen and (max-width: 750px) {
    margin-top: 50px;
  }
`;
