import React,{ useEffect, useState } from "react";
import DeleteVideo from "./DeleteVideo";
import videos from "../../backendUtility/videos.utility";
import { toggleEdit } from "../../Features/DashBoard/videoEditingButton.Slice";
import { useDispatch } from 'react-redux';

const DeleteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
  </svg>
);

function ResponsiveVideoCard({ videoData, updateVideoById, isMobile }) {
  const dispatch=useDispatch();
  const [video, setVideo] = useState(videoData || {});
  const [isDeleteButtonOpen, setIsDeleteButtonOpen] = useState(false);

  useEffect(() => {
    setVideo(videoData);
  }, [videoData]);

  const handleDeleteClick = () => {
    setIsDeleteButtonOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteButtonOpen(false);
  };

  const togglePublish = async () => {
    try {
      const response = await videos.togglePublishStatus(video._id);
      if (response?.data) {
        setVideo(response.data);
        if (updateVideoById) {
          updateVideoById(video._id, { isPublished: response.data.isPublished });
        }
      }
    } catch (error) {
      console.error("Error publishing video:", error.message);
    }
  };

  const renderDeleteModal = () =>
    isDeleteButtonOpen && (
      <DeleteVideo
        onCancel={handleCancelDelete}
        videoId={video._id}
      />
    );

  if (isMobile) {
    return (
      <>
        <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <img src={video.thumbnail} alt={video.title} className="w-10 h-10 rounded-md object-cover" />
              <span className="text-white font-medium text-sm">{video.title}</span>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={video.isPublished === true}
                  onChange={togglePublish}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
              <span className={`text-sm font-medium ${video.isPublished ? "text-green-400" : "text-yellow-400"}`}>
                {video.isPublished ? "Published" : "Unpublished"}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            <div>
              <span className="text-green-400">{video.likes}</span> Likes
            </div>
            <div className="mt-1">
              Uploaded:{" "}
              <span className="text-white">
                {new Date(video.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="mt-2 flex gap-4 text-gray-400">
              <button className="hover:text-white" onClick={handleDeleteClick}>
                <DeleteIcon />
              </button>
              <button className="hover:text-white" onClick={()=>{
                
                dispatch(toggleEdit(video || {}))}}>
                <EditIcon />
              </button>
            </div>
          </div>
        </div>
        {renderDeleteModal()}
      </>
    );
  }

  return (
    <>
      <tr className="border-b border-gray-700 last:border-b-0">
        <td className="p-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={video.isPublished === true}
              onChange={togglePublish}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            <span className={`ml-3 text-sm font-medium ${video.isPublished ? "text-green-400" : "text-yellow-400"}`}>
              {video.isPublished ? "Published" : "Unpublished"}
            </span>
          </label>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-3">
            <img src={video.thumbnail} alt={video.title} className="w-10 h-10 rounded-md object-cover" />
            <span className="text-white font-medium text-sm truncate w-52">{video.title}</span>
          </div>
        </td>
        <td className="p-4 text-sm">
          <span className="text-green-400">{video.likes} Likes</span>
        </td>
        <td className="p-4 text-sm text-gray-400">
          {new Date(video.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2 text-gray-400">
            <button className="hover:text-white" onClick={handleDeleteClick}>
              <DeleteIcon />
            </button>
            <button className="hover:text-white" onClick={()=>{dispatch(toggleEdit(video || {}))}}>
              <EditIcon />
            </button>
          </div>
        </td>
      </tr>
      {renderDeleteModal()}
    </>
  );
}

export default ResponsiveVideoCard
