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
  /* Set a minimum height to cover the entire viewport minus the navbar height */
  min-height: calc(100vh - 110px);
  height: 100%;
  width: 95%;
  margin: 0 auto;
`;

export const LoginPageForm = styled.div`
  /* Style for the login form container */
  width: 350px;
  margin: 0 auto;
  margin-top: 200px;

  /* Style for the login form header */
  h1 {
    text-align: center;
  }

  @media screen and (max-width: 750px) {
    margin-top: 100px;
  }
`;
