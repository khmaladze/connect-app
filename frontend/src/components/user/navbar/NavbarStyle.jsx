import styled from "styled-components";

export const FixedNavbar = styled.div`
  height: 110px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: white;
  z-index: 100;
  font-family: "Raleway", sans-serif;
`;

export const NavbarMain = styled.div`
  height: 110px;
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 500px) {
    width: 80%;
  }
`;

export const NavbarLogo = styled.div`
  height: 50px;
  font-size: 32px;
  color: #001aff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 500px) {
    font-size: 25px;
  }
`;
