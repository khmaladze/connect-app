import React, { useEffect, useState } from "react";
import { apiRequest, apiRequestType } from "../../../api/user/Api";
import { API_URL } from "../../../config/config";
import Loading from "../../loading/Loading";

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
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      {story &&
        story.map((item) => {
          return item._id;
        })}
      {loading && <Loading />}
    </div>
  );
};

export default MainStoryComponent;
