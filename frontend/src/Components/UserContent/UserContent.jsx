import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import VideosView from '../Home/VideosView.jsx';
import { toast } from 'react-toastify';
import videos from '../../backendUtility/videos.utility.js';
import Loading from '../Loading/Loading.jsx';
import AuthWrapper from '../Auth/AuthWrapper.jsx';

function UserContent() {
    const [loading, setLoading] = useState(false);
    const [videoData, setVideoData] = useState([]);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.user.userData);

    const fetchVideosData = useCallback(async () => {
        if (!user) return;
        
        try {
            setLoading(true);
            setError(null);
            const responseData = await videos.getCurrentUserVideos();
            
            if (responseData?.statusCode !== 200) {
                const errorMessage = responseData?.message || 'Failed to fetch videos';
                setError(errorMessage);
                toast.error(errorMessage);
            } else {
                setVideoData(responseData?.data || []);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || 'An error occurred while fetching videos';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchVideosData();
    }, [fetchVideosData]);

    const handleRetry = () => {
        setError(null);
        fetchVideosData();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
                <Loading size={50} msg="Fetching your content..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl text-center">
                        <i className="fa-solid fa-exclamation-triangle text-5xl text-red-400 mb-4"></i>
                        <h2 className="text-xl font-bold text-white mb-2">Error Loading Content</h2>
                        <p className="text-gray-400 mb-6">{error}</p>
                        <button
                            onClick={handleRetry}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
                        >
                            <i className="fa-solid fa-refresh mr-2"></i>
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AuthWrapper fallbackMessage="Please sign in to view your uploaded content">
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
                <div className="container mx-auto px-6 py-8">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                <i className="fa-solid fa-video mr-3 text-blue-400"></i>
                                My Content
                            </h1>
                            <button
                                onClick={handleRetry}
                                className="bg-slate-700/50 hover:bg-slate-600/50 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-600/50"
                                title="Refresh content"
                            >
                                <i className="fa-solid fa-refresh"></i>
                            </button>
                        </div>
                        <p className="text-gray-400 text-lg mb-4">Manage and view all your uploaded videos</p>
                        
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 text-gray-400 bg-slate-800/50 px-4 py-2 rounded-lg">
                                <i className="fa-solid fa-play-circle text-blue-400"></i>
                                <span className="font-medium">{videoData.length} videos uploaded</span>
                            </div>
                            
                            {videoData.length > 0 && (
                                <div className="flex items-center gap-2 text-gray-400 bg-slate-800/50 px-4 py-2 rounded-lg">
                                    <i className="fa-solid fa-eye text-green-400"></i>
                                    <span className="font-medium">
                                        {videoData.reduce((total, video) => total + (video.views || 0), 0)} total views
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {videoData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 shadow-2xl text-center max-w-md">
                                <i className="fa-solid fa-video-slash text-6xl text-gray-500 mb-6"></i>
                                <h3 className="text-2xl font-bold text-white mb-4">No Content Yet</h3>
                                <p className="text-gray-400 mb-6">You haven't uploaded any videos yet. Start creating and sharing your content!</p>
                                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105">
                                    <i className="fa-solid fa-plus mr-2"></i>
                                    Upload Your First Video
                                </button>
                            </div>
                        </div>
                    ) : (
                        <VideosView videoData={videoData} />
                    )}
                </div>
            </div>
        </AuthWrapper>
    );
}

export default UserContent
