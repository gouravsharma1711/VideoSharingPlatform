import { useState, useEffect } from "react";
import UserRow from "./UserRow.jsx";

function Subscriptions({ subscriptionData = [], setSubscriptionData }) {
  const [data, setData] = useState(subscriptionData);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            My Subscriptions
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Manage your favorite creators and channels
          </p>
          <div className="text-sm text-gray-500 mt-2">
            {subscriptionData.length} subscription{subscriptionData.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Controls */}
        <div className="max-w-6xl mx-auto mb-6">
          <div className="flex justify-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <i className="fa-solid fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search subscriptions..."
                className="w-full bg-slate-800 text-white placeholder-gray-400 border border-slate-600 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              )}
            </div>
          </div>

          {/* Search Results Info */}
          {searchTerm && (
            <div className="mt-3 text-sm text-gray-400">
              Found {data.length} result{data.length !== 1 ? 's' : ''} for "{searchTerm}"
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {data.length > 0 ? (
            <div className="space-y-3">
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
  );
}

export default Subscriptions;
