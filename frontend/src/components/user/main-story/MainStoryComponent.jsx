import React, { useEffect, useState, useMemo, useCallback } from "react";
import { apiRequest, apiRequestType } from "../../../api/user/Api";
import { API_URL } from "../../../config/config";
import Loading from "../../loading/Loading";
import MainStoryDiv from "./MainStoryDiv";

const MainStoryComponent = ({ user }) => {
  const [stories, setStories] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProfilePost = useCallback(async () => {
    try {
      const response = await apiRequest(
        apiRequestType.get,
        false,
        `${API_URL.story.get.storys}`,
        user.token
      );
      if (response?.success) {
        const newStories = response.data.reduce((uniqueStories, storyItem) => {
          if (!uniqueStories[storyItem._id]) {
            uniqueStories[storyItem._id] = true;
            return [...uniqueStories, storyItem];
          }
          return uniqueStories;
        }, []);

        setStories((prevStories) => ({
          ...prevStories,
          ...newStories.reduce((acc, storyItem) => {
            acc[storyItem._id] = storyItem;
            return acc;
          }, {}),
        }));
      }
    } catch (error) {
      console.error("Error fetching profile story:", error);
    } finally {
      setLoading(false);
    }
  }, [user.token]);

  const addStoryView = useCallback(
    async (storyId) => {
      await apiRequest(
        apiRequestType.post,
        false,
        `${API_URL.story.post.add_view}`,
        user.token,
        { story_id: storyId }
      );
      setLoading(false);
    },
    [user.token]
  );

  useEffect(() => {
    fetchProfilePost();
  }, [fetchProfilePost]);

  const memoizedStories = useMemo(() => Object.values(stories), [stories]);

  return (
    <div className="main-story-container">
      <div className="story-wrapper">
        <div className="story-container">
          {memoizedStories.map((storyItem) => (
            <div
              onClick={() => addStoryView(storyItem._id)}
              key={storyItem._id}
            >
              <MainStoryDiv data={storyItem} user={user} />
            </div>
          ))}
          {loading && <Loading />}
          {!loading && (!memoizedStories || memoizedStories.length === 0) && (
            <h4>NO STORY.</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainStoryComponent;
