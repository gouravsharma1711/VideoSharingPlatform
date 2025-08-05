import React from "react";
import getTimeAgo from "../../utils/getTimeAgo";
function VideoInfo({ videoData,setIsAddToPlaylistClicked }) {


  // const saveHandler=()=>{

  // }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
          {videoData.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-400">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-eye text-purple-400"></i>
            <span className="text-sm font-medium">{videoData.views} views</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-clock text-blue-400"></i>
            <span className="text-sm">{getTimeAgo(videoData.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-calendar text-green-400"></i>
            <span className="text-sm">
              {new Date(videoData.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="group flex items-center gap-3 bg-slate-700/50 hover:bg-gradient-to-r hover:from-green-600/20 hover:to-emerald-600/20 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 border border-gray-600/50 hover:border-green-500/30">
            <i className="fa-solid fa-thumbs-up text-green-400 group-hover:scale-110 transition-transform duration-200"></i>
            <span className="text-white">{videoData.likes}</span>
          </button>
          <button className="group flex items-center gap-3 bg-slate-700/50 hover:bg-gradient-to-r hover:from-green-600/20 hover:to-emerald-600/20 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 border border-gray-600/50 hover:border-green-500/30">
            <i className="fa-solid fa-thumbs-down text-red-400 group-hover:scale-110 transition-transform duration-200"></i>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
          onClick={()=>setIsAddToPlaylistClicked((prev)=>!prev)}
          className="group flex items-center gap-3 bg-slate-700/50 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 border border-gray-600/50 hover:border-blue-500/30">
            <i className="fa-solid fa-bookmark text-blue-400 group-hover:scale-110 transition-transform duration-200"></i>
            <span className="text-white">Save</span>
          </button>
          <button className="group bg-slate-700/50 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 p-3 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-600/50 hover:border-purple-500/30">
            <i className="fa-solid fa-share text-purple-400 group-hover:scale-110 transition-transform duration-200"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoInfo;
