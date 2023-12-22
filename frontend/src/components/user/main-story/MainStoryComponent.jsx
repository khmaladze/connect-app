import React, { useEffect, useState } from "react";
import { apiRequest, apiRequestType } from "../../../api/user/Api";
import { API_URL } from "../../../config/config";
import Loading from "../../loading/Loading";
import MainStoryDiv from "./MainStoryDiv";

const MainStoryComponent = ({ user }) => {
  const [story, setStory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfilePost = async () => {
    try {
      const response = await apiRequest(
        apiRequestType.get,
        false,
        `${API_URL.story.get.storys}`,
        user.token
      );
      if (response?.success) {
        setStory(response.data);
      }
    } catch (error) {
      console.error("Error fetching profile story:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfilePost();
  }, [user.token]);

  return (
    <div
      style={{
        width: "100",
        margin: "0 auto",
        overflowX: "auto",
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            background: "white",
            height: "85px",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "10px",
          }}
        >
          {story &&
            story.length > 0 &&
            story.map((storyItem) => (
              <MainStoryDiv key={storyItem._id} data={storyItem} user={user} />
            ))}
          {loading && <Loading />}
          {story && story.length == 0 && <h4>NO STORY.</h4>}
        </div>
      </div>
    </div>
  );
};

export default MainStoryComponent;
