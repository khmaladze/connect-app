import React, { Fragment } from "react";
import styled from "styled-components";

const StoryComponent = ({ data }) => {
  const storyStyle = {
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const itemStyle = {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    minWidth: "370px",
    textAlign: "center",
  };

  return (
    <div style={storyStyle}>
      <Fragment key={data._id}>
        {data.list && (
          <FriendListStyleComponent list={data.list}>
            {data.list}
          </FriendListStyleComponent>
        )}
        {data.text && <div style={itemStyle}>{data.text}</div>}
        {data.media && data.media[0] && data.media[0].url && (
          <img
            style={{
              height: "100%",
              width: "100%",
              maxHeight: "500px",
            }}
            src={data.media[0].url}
            alt={`story-${data._id}`}
          />
        )}
      </Fragment>
    </div>
  );
};

export default StoryComponent;

const FriendListStyleComponent = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  min-width: 370px;
  text-align: center;
  color: ${(props) =>
    props.list === "Friend"
      ? "#0500ff"
      : props.list === "CloseFriend"
      ? "#1eff1e"
      : props.list === "Favorite"
      ? "#FF008A"
      : "white"};
`;
