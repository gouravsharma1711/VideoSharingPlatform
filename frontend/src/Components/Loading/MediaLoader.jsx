import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

function ImageLoader({ src, alt, className, fallbackSrc = "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png" }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = () => {
        setLoading(false);
    };

    const handleError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <div className="h-full w-full flex justify-center items-center">
            {loading && (
                <div className={`absolute inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm ${className}`}>
                    <LoadingSpinner size={20} />
                </div>
            )}
            <img
                src={error ? fallbackSrc : src}
                alt={alt}
                className={className}
                onLoad={handleLoad}
                onError={handleError}
                style={{ display: loading ? 'none' : 'block' }}
            />
        </div>
    );
}

function VideoLoader({ src, className, poster, ...props }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoadedData = () => {
        setLoading(false);
    };

    const handleError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <div className="relative">
            {loading && (
                <div className={`absolute inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-lg ${className}`}>
                    <div className="flex flex-col items-center gap-2">
                        <LoadingSpinner size={25} />
                        <span className="text-xs text-gray-400">Loading video...</span>
                    </div>
                </div>
            )}
            {error ? (
                <div className={`flex items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-lg ${className}`}>
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                        <i className="fa-solid fa-exclamation-triangle text-2xl"></i>
                        <span className="text-xs">Failed to load video</span>
                    </div>
                </div>
            ) : (
                <video
                    src={src}
                    className={className}
                    poster={poster}
                    onLoadedData={handleLoadedData}
                    onError={handleError}
                    style={{ display: loading ? 'none' : 'block' }}
                    {...props}
                />
            )}
        </div>
    );
}

export { ImageLoader, VideoLoader };