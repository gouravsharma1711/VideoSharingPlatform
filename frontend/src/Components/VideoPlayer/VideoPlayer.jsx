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
    <div className="relative aspect-video w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
      {showPoster && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10"></div>
          <img
            src={videoData?.thumbnail}
            alt="Thumbnail Image"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <button
            onClick={handlePlayClick}
            className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-6 rounded-full transition-all duration-300 hover:scale-110 shadow-2xl">
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </button>
        </>
      )}

      <video
        ref={videoRef}
        className="w-full h-full z-0 rounded-2xl"
        controls
        onEnded={handleEnded}
        src={videoData?.videoFile}
      >
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm font-semibold px-3 py-2 rounded-lg pointer-events-none z-30 border border-gray-700/50">
        <i className="fa-solid fa-play mr-2 text-purple-400"></i>
        Now Playing
      </div>
    </div>
  );
}

export default VideoPlayer;
