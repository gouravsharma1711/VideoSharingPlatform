import { useState, useEffect } from "react";
import DashBoardHeader from "../dashBoard/DashBoardHeader.jsx";
import StatCard from "./StatCard.jsx";
import VideoTable from "./VideoTable.jsx";
import UploadVideo from "./UploadComponent/UploadVideo";
import dashboard from "../../backendUtility/dashboard.utility.js";
import videos from "../../backendUtility/videos.utility.js";
import { toast } from 'react-toastify';
import LoadingSpinner from "./LoadingSpinner.jsx";
import EditVideo from "./EditVideo.jsx";
import { useSelector,useDispatch } from "react-redux";
import { toggleEdit } from "../../Features/DashBoard/videoEditingButton.Slice.js";
import Auth from "../Auth/Auth.jsx";

const ViewsIcon = () => <i className="fa-regular fa-eye"></i>;
const FollowersIcon = () => <i className="fa-solid fa-user"></i>;
const LikesIcon = () => <i className="fa-solid fa-thumbs-up"></i>;

function Dashboard() {
  const [dashBoardData, setDashBoardData] = useState(null);
  const [isUploadClicked, setIsUploadClicked] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const isEditing=useSelector(state=>state.videoEditing.isEditing);
  
  const dispatch=useDispatch();

  const fetchStats = async () => {
    try {
      const responseData = await dashboard.getCurrentStats();
      if (!responseData || responseData.statusCode !== 200) {
        return;
      }
      else{
        setDashBoardData(responseData.data);
      }
    } catch (error) {
      console.error("Error in fetching stats:", error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const fetchVideosData = async () => {
    try {
      const responseData = await videos.getCurrentUserVideos();
      if (responseData?.statusCode !== 200) {
        toast.error(responseData?.message);
        return;
      }
      else {
        setVideoData(responseData?.data || []);
      }
    } catch (error) {
      console.error("Error in fetching video :", error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const refreshDashboard = () => {
    fetchStats();
    fetchVideosData();
  };


  useEffect(() => {
    refreshDashboard();
    const intervalId = setInterval(() => {
      refreshDashboard();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // Derive from state directly
  const likes = dashBoardData?.totalLikes ?? 0;
  const views = dashBoardData?.totalViews ?? 0;
  const subscribers = dashBoardData?.totalSubscribers ?? 0;
   
  

  if (!dashBoardData) {
    return (
      <div className="min-h-screen flex  flex-col gap-2 items-center justify-center text-white">
         <LoadingSpinner size={50}/>
         Fetching Data...
      </div>
    );
  }
  

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <DashBoardHeader
            setIsUploadClicked={setIsUploadClicked}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={<ViewsIcon />}
            title="Total Views"
            value={views}
            gradient="from-purple-600 to-blue-600"
            iconBg="bg-purple-500/20"
            key="views"
          />
          <StatCard
            icon={<FollowersIcon />}
            title="Total Subscribers"
            value={subscribers}
            gradient="from-green-600 to-teal-600"
            iconBg="bg-green-500/20"
            key="subs"
          />
          <StatCard
            icon={<LikesIcon />}
            title="Total Likes"
            value={likes}
            gradient="from-pink-600 to-rose-600"
            iconBg="bg-pink-500/20"
            key="likes"
          />
        </div>

        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <VideoTable
            videos={videoData || []}
          />
        </div>
      </div>

      {isUploadClicked && (
        <div className="fixed inset-0 z-[150] flex justify-center items-center bg-black bg-opacity-70 overflow-y-auto px-4 py-8">
          <UploadVideo
            setIsUploadClicked={setIsUploadClicked}
          />
        </div>
      )}
      {
      isEditing && (
      <EditVideo onCancel={() => dispatch(toggleEdit())} />
      )}
      
    </div>
  );
}

export default Dashboard;
