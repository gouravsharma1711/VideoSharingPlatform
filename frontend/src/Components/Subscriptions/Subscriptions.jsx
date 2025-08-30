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
    <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-700 bg-zinc-800/40 p-4 hover:bg-zinc-800 transition-colors">
      <div className="flex items-center gap-4">
        <img
          src={item.avatar || placeholder}
          alt={item.userName}
          className="w-14 h-14 rounded-full object-cover border border-zinc-700"
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
    <div className="relative max-w-xl w-full mx-auto">
      <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search channels..."
        className="w-full pl-10 pr-10 py-2 rounded-lg bg-zinc-800/40 border border-zinc-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
      />
      {value ? (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
          aria-label="Clear search"
        >
          <i className="fa-solid fa-xmark"></i>
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
          <div className="bg-zinc-800/30 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-zinc-800 max-w-4xl mx-auto shadow-lg">

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
              <div className="max-w-2xl mx-auto rounded-2xl p-12 text-center">
                <div className="mx-auto mb-4 h-12 w-12 grid place-items-center rounded-full bg-zinc-900 border border-zinc-700">
                  <i className="fa-regular fa-circle-user text-xl text-purple-300"></i>
                </div>
                <h3 className="text-xl font-semibold">
                  {searchTerm ? "No matches found" : "No subscriptions yet"}
                </h3>
                <p className="mt-2 text-gray-400">
                  {searchTerm
                    ? "Try a different search term."
                    : "Follow channels to see them here."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default Subscriptions;