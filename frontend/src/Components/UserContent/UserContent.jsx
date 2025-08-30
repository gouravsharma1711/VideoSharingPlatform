import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import VideosView from '../Home/VideosView.jsx';
import AuthWrapper from '../Auth/AuthWrapper.jsx';
import Loading from '../Loading/Loading.jsx';
import useApi from '../../Hooks/useApi.js';
import videos from '../../backendUtility/videos.utility.js';

function UserContent() {
    const userData = useSelector((state) => state.user.userData);
    const [userVideos, setUserVideos] = useState([]);

    const { data, loading, error, request } = useApi(videos.getCurrentUserVideos);

    const fetchUserVideos = useCallback(async () => {
        const response = await request();
        if (response && response.data) {
            setUserVideos(response.data);
        }
    }, [request]);

    useEffect(() => {
        if (userData?._id) {
            fetchUserVideos();
        }
    }, [userData?._id, fetchUserVideos]);

    if (!userData) {
        return (
            <AuthWrapper fallbackMessage="Please sign in to view your uploaded content" />
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
                <Loading size={50} msg="Fetching your content..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center pt-20">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl text-center">
                        <i className="fa-solid fa-exclamation-triangle text-5xl text-red-400 mb-4"></i>
                        <h2 className="text-xl font-bold text-white mb-2">Error Loading Content</h2>
                        <p className="text-gray-400 mb-6">{error.message || "Something went wrong"}</p>
                        <button
                            onClick={fetchUserVideos}
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
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black pt-20">
                <div className="container mx-auto px-6 py-8">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            <i className="fa-solid fa-video mr-3 text-blue-400"></i>
                            My Content
                        </h1>
                        <p className="text-gray-400 text-lg mb-4">Manage and view all your uploaded videos</p>
                    </div>

                    {userVideos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 shadow-2xl text-center max-w-md">
                                <i className="fa-solid fa-video-slash text-6xl text-gray-500 mb-6"></i>
                                <h3 className="text-2xl font-bold text-white mb-4">No Content Yet</h3>
                                <p className="text-gray-400 mb-6">You haven't uploaded any videos yet. Start creating and sharing your content!</p>
                                <button 
                                    onClick={() => window.location.href = '/'}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
                                >
                                    <i className="fa-solid fa-plus mr-2"></i>
                                    Upload Your First Video
                                </button>
                            </div>
                        </div>
                    ) : (
                        <VideosView videoData={userVideos} />
                    )}
                </div>
            </div>
        </AuthWrapper>
    );
}

export default UserContent;
