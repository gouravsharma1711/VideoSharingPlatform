import VideosView from '../Home/VideosView.jsx'
import user from '../../backendUtility/user.utility.js'
import { useEffect, useState, useCallback } from 'react'
import LoadingSpinner from '../dashBoard/LoadingSpinner.jsx'
import {toast} from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import {toggleisHistoryStatus} from '../../Features/WatchHistory/history.slice.js'
import AuthWrapper from '../Auth/AuthWrapper.jsx';
import Loading from '../Loading/Loading.jsx';
function WatchHistory() {
    const [userHistory, setUserHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [clearingHistory, setClearingHistory] = useState(false);
    const userData = useSelector((state) => state.user.userData);


    const fetchHistory = useCallback(async () => {
        if (!userData) return;
        
        try {
            setLoading(true);
            setError(null);
            const response = await user.getWatchHistory();
            if (response.statusCode === 200) {
                setUserHistory(response.data || []);
            } else {
                const errorMessage = response.message || "Failed to fetch watch history";
                setError(errorMessage);
                toast.error(errorMessage);
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message || "An error occurred while fetching history";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [userData]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const handleClearAllHistoryClick = async () => {
        if (!window.confirm("Are you sure you want to clear all your watch history? This action cannot be undone.")) {
            return;
        }
        
        try {
            setClearingHistory(true);
            const response = await user.clearHisory();
            if (response.statusCode === 200) {
                setUserHistory([]);
                toast.success("Watch history cleared successfully");
            } else {
                toast.error(response.message || "Failed to clear watch history");
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message || "An error occurred while clearing history";
            toast.error(errorMessage);
        } finally {
            setClearingHistory(false);
        }
    };

    const handleRetry = () => {
        setError(null);
        fetchHistory();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
                <Loading size={50} msg="Loading your watch history..." />
            </div>
        );
    }

    if (error) {
        return (
            <AuthWrapper fallbackMessage="Please sign in to view your watch history">
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
                    <div className="max-w-md w-full mx-4">
                        <div className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl text-center">
                            <i className="fa-solid fa-exclamation-triangle text-5xl text-red-400 mb-4"></i>
                            <h2 className="text-xl font-bold text-white mb-2">Error Loading History</h2>
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
            </AuthWrapper>
        );
    }

    return (
        <AuthWrapper fallbackMessage="Please sign in to view your watch history">
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
                <div className="container mx-auto px-6 py-8">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                <i className="fa-solid fa-clock-rotate-left mr-3 text-purple-400"></i>
                                Watch History
                            </h1>
                            <button
                                onClick={handleRetry}
                                className="bg-slate-700/50 hover:bg-slate-600/50 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-600/50"
                                title="Refresh history"
                            >
                                <i className="fa-solid fa-refresh"></i>
                            </button>
                        </div>
                        <p className="text-gray-400 text-lg mb-4">Keep track of all the videos you've watched</p>
                        
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 text-gray-400 bg-slate-800/50 px-4 py-2 rounded-lg">
                                <i className="fa-solid fa-video text-purple-400"></i>
                                <span className="font-medium">{userHistory.length} videos in history</span>
                            </div>
                            <button
                                className={`bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${clearingHistory ? 'animate-pulse' : ''}`}
                                onClick={handleClearAllHistoryClick}
                                disabled={clearingHistory || userHistory.length === 0}
                            >
                                <i className={`fa-solid ${clearingHistory ? 'fa-spinner fa-spin' : 'fa-trash'} mr-2`}></i>
                                {clearingHistory ? 'Clearing...' : 'Clear All History'}
                            </button>
                        </div>
                    </div>

                    {userHistory.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 shadow-2xl text-center max-w-md">
                                <i className="fa-solid fa-clock-rotate-left text-6xl text-gray-500 mb-6"></i>
                                <h3 className="text-2xl font-bold text-white mb-4">No History Yet</h3>
                                <p className="text-gray-400 mb-6">Start watching videos to build your watch history!</p>
                                <button 
                                    onClick={() => window.location.href = '/'}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
                                >
                                    <i className="fa-solid fa-home mr-2"></i>
                                    Explore Videos
                                </button>
                            </div>
                        </div>
                    ) : (
                        <VideosView videoData={userHistory} />
                    )}
                </div>
            </div>
        </AuthWrapper>
    );
}

export default WatchHistory
