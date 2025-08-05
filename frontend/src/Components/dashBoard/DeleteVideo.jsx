import React, { useState } from "react";
import videos from "../../backendUtility/videos.utility";
import { ClipLoader } from "react-spinners";
import LoadingSpinner from "./LoadingSpinner";

const DeleteVideo = ({ onCancel, videoId }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [color] = useState("");

  const DeleteVideoHandler = async () => {
    setIsUploading(true);
    try {
      const response = await videos.deleteVideo(videoId);

      if (response.statusCode !== 200) {
        alert("Error in deleting the video");
        setIsUploading(false);
        return onCancel();
      }

      window.location.reload();
    } catch (error) {
      console.error("Delete failed:", error);
      setIsUploading(false);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div className="bg-[#0f0f0f] text-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 3v1H4v2h1v13a2 2 0 002 2h10a2 2 0 002-2V6h1V4h-5V3H9zm2 4h2v10h-2V7zm-4 0h2v10H7V7zm10 10h-2V7h2v10z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Delete Video</h2>
              <p className="text-sm text-gray-400 mt-1">
                Are you sure you want to delete this video? Once it's deleted,
                you will not be able to recover it.
              </p>
            </div>
          </div>
          <button onClick={onCancel}>
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-4 mt-6">
          <button
            className="w-full sm:w-auto px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 text-white transition disabled:opacity-50"
            onClick={DeleteVideoHandler}
            disabled={isUploading}
          >
            {isUploading ? (
              <div>
                <LoadingSpinner size="20" />
                    Deleting ...
              </div>
            ) : (
              "Yes, I'm Sure"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVideo;
