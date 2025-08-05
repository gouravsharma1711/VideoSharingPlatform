import { useState } from "react";
import { useSelector } from "react-redux";

const UploadIcon = () => <i className="fa-solid fa-plus mr-1" />;

const DashBoardHeader = ({ setIsUploadClicked }) => {
  const handleUploadVideoClick = () => {
    setIsUploadClicked(prev => !prev);
  };

  const userName=useSelector((state)=>state.user.userData.fullName)

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {userName}
        </h1>
        <p className="text-gray-400 mt-1">
          Track, manage and forecast your customers and orders.npm run dev
        </p>
        <div className="flex items-center mt-2">
          <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          <span className="text-sm text-green-400 font-medium">Live Updates Active</span>
        </div>
      </div>

      <div className="flex space-x-3 mt-4 sm:mt-0">
        <button
          onClick={handleUploadVideoClick}
          className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <UploadIcon />
          Upload Video
        </button>
      </div>
    </div>
  );
};

export default DashBoardHeader;
