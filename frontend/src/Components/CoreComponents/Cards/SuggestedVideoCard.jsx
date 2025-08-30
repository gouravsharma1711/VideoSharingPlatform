import getTimeAgo from '../../../utils/getTimeAgo'
function SuggestedVideoCard({ video }) {
    return (
        <div className="group flex gap-4 cursor-pointer p-3 rounded-xl hover:bg-slate-700/30 transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-purple-500/20">
            <div className="relative overflow-hidden rounded-xl">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-40 h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                    {Number(video.duration/60).toFixed(2)}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <i className="fa-solid fa-play text-white text-sm"></i>
                    </div>
                </div>
            </div>
            
            <div className="flex-1 space-y-2">
                <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                    {video.title}
                </h3>
                <p className="text-xs text-gray-400 hover:text-purple-400 transition-colors duration-300 cursor-pointer">
                    {video.owner.userName}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <i className="fa-solid fa-eye text-purple-400"></i>
                        <span>{video.views}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                        <i className="fa-solid fa-clock text-blue-400"></i>
                        <span>{getTimeAgo(video.updatedAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestedVideoCard
