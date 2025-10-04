import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi.js";
import subscriptionsService from "../../backendUtility/subscriptions.utility.js";
import AuthWrapper from "../Auth/AuthWrapper.jsx";
import Loading from "../Loading/Loading.jsx";

/**
 * Presentational Card for a single subscription
 */
function SubscriptionCard({ item, onUnsubscribe, unsubscribing }) {
  const placeholder =
    `https://via.placeholder.com/64x64/3f3f46/d4d4d8?text=${item.userName?.charAt(0) || "U"}`;

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-600 bg-slate-800 p-4 hover:bg-slate-700 transition-colors">
      <div className="flex items-center gap-4">
        <img
          src={item.avatar || placeholder}
          alt={item.userName}
          className="w-14 h-14 rounded-full object-cover border border-slate-600"
        />
        <div>
          <h3 className="text-white font-semibold">{item.userName || "Unknown User"}</h3>
          <p className="text-sm text-gray-400">
            {item.subscribersCount || 0} subscribers
          </p>
        </div>
      </div>

      <button
        onClick={() => onUnsubscribe(item._id, item.userName)}
        disabled={unsubscribing}
        className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:opacity-70"
      >
        {unsubscribing ? "Unsubscribing..." : "Unsubscribe"}
      </button>
    </div>
  );
}

/**
 * Simple search input
 */
function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <i className="fa-solid fa-search text-gray-400"></i>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search subscriptions..."
        className="w-full bg-slate-800 text-white placeholder-gray-400 border border-slate-600 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {value ? (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
        >
          <i className="fa-solid fa-times"></i>
        </button>
      ) : null}
    </div>
  );
}

function Subscriptions() {
  // Store
  const user = useSelector((state) => state.user.userData);
  const userId = user?._id;

  // API hooks
  const {
    data: subscriptions,
    loading,
    error,
    request: fetchSubscriptions,
  } = useApi(subscriptionsService.getSubscribedChannels);

  const {
    loading: unsubscribeLoading,
    request: unsubscribeRequest,
  } = useApi(subscriptionsService.toggleSubscription);

  // Local state
  const [searchTerm, setSearchTerm] = useState("");

  // Effects
  useEffect(() => {
    if (userId) fetchSubscriptions(userId);
  }, [userId, fetchSubscriptions]);

  // Handlers
  const handleUnsubscribe = async (channelId) => {
    await unsubscribeRequest(channelId);
    fetchSubscriptions(userId);
  };

  // Derived
  const list = Array.isArray(subscriptions) ? subscriptions : [];
  const filtered = list.filter((s) =>
    s.userName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading
  if (loading) {
    return <Loading size={25} msg="User Subscription Data is Loading..." />;
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen text-white pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Subscriptions</h1>
            <p className="text-gray-400 mt-2">
              Manage the channels you follow.
            </p>
          </header>

          {/* Combined Search and Content Block */}
          <div className="max-w-4xl mx-auto">

            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                onClear={() => setSearchTerm("")}
              />
              {searchTerm ? (
                <div className="mt-3 text-center text-sm text-gray-400">
                  Found {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{searchTerm}"
                </div>
              ) : null}
            </div>

            {/* Error Message */}
            {error ? (
              <div className="max-w-2xl mx-auto mb-6 rounded-lg border border-red-700 bg-red-900/30 px-4 py-3 text-sm text-red-300">
                Something went wrong while fetching subscriptions. Please try again.
              </div>
            ) : null}
            
            {/* Content List */}
            {filtered.length > 0 ? (
              <div className="space-y-4">
                {filtered.map((item) => (
                  <SubscriptionCard
                    key={item._id}
                    item={item}
                    onUnsubscribe={handleUnsubscribe}
                    unsubscribing={unsubscribeLoading}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <i className="fa-solid fa-users text-6xl text-gray-600 mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">
                    {searchTerm ? 'No matching subscriptions' : 'No subscriptions yet'}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm
                      ? `No subscriptions found for "${searchTerm}"`
                      : 'Subscribe to creators to see them here'
                    }
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default Subscriptions;