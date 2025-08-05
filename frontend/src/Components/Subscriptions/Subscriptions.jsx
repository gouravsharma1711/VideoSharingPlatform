import { useSelector } from "react-redux";
import Auth from "../Auth/Auth.jsx";
import { useState, useEffect } from 'react';
import subscriptionsService from '../../backendUtility/subscriptions.utility.js';
import { toast } from "react-toastify";

function Subscriptions() {
    const user = useSelector((state) => state.user.userData);
    const [subscriptionData, setSubscriptionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'compact'

    const userId = user?._id;

    const fetchingUserSubscriptions = async () => {
        try {
            setLoading(true);
            const response = await subscriptionsService.getSubscribedChannels(userId);
            
            if (response?.statusCode === 200 && response.data?.length > 0) {
                setSubscriptionData(response.data);
            } else {
                setSubscriptionData([]);
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
            setSubscriptionData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleUnsubscribe = async (channelId, channelName) => {
        try {
            const response = await subscriptionsService.toggleSubscription(channelId);
            if (response.statusCode === 200) {
                setSubscriptionData(prev => prev.filter(sub => sub._id !== channelId));
                toast.success(`Successfully unsubscribed from ${channelName}`);
            } else {
                toast.error('Failed to unsubscribe');
            }
        } catch (error) {
            toast.error('Error unsubscribing');
            console.error('Unsubscribe error:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchingUserSubscriptions();
        }
    }, [userId]);

    if (!userId) {
        return <Auth />;
    }

    const filteredSubscriptions = subscriptionData.filter(sub =>
        sub.userName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-full mb-8 shadow-2xl">
                        <i className="fa-solid fa-star text-4xl text-white animate-pulse"></i>
                    </div>
                    <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-6 tracking-tight">
                        My Universe
                    </h1>
                    <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
                        Your personal constellation of amazing creators and channels
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-gray-200 font-medium">{subscriptionData.length} Active</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <i className="fa-solid fa-heart text-pink-400"></i>
                            <span className="text-gray-200 font-medium">Subscriptions</span>
                        </div>
                    </div>
                </div>

                {/* Control Dashboard */}
                <div className="max-w-7xl mx-auto mb-12">
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 lg:p-8 shadow-2xl">
                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                            {/* Search Section */}
                            <div className="flex-1 max-w-2xl">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                                        <i className="fa-solid fa-search text-purple-400 text-xl"></i>
                                    </div>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search your favorite creators..."
                                        className="w-full bg-black/30 text-white placeholder-gray-300 border border-white/20 rounded-2xl py-4 lg:py-5 pl-16 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-lg backdrop-blur-sm"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm('')}
                                            className="absolute inset-y-0 right-0 flex items-center pr-6 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <i className="fa-solid fa-times text-xl"></i>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* View Controls */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 bg-black/30 rounded-2xl p-2 backdrop-blur-sm">
                                    <button
                                        onClick={() => setViewMode('cards')}
                                        className={`px-4 lg:px-6 py-2 lg:py-3 rounded-xl transition-all duration-300 font-medium ${
                                            viewMode === 'cards'
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                                : 'text-gray-300 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <i className="fa-solid fa-th-large mr-2"></i>
                                        Cards
                                    </button>
                                    <button
                                        onClick={() => setViewMode('compact')}
                                        className={`px-4 lg:px-6 py-2 lg:py-3 rounded-xl transition-all duration-300 font-medium ${
                                            viewMode === 'compact'
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                                : 'text-gray-300 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <i className="fa-solid fa-list mr-2"></i>
                                        Compact
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Search Results Info */}
                        {searchTerm && (
                            <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
                                <div className="flex items-center gap-3 text-purple-200">
                                    <i className="fa-solid fa-filter text-lg"></i>
                                    <span className="font-medium">
                                        Found {filteredSubscriptions.length} result{filteredSubscriptions.length !== 1 ? 's' : ''} for "{searchTerm}"
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-16 text-center shadow-2xl">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-8">
                                    <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 w-20 h-20 border-4 border-pink-500/30 border-b-pink-500 rounded-full animate-spin" style={{animationDelay: '1s'}}></div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Loading Your Universe</h3>
                                <p className="text-gray-300">Gathering your favorite creators...</p>
                            </div>
                        </div>
                    ) : filteredSubscriptions.length > 0 ? (
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 lg:p-8 shadow-2xl">
                            {viewMode === 'cards' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                                    {filteredSubscriptions.map((subscription) => (
                                        <div key={subscription._id} className="group">
                                            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:from-white/20 hover:to-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                                <div className="flex flex-col items-center text-center">
                                                    <div className="relative mb-4">
                                                        <img
                                                            src={subscription.avatar || 'https://via.placeholder.com/80x80/6366f1/ffffff?text=' + (subscription.userName?.charAt(0) || 'U')}
                                                            alt={subscription.userName}
                                                            className="w-20 h-20 rounded-full object-cover border-4 border-white/20 group-hover:border-purple-400/50 transition-all duration-300"
                                                        />
                                                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                                                        {subscription.userName || 'Unknown User'}
                                                    </h3>
                                                    <p className="text-gray-300 mb-4">
                                                        {subscription.subscribersCount || '0'} subscribers
                                                    </p>
                                                    <button
                                                        onClick={() => handleUnsubscribe(subscription._id, subscription.userName)}
                                                        className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                                    >
                                                        <i className="fa-solid fa-user-minus mr-2"></i>
                                                        Unsubscribe
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredSubscriptions.map((subscription) => (
                                        <div key={subscription._id} className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:from-white/20 hover:to-white/10 transition-all duration-300">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <img
                                                            src={subscription.avatar || 'https://via.placeholder.com/64x64/6366f1/ffffff?text=' + (subscription.userName?.charAt(0) || 'U')}
                                                            alt={subscription.userName}
                                                            className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                                                        />
                                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white mb-1">
                                                            {subscription.userName || 'Unknown User'}
                                                        </h3>
                                                        <p className="text-gray-300">
                                                            {subscription.subscribersCount || '0'} subscribers
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleUnsubscribe(subscription._id, subscription.userName)}
                                                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl self-start sm:self-center"
                                                >
                                                    <i className="fa-solid fa-user-minus mr-2"></i>
                                                    Unsubscribe
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-16 text-center shadow-2xl">
                            <div className="max-w-lg mx-auto">
                                <div className="w-32 h-32 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <i className="fa-solid fa-star text-6xl text-gray-400"></i>
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                    {searchTerm ? 'No Matches Found' : 'Your Universe Awaits'}
                                </h3>
                                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-8">
                                    {searchTerm 
                                        ? `No subscriptions match "${searchTerm}". Try a different search term.`
                                        : 'Start building your personal constellation by subscribing to amazing creators!'
                                    }
                                </p>
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-2xl text-lg"
                                    >
                                        <i className="fa-solid fa-arrow-left"></i>
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Stats */}
                {!loading && filteredSubscriptions.length > 0 && (
                    <div className="max-w-7xl mx-auto mt-12">
                        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-2xl border border-white/20 p-6 lg:p-8 shadow-2xl">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8 text-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-white font-semibold text-lg">
                                        {filteredSubscriptions.length} Active Connection{filteredSubscriptions.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div className="hidden md:block w-px h-8 bg-white/20"></div>
                                <div className="flex items-center gap-4">
                                    <i className="fa-solid fa-infinity text-purple-400 text-xl"></i>
                                    <span className="text-white font-semibold text-lg">
                                        Endless Possibilities
                                    </span>
                                </div>
                                <div className="hidden md:block w-px h-8 bg-white/20"></div>
                                <div className="flex items-center gap-4">
                                    <i className="fa-solid fa-heart text-pink-400 text-xl"></i>
                                    <span className="text-white font-semibold text-lg">
                                        Stay Connected
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}

export default Subscriptions;
