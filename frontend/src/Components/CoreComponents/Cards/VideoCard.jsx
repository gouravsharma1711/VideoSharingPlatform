export default function VideoCard({ video }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
      {/* Thumbnail */}
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full sm:w-64 rounded-lg object-cover"
      />

      {/* Details */}
      <div className="flex flex-col">
        <h3 className="text-sm sm:text-lg font-semibold line-clamp-2">{video.title}</h3>
        <p className="text-gray-400 text-xs sm:text-sm">
          {video.views} views • {new Date(video.createdAt).toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'})}
        </p>
        <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-2">{video.description?.slice(0, 100) ? video.description.slice(0, 100): ""}</p>
      </div>
    </div>
  );
}
