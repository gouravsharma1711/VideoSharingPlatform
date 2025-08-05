import { Link } from 'react-router-dom';

export default function PlaylistVideoCard({ video }) {
  return (
    <div
            className="flex items-center gap-4 bg-black border border-gray-700 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-900 transition"
            onClick={() => navigate(`/video/${video._id}`)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-40 h-24 object-cover"
            />
            <div className="flex flex-col flex-1 py-2 pr-4">
              <div className="text-base font-semibold text-white truncate">
                {video.title}
              </div>
              <div className="text-sm text-gray-300 mt-1">
                {video.owner.userName}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {video.views} • {new Date(video.createdAt).toLocaleDateString('en-GB',{day:"numeric",month:"short",year:"numeric"})}
              </div>
            </div>
          </div>
  );
}
