import styled from "styled-components";

export const AddPostContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const AddPostDiv = styled.div`
  max-width: 700px;
  width: 700px;
  min-height: 350px;
  border: 3px solid #1eff1e;
  background: white;
  border-radius: 15px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

export const AddPostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  border-bottom: 3px solid #1eff1e;
  padding: 10px;
`;

export const AddPostHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const AddPostHeaderDiv = styled.div`
  width: 15px;
`;

export const AddPostTextBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const AddPostImageBody = styled.div`
  width: 95%;
  margin: 0 auto;
`;

export const AddPostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  border-top: 3px solid #1eff1e;
  padding: 10px;
`;
