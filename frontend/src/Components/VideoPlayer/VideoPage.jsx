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
import SaveToPlaylistModal from './SaveToPlaylistModal.jsx'
import { useSelector } from "react-redux";

function VideoPage() {

  const [isAddToPlaylistClicked,setIsAddToPlaylistClicked]=useState(false);
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState({});
  const user=useSelector(state=>state.user.userData);
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


  if(isAddToPlaylistClicked && !user){
    toast.info('Please login to save playlist');
    setIsAddToPlaylistClicked(false);
  }
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-10 gap-6">
          {/* Left Section: Main Video and Info */}
          <div className="xl:col-span-6 space-y-6">
            <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
              <VideoPlayer videoData={videoData} />
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <VideoInfo videoData={videoData} setIsAddToPlaylistClicked={setIsAddToPlaylistClicked} fetchVideo={fetchVideo}/>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <ChannelInfo channelData={videoData.owner} />
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <VideoDescription videoData={videoData} />
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <CommentsSection />
            </div>
          </div>

          <div className="xl:col-span-4">
            <div className=" top-24">
              <SuggestedVideos />
            </div>
          </div>
          {
            isAddToPlaylistClicked && user && <SaveToPlaylistModal setIsAddToPlaylistClicked={setIsAddToPlaylistClicked}/>
          }
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
