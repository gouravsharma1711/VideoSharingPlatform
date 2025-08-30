import { useEffect, useState } from "react";
import ChannelHeader from "./ChannelHeader";
import VideoCardList from "./VideoCardList";
import User from "../../backendUtility/user.utility";
import { useSearchParams } from "react-router-dom";
import video from "../../backendUtility/videos.utility";
import UserNotFound from "./ChannelNotFound";
import ChannelNotFound from "./ChannelNotFound";
import { useSelector } from "react-redux";

export default function SearchResultPage() {
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query");

  const searchChannel = async () => {
    try {
      setLoading(true);
      setNotFound(false);

      const response = await User.getUserProfile(query);

      if (response && response.statusCode === 200 && response.data) {
        setChannel(response.data);
      } else {
        setChannel(null);
        setNotFound(true);
      }
    } catch (error) {
      console.log("Error fetching channel:", error);
      setChannel(null);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideo = async () => {
    try {
      const response = await video.getUserVideos(channel?._id);
      if (response && response.statusCode === 200) {
        setVideos(response.data);
      }
    } catch (error) {
      console.log("Error in fetching videos:", error);
    }
  };

  useEffect(() => {
    if (query) {
      searchChannel();
    }
  }, [query]);

  useEffect(() => {
    if (channel && channel._id) {
      fetchVideo();
    }
  }, [channel]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p className="text-lg animate-pulse">Loading channel...</p>
      </div>
    );
  }

  if (notFound || !channel) {
    return <ChannelNotFound message="The channel you searched for does not exist." />;
  }

  return (
    <div className="text-white md:p-16">
      <ChannelHeader channel={channel} />
      <h2 className="text-base sm:text-xl font-semibold p-4 border-b border-gray-700">
        Latest from {channel.userName}
      </h2>
      <VideoCardList videos={videos} />
    </div>
  );
}
