import { useState } from "react";

const ChannelInfo = ({ userData }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-2xl border border-gray-600/30 gap-3">
      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar */}
        <div className="relative group shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img
            src={userData?.avatar}
            alt={userData?.userName}
            className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 cursor-pointer hover:scale-110"
          />
        </div>

        {/* Name + Subscribers */}
        <div className="truncate">
          <h3 className="font-bold text-white text-sm sm:text-base truncate hover:text-purple-300 transition-colors duration-300 cursor-pointer">
            {userData?.userName}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <i className="fa-solid fa-users text-purple-400"></i>
            <span>{userData?.subscribersCount} subscribers</span>
          </div>
        </div>
      </div>

      {/* Right: Subscribe Button */}
      <button
        onClick={() => setIsFollowing(!isFollowing)}
        className={`relative group overflow-hidden px-3 py-1.5 sm:px-5 sm:py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 whitespace-nowrap ${
          isFollowing
            ? "bg-slate-600/50 text-gray-300 hover:bg-slate-500/50 border border-gray-600/50"
            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/25"
        }`}
      >
        <span className="relative z-10 flex items-center gap-1 sm:gap-2">
          <i className={`fa-solid ${isFollowing ? "fa-check" : "fa-plus"}`}></i>
          {isFollowing ? "Subscribed" : "Subscribe"}
        </span>
        {!isFollowing && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}
      </button>
    </div>
  );
};

export default ChannelInfo;
