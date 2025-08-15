import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import videos from "../../backendUtility/videos.utility";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { toast } from "react-toastify";

const UploadIcon = () => {
  return (
    <i className="fa-solid fa-cloud-arrow-up"></i>
  )
}


const EditVideo = ({ onCancel }) => {
  const user = useSelector((state) => state.user.userData);
  const videoData = useSelector((state) => state.videoEditing.videoData);
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState(videoData.title || "");
  const [description, setDescription] = useState(videoData.description || "");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnail(file);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleThumbnailUpdate = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      alert("Please select a thumbnail");
      return;
    }

    setLoading(true);

    try {
      const formdata = new FormData();
      formdata.append("thumbnail", thumbnail);

      const response = await videos.updateThumbnail(formdata, videoData._id);

      if (response?.success) {
        toast.success("Thumbnail updated successfully");
      } else {
        const errorMsg = response?.error || "Something went wrong";
        console.log(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error(error.message || error);
      toast.error("Failed to update thumbnail. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsUpdate = () => {
    // Handle title/description update logic here
    console.log("Update Title & Description:", { title, description });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-black/95 backdrop-blur-md border border-gray-700/50 text-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-800/80 backdrop-blur-md border-b border-gray-700/50 p-6 rounded-t-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75"></div>
                <div className="relative w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-edit text-white text-lg"></i>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold gradient-text">Edit Video</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Update your video content and settings
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* User Profile */}
          <div className="bg-slate-700/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={
                    user?.avatar ||
                    "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
                  }
                  alt="Profile"
                  className="relative w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {user?.fullName || "User Name"}
                </h3>
                <p className="text-gray-400 text-sm">Content Creator</p>
              </div>
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="bg-slate-700/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-white">
                <i className="fa-solid fa-image mr-2 text-purple-400"></i>
                Thumbnail Upload
              </h3>
            </div>

            <form onSubmit={handleThumbnailUpdate} className="space-y-6">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`relative group border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragging 
                    ? "border-purple-500 bg-purple-500/10 scale-105" 
                    : "border-gray-600/50 hover:border-purple-500/50 hover:bg-purple-500/5"
                }`}
              >
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-4"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative h-16 w-16 flex justify-center items-center rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                      <UploadIcon/>
                    </div>
                  </div>
                  
                  {thumbnail ? (
                    <div className="space-y-2">
                      <p className="text-lg text-white font-semibold">
                        <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                        Thumbnail Selected
                      </p>
                      <p className="text-sm text-gray-300 bg-slate-600/50 px-4 py-2 rounded-xl border border-gray-600/30">
                        {thumbnail.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Size: {(thumbnail.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-lg text-purple-400 font-semibold">
                        Click to upload thumbnail
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">or drag and drop your image here</p>
                        <p className="text-xs text-gray-500 bg-slate-600/30 px-3 py-1 rounded-lg">
                          SVG, PNG, JPG or GIF 
                        </p>
                      </div>
                    </div>
                  )}
                </label>
                
                {isDragging && (
                  <div className="absolute inset-0 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                    <p className="text-purple-300 font-semibold text-lg">
                      <i className="fa-solid fa-download mr-2"></i>
                      Drop your image here
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading || !thumbnail}
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? (
                      <>
                        <LoadingSpinner size={16} />
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-cloud-upload-alt group-hover:scale-110 transition-transform duration-200"></i>
                        Update Thumbnail
                      </>
                    )}
                  </span>
                  {!loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Title & Description Form */}
          <div className="bg-slate-700/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-white">
                <i className="fa-solid fa-edit mr-2 text-blue-400"></i>
                Video Details
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-3 text-gray-300">
                  <i className="fa-solid fa-heading mr-2 text-purple-400"></i>
                  Video Title*
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter an engaging video title..."
                  className="w-full rounded-xl bg-slate-600/50 border border-gray-600/50 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-slate-600/70"
                  required
                />
                <p className="text-xs text-gray-400 mt-2">
                  {title.length}/100 characters
                </p>
              </div>

              <div>
                <label htmlFor="desc" className="block text-sm font-medium mb-3 text-gray-300">
                  <i className="fa-solid fa-align-left mr-2 text-blue-400"></i>
                  Video Description*
                </label>
                <textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your video content, what viewers can expect..."
                  className="w-full rounded-xl bg-slate-600/50 border border-gray-600/50 text-white px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-slate-600/70 custom-scrollbar"
                  required
                />
                <p className="text-xs text-gray-400 mt-2">
                  {description.length}/500 characters
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleDetailsUpdate}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex-1 sm:flex-none"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <i className="fa-solid fa-save group-hover:scale-110 transition-transform duration-200"></i>
                    Update Details
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button
                  onClick={onCancel}
                  className="group bg-slate-600/50 hover:bg-slate-500/50 border border-gray-600/50 hover:border-gray-500/50 text-gray-300 hover:text-white px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 flex-1 sm:flex-none"
                >
                  <span className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-times group-hover:rotate-90 transition-transform duration-300"></i>
                    Cancel
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVideo;
