import React,{ useEffect, useState } from 'react';
import ResponsiveVideoCard from './ResponsiveVideoCard';

const VideoTable = ({ videos }) => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    setVideoData(videos);
  }, [videos]);

  const updateVideoById = (id, updatedFields) => {
    setVideoData(prev =>
      prev.map(video =>
        video._id === id ? { ...video, ...updatedFields } : video
      )
    );
  };

  return (
    <div className="mt-8">
      {videoData.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          No Video Uploaded By User yet
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-gray-800/50 border border-gray-700 rounded-xl overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-400">Status</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">Uploaded</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">Rating</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">Date</th>
                  <th className="p-4 text-sm font-semibold text-gray-400"></th>
                </tr>
              </thead>
              <tbody>
                {videoData.map(video => (
                  <ResponsiveVideoCard
                    key={video._id}
                    videoData={video}
                    updateVideoById={updateVideoById}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile Cards */}
          <div className="md:hidden">
            {videoData.map(video => (
              <ResponsiveVideoCard
                key={video._id}
                videoData={video}
                updateVideoById={updateVideoById}
                isMobile
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoTable
