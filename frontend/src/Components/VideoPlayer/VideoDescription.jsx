import { useState } from 'react'

function VideoDescription({videoData}) {
    const s=videoData?.description;
    const [isFullDesc, setIsFullDesc] = useState(false);
    
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                <h3 className="font-bold text-xl text-slate-100">Description</h3>
            </div>

            <div className="space-y-4">
                <p className="text-slate-300 leading-relaxed">
                    {isFullDesc ? s : s?.slice(0, 200) + "..."}
                </p>

                <button
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105"
                    onClick={() => setIsFullDesc(!isFullDesc)}
                >
                    <span className="text-sm font-medium">
                        {isFullDesc ? 'Show less' : 'Show more'}
                    </span>
                    <i className={`fa-solid ${isFullDesc ? 'fa-chevron-up' : 'fa-chevron-down'} transition-transform duration-200`}></i>
                </button>

            </div>
        </div>
    )
}

export default VideoDescription
