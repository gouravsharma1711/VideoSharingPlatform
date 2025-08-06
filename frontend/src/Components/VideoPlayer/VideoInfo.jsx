import React, { useState } from "react";
import getTimeAgo from "../../utils/getTimeAgo";
import { toast } from "react-toastify";
import like from "../../backendUtility/likes.utility";

function VideoInfo({ videoData, setIsAddToPlaylistClicked,fetchVideo }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  
  const shareHandler = () => {
    const currUrl = window.location.href;
    navigator.clipboard
      .writeText(currUrl)
      .then(() => toast.success("Link copied successfully"))
      .catch((err) => toast.error("Failed To Copy Url: " + err.message));
  };

  const handleLike = async () => {
    try {
      // If disliked, remove it
      if (isDisliked) {
        setIsDisliked(false);
      }

      // Optimistic UI update
      setIsLiked((prev) => !prev);

      const res = await like.toggleLike(videoData._id);
      
      if (res.statusCode === 200) {
        toast.success(isLiked ? "Like removed" : "Liked!");
      } else {
        throw new Error(res.message);
      }
      fetchVideo();
    } catch (error) {
      console.error(error);
      toast.error("Error toggling like");
      setIsLiked((prev) => !prev);
    }
  };

  const handleDislike = () => {
    // If liked, remove like and reduce count
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    }
    // Toggle dislike
    setIsDisliked((prev) => !prev);
    toast.success(`${isDisliked ? "Dislike removed" : "Disliked!"}`)
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Title + Stats */}
      <div>
        <h1 className="font-bold text-white leading-tight mb-2 sm:mb-3 text-lg sm:text-2xl md:text-3xl truncate">
          {videoData.title}
        </h1>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-gray-400 text-xs sm:text-sm">
          <div className="flex items-center gap-1 sm:gap-2">
            <i className="fa-solid fa-eye text-purple-400"></i>
            <span className="font-medium">{videoData.views}  views</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <i className="fa-solid fa-clock text-blue-400"></i>
            <span>{getTimeAgo(videoData.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <i className="fa-solid fa-calendar text-green-400"></i>
            <span>
              {new Date(videoData.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        {/* Like & Dislike */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleLike}
            className={`group flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 border ${
              isLiked
                ? "bg-green-600/20 border-green-500/30"
                : "bg-slate-700/50 border-gray-600/50 hover:bg-gradient-to-r hover:from-green-600/20 hover:to-emerald-600/20 hover:border-green-500/30"
            }`}
          >
            <i
              className={`fa-solid fa-thumbs-up ${
                isLiked ? "text-green-500" : "text-green-400"
              } group-hover:scale-110 transition-transform duration-200`}
            ></i>
            <span className="text-white">{videoData.likes}</span>
          </button>

          <button
            onClick={handleDislike}
            className={`group flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 border ${
              isDisliked
                ? "bg-red-600/20 border-red-500/30"
                : "bg-slate-700/50 border-gray-600/50 hover:bg-gradient-to-r hover:from-red-600/20 hover:to-pink-600/20 hover:border-red-500/30"
            }`}
          >
            <i
              className={`fa-solid fa-thumbs-down ${
                isDisliked ? "text-red-500" : "text-red-400"
              } group-hover:scale-110 transition-transform duration-200`}
            ></i>
          </button>
        </div>

        {/* Save & Share */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsAddToPlaylistClicked((prev) => !prev)}
            className="group flex items-center gap-2 sm:gap-3 bg-slate-700/50 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 px-3 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 border border-gray-600/50 hover:border-blue-500/30"
          >
            <i className="fa-solid fa-bookmark text-blue-400 group-hover:scale-110 transition-transform duration-200"></i>
            <span className="text-white">Save</span>
          </button>

          <button
            onClick={shareHandler}
            className="group bg-slate-700/50 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 p-2 sm:p-3 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-600/50 hover:border-purple-500/30"
          >
            <i className="fa-solid fa-share text-purple-400 group-hover:scale-110 transition-transform duration-200"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoInfo;
