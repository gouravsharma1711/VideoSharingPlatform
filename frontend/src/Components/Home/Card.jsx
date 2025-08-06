import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import { ImageLoader, VideoLoader } from '../Loading/MediaLoader.jsx';
import videos from "../../backendUtility/videos.utility.js";
import userObject from "../../backendUtility/user.utility.js";
function Card({ item }) {
  const user=useSelector((state)=>state.user.userData)
  const [isHovered, setIsHovered] = useState(false);
  const Navigate = useNavigate();

  const title =
    "Here is your Title, My first Video | Gourav Sharma | Shardha Kapoor | Sajna Kapoor | Ranjeet Kumar";

  const HandleNavigateToVideoPage = () => {
    videos.getSingleView(item._id)
    Navigate(`/videos/${item?._id}`);
    if(user){
      userObject.addToWatchHistory(item._id);
    }
  };

  const HandleProfileNavigation = (e) => {
    e.stopPropagation();
    Navigate(`/user/${item?.owner?.userName}`);
  };


  return (
    <div
      className="group bg-gradient-to-br from-slate-900/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden text-white cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 border border-gray-800/50 hover:border-purple-500/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={HandleNavigateToVideoPage}
    >
      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
        {isHovered ? (
          <VideoLoader
            src={
              item
                ? (item.videoFile)
                : "https://res.cloudinary.com/dcs7eq5kf/video/upload/v1752773278/VSW_Videos/olirxyd7pswetcs26rwp.mp4"
            }
            autoPlay
            muted
            loop
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            poster={item?.thumbnail}
          />
        ) : (
          <ImageLoader
            src={
              item?.thumbnail || "https://res.cloudinary.com/dcs7eq5kf/image/upload/v1752773278/VSW_Thumbnails/fqzjxk6yv4f0t9g6l4mz.jpg"
            }
            alt="Video Thumbnail"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        {item?.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md z-20">
            {Math.floor(item.duration / 60)}:{String(Math.floor(item.duration % 60)).padStart(2, '0')}
          </div>
        )}
      </div>

      <div className="flex gap-3 p-4">
        <div className="relative group/avatar">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-0 group-hover/avatar:opacity-75 transition-opacity duration-300"></div>
          <ImageLoader
            src={
              item?.owner?.avatar || "https://res.cloudinary.com/dcs7eq5kf/image/upload/v1752773278/VSW_ProfilePictures/qoq4b9n0a6p2u9c4jzwn.png"
            }
            alt="Channel Profile"
            className="relative h-10 w-10 rounded-full object-cover border-2 border-transparent hover:border-purple-500/50 transition-all duration-300 hover:scale-110 cursor-pointer"
            onClick={HandleProfileNavigation}
          />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="text-sm font-semibold leading-snug mb-1 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
            {item?.title?.length > 60
              ? item.title.substring(0, 60) + "..."
              : item.title}
          </h3>
          <div
            className="text-gray-400 text-xs hover:text-purple-400 transition-colors duration-300 cursor-pointer"
            onClick={HandleProfileNavigation}
          >
            {item?.owner?.userName}
          </div>
          <div className="text-gray-500 text-xs mt-1 flex items-center gap-2">
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-eye text-purple-400"></i>
              {item.views || "0"} views
            </span>
            <span>•</span>
            <span>
              {item.updatedAt
                ? new Date(item.updatedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Just Now"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
