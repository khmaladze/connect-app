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

  const addStoryView = async (storyId) => {
    await apiRequest(
      apiRequestType.post,
      false,
      `${API_URL.story.post.add_view}`,
      user.token,
      { story_id: storyId }
    );
    setLoading(false);
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
              <div
                onClick={() => addStoryView(storyItem._id)}
                key={storyItem._id}
              >
                <MainStoryDiv data={storyItem} user={user} />
              </div>
            ))}
          {loading && <Loading />}
          {!loading && story && story.length === 0 && <h4>NO STORY.</h4>}
        </div>
      </div>
    </div>
  );
};

export default MainStoryComponent;
