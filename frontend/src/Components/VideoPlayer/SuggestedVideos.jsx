import { useState, useEffect, useRef, use } from "react";
import SuggestedVideoCard from "../CoreComponents/Cards/SuggestedVideoCard.jsx";
import videos from "../../backendUtility/videos.utility.js";
import Loading from "../Loading/Loading.jsx";
import {useNavigate} from 'react-router-dom';
import Videos from '../../backendUtility/videos.utility.js'
import User from '../../backendUtility/user.utility'

const SuggestedVideos = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const fetchVideoData = async (pageNumber) => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const response = await videos.getAllVideos({ page: pageNumber, limit: 5 });

      if (response.statusCode === 200 && response.data.length > 0) {
        const shuffled = response.data.sort(() => Math.random() - 0.5);
        setData((prev) => [...prev, ...shuffled]);
      } else {
        setHasMore(false); 
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoData(page);
  }, [page]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el || loading || !hasMore) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      setPage((prev) => prev + 1);
    }
  };
  const navigate=useNavigate();

  const addViews=async(videoId)=>{
    try {
        const response= await Videos.getSingleView(videoId);
        if(response.statusCode!=200){
          throw new Error('error in adding view')
        }
      } catch (error) {
        console.log("Error from adding views: ",error);
      }
  }
  const addToWatchHistory=async(videoId)=>{
    try {
      const response= await User.addToWatchHistory(videoId);
      if(response.statusCode!=200){
          throw new Error('error in adding video in watch history')
        }
    } catch (error) {
      console.log("error in adding watch history : " ,error);
      
    }
  }
  const handleVideoClick=async(videoId)=>{
    await addViews(videoId)
    await addToWatchHistory(videoId)
    navigate(`/videos/${videoId}`)

  };
  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
        <h3 className="text-xl font-bold text-white">
          <i className="fa-solid fa-play-circle mr-2 text-purple-400"></i>
          Recommendation From User Account
        </h3>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="space-y-4 max-h-[600px] uploadVideoClass overflow-y-auto custom-scrollbar"
      >
        {data.map((video) => (
          <div  onClick={()=> handleVideoClick(video._id)}  key={video._id}><SuggestedVideoCard video={video}  /></div>
        ))}

        {loading && <Loading size={20} />}

        {!hasMore && !loading && (
          <p className="text-gray-400 text-xs text-center">No more videos</p>
        )}
      </div>
    </div>
  );
};

export default SuggestedVideos;
