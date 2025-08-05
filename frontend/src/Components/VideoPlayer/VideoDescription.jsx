import { useState } from 'react'

function VideoDescription({videoData}) {
    const s=videoData?.description;
    const [isFullDesc, setIsFullDesc] = useState(false);
    
    return (
        <div className="bg-slate-700/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/30">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
                <h3 className="font-bold text-xl text-white">Description</h3>
            </div>
            
            <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                    {isFullDesc ? s : s?.slice(0, 200) + "..."}
                </p>
                
                <button 
                    className="group flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-105"
                    onClick={() => setIsFullDesc(!isFullDesc)}
                >
                    <span className="text-sm font-medium">
                        {isFullDesc ? 'Show less' : 'Show more'}
                    </span>
                    <i className={`fa-solid ${isFullDesc ? 'fa-chevron-up' : 'fa-chevron-down'} group-hover:scale-110 transition-transform duration-200`}></i>
                </button>
                
            </div>
        </div>
    )
}

export default VideoDescription
