import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer.jsx";
import CommentsSection from "./CommentsSection.jsx";
import ChannelInfo from "./ChannelInfo.jsx";
import VideoDescription from "./VideoDescription.jsx";
import VideoInfo from "./VideoInfo.jsx";
import SuggestedVideos from "./SuggestedVideos.jsx";
import { useParams } from "react-router-dom";
import videos from "../../backendUtility/videos.utility";
import { toast } from "react-toastify";
import SaveToPlaylistModal from "./SaveToPlaylistModal.jsx";
function VideoPage() {

  const [isAddToPlaylistClicked,setIsAddToPlaylistClicked]=useState(false);
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState({});

  const fetchVideo = async () => {
    try {
      const response = await videos.getVideoById(videoId);
      if (response.statusCode === 200) {
        setVideoData(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [videoId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-300">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-10 gap-6">
          {/* Left Section: Main Video and Info */}
          <div className="xl:col-span-6 space-y-6">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50">
              <VideoPlayer videoData={videoData} />
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <VideoInfo videoData={videoData} setIsAddToPlaylistClicked={setIsAddToPlaylistClicked} fetchVideo={fetchVideo}/>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <ChannelInfo userData={videoData.owner} />
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <VideoDescription videoData={videoData} />
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <CommentsSection />
            </div>
          </div>

          <div className="xl:col-span-4">
            <div className=" top-24">
              <SuggestedVideos />
            </div>
          </div>
          {
                isAddToPlaylistClicked && <SaveToPlaylistModal setIsAddToPlaylistClicked={setIsAddToPlaylistClicked}/>
            }
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
