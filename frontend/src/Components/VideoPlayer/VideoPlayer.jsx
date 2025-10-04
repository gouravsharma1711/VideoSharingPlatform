import { useEffect, useRef, useState } from 'react';
function VideoPlayer({videoData}) {
  
  const videoRef = useRef(null);
  const [showPoster, setShowPoster] = useState(true);

  const handlePlayClick = () => {
    videoRef.current.play();
    setShowPoster(false);
  };

  const handleEnded = () => {
    videoRef.current.currentTime = 0;
    setShowPoster(true);
  };

  return (
    <div className="relative aspect-video w-full bg-slate-800 rounded-xl overflow-hidden">
      {showPoster && (
        <>
          <img
            src={videoData?.thumbnail}
            alt="Thumbnail Image"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <button
            onClick={handlePlayClick}
            className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </>
      )}

      <video
        ref={videoRef}
        className="w-full h-full z-0"
        controls
        onEnded={handleEnded}
        src={videoData?.videoFile}
      >
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-4 left-4 bg-slate-900/80 text-slate-100 text-sm font-medium px-3 py-2 rounded-lg pointer-events-none z-30 border border-slate-600">
        <i className="fa-solid fa-play mr-2 text-blue-400"></i>
        Now Playing
      </div>
    </div>
  );
}

export default VideoPlayer;
