import React, { useState, useEffect } from "react";
import getTimeAgo from "../../utils/getTimeAgo";
import { toast } from "react-toastify";
import like from "../../backendUtility/likes.utility";
import { useSelector } from "react-redux";

function VideoInfo({ videoData, setIsAddToPlaylistClicked, fetchVideo }) {
  const currentUser = useSelector((state) => state.user.userData);

  const [isLiked, setIsLiked] = useState(false);
  const [prevState,setPrevState]=useState(isLiked);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    setLikesCount(videoData?.likes || 0);

    const fetchLikeStatus = async () => {
      if (!currentUser || !videoData?._id) {
        setIsLiked(false);
        return;
      }
      try {
        const response = await like.isLikedVideoByUser(
          currentUser._id,
          videoData._id
        );
        
        setIsLiked(response.data.liked);
      } catch (error) {
        console.log("Failed to fetch like status:", error);
      }
    };

    fetchLikeStatus();
  }, [currentUser, videoData]);

  const shareHandler = () => {
    const currUrl = window.location.href;
    navigator.clipboard
      .writeText(currUrl)
      .then(() => toast.success("Link copied successfully"))
      .catch((err) => toast.error("Failed To Copy Url: " + err.message));
  };

  const handleLike = async () => {
    if (!currentUser) {
      toast.info("Please login to perform this action");
      return;
    }

    

    try {
      const res = await like.toggleLike(videoData._id);
      
      if (res.statusCode === 200) {
        if(res.data.liked===true){
          toast.success("you liked this video")
        }else{
          toast.success("you unliked this video")
        }
        setIsLiked(res.data.liked);
        setPrevState(res.data.liked);
        if (fetchVideo) fetchVideo();
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("An error occurred. Please try again.");
      // Revert the state if the API call fails
      setIsLiked(previousLikeState);
      setLikesCount((prev) => (previousLikeState ? prev + 1 : prev - 1));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-slate-100 leading-tight mb-3 text-xl sm:text-2xl md:text-3xl">
          {videoData?.title || "Video Title"}
        </h1>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-eye text-blue-400"></i>
            <span className="font-medium">{videoData?.views || 0} views</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-clock text-slate-500"></i>
            <span>{getTimeAgo(videoData?.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-calendar text-slate-500"></i>
            <span>
              {videoData?.createdAt
                ? new Date(videoData.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Date"}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 border ${
                isLiked
                  ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                  : "bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600"
              }`}
            >
              <i className="fa-solid fa-thumbs-up"></i>
              <span>{likesCount}</span>
            </button>
        </div>
        {/* Save & Share Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddToPlaylistClicked((prev) => !prev)}
            className="flex items-center gap-3 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 border border-slate-600"
          >
            <i className="fa-solid fa-bookmark text-blue-400"></i>
            <span className="text-slate-100">Save</span>
          </button>

          <button
            onClick={shareHandler}
            className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg transition-all duration-300 hover:scale-105 border border-slate-600"
          >
            <i className="fa-solid fa-share text-slate-400"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoInfo;











