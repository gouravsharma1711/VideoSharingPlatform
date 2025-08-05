import { useState, useEffect } from "react";
import UserRow from "./UserRow.jsx";

function Subscriptions({ subscriptionData = [], setSubscriptionData }) {
  const [data, setData] = useState(subscriptionData);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setData(subscriptionData);
    } else {
      const filtered = subscriptionData.filter((user) =>
        user.userName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filtered);
    }
  }, [searchTerm, subscriptionData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full mb-6 shadow-2xl">
            <i className="fa-solid fa-heart text-3xl text-white"></i>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            My Subscriptions
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Your curated collection of amazing creators and channels you love
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400 font-medium">{subscriptionData.length} Active Subscriptions</span>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <i className="fa-solid fa-magnifying-glass text-purple-400 text-lg"></i>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search your favorite creators..."
                  className="w-full bg-slate-900/70 text-white placeholder-gray-400 border border-gray-600/50 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white transition-colors"
                  >
                    <i className="fa-solid fa-times"></i>
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-slate-900/50 rounded-2xl p-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <i className="fa-solid fa-grid-2 mr-2"></i>
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <i className="fa-solid fa-list mr-2"></i>
                  List
                </button>
              </div>
            </div>

            {/* Filter Results Info */}
            {searchTerm && (
              <div className="mt-4 p-3 bg-purple-900/20 border border-purple-500/30 rounded-xl">
                <div className="flex items-center gap-2 text-purple-300">
                  <i className="fa-solid fa-filter"></i>
                  <span>
                    Found {data.length} result{data.length !== 1 ? 's' : ''} for "{searchTerm}"
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {data.length > 0 ? (
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {data.map((user) => (
                    <div key={user._id} className="transform hover:scale-105 transition-all duration-300">
                      <UserRow 
                        user={user} 
                        subscriptionData={subscriptionData} 
                        setSubscriptionData={setSubscriptionData}
                        isGridView={true}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {data.map((user) => (
                    <UserRow 
                      key={user._id} 
                      user={user} 
                      subscriptionData={subscriptionData} 
                      setSubscriptionData={setSubscriptionData}
                      isGridView={false}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-16 text-center shadow-2xl">
              <div className="max-w-md mx-auto">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <i className="fa-solid fa-user-slash text-5xl text-gray-400"></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-200 mb-4">
                  {searchTerm ? 'No Matching Subscriptions' : 'No Subscriptions Yet'}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {searchTerm 
                    ? `We couldn't find any subscriptions matching "${searchTerm}". Try adjusting your search terms.`
                    : 'Start your journey by subscribing to amazing creators and channels you love!'
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {data.length > 0 && (
          <div className="max-w-6xl mx-auto mt-8">
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
              <div className="flex items-center justify-center gap-8 text-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 font-medium">
                    {data.length} Subscription{data.length !== 1 ? 's' : ''} Displayed
                  </span>
                </div>
                <div className="w-px h-6 bg-gray-600"></div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-heart text-pink-400"></i>
                  <span className="text-gray-300 font-medium">
                    Stay Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Subscriptions;
