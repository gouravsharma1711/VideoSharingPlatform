import VideosView from '../Home/VideosView.jsx'
import Likes from '../../backendUtility/likes.utility.js'
import { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import AuthWrapper from '../Auth/AuthWrapper.jsx'
import Loading from '../Loading/Loading.jsx'
import useApi from '../../Hooks/useApi.js'

function UserLikes() {
    const [likedVideos, setLikedVideos] = useState([]);
    const userData = useSelector((state) => state.user.userData);
    const {data,loading,request}=useApi(Likes.getLikesVideos);

    const getLikedVideos = useCallback(async () => {
        const response =await request();
        setLikedVideos(response.data);
    }, []);

    useEffect(() => {
        getLikedVideos();
    }, [getLikedVideos]);

    const handleRetry = () => {
        setError(null);
        getLikedVideos();
    };

    const handleUnlike = (videoId) => {
        setLikedVideos(prev => prev.filter(video => video._id !== videoId));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
                <Loading size={50} msg="Loading your liked videos..." />
            </div>
        );
    }

    return (
        <AuthWrapper fallbackMessage="Please sign in to view your liked videos">
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black pt-20">
                <div className="container mx-auto px-6 py-8">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                <i className="fa-solid fa-thumbs-up mr-3 text-pink-400"></i>
                                Liked Videos
                            </h1>
                        </div>
                        <p className="text-gray-400 text-lg mb-4">All the videos you've liked and enjoyed</p>
                        
                        <div className="flex items-center gap-2 text-gray-400 bg-slate-800/50 px-4 py-2 rounded-lg inline-flex">
                            <i className="fa-solid fa-heart text-pink-400"></i>
                            <span className="font-medium">{likedVideos.length} liked videos</span>
                        </div>
                    </div>

                    {likedVideos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center ">
                            <div className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 shadow-2xl text-center max-w-md">
                                <i className="fa-solid fa-heart-crack text-6xl text-gray-500 mb-6"></i>
                                <h3 className="text-2xl font-bold text-white mb-4">No Liked Videos</h3>
                                <p className="text-gray-400 mb-6">Start liking videos to build your collection of favorites!</p>
                                <button 
                                    onClick={() => window.location.href = '/'}
                                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
                                >
                                    <i className="fa-solid fa-home mr-2"></i>
                                    Discover Videos
                                </button>
                            </div>
                        </div>
                    ) : (
                        <VideosView videoData={likedVideos} onUnlike={handleUnlike} />
                    )}
                </div>
            </div>
        </AuthWrapper>
    );
}

export default UserLikes;
