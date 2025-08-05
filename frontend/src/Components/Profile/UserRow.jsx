import { toast } from "react-toastify";
import subscriptionsService from "../../backendUtility/subscriptions.utility";

const UserRow = ({ user = {}, subscriptionData, setSubscriptionData, isGridView = false }) => {
  const { _id, userName, avatar, subscribersCount } = user;

  const HandleUnSubscribe = async () => {
    try {
      const response = await subscriptionsService.toggleSubscription(_id);
      
      if (response.statusCode === 200) {
        toast.success(`Successfully unsubscribed from ${userName}`);
        const updatedList = subscriptionData.filter((u) => u._id !== user._id);
        setSubscriptionData(updatedList);
      } else {
        toast.error(`Error unsubscribing from ${userName}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isGridView) {
    return (
      <div className="group">
        <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm rounded-2xl border border-gray-600/30 p-6 hover:from-slate-600/50 hover:to-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-purple-500/30">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                src={avatar || `https://via.placeholder.com/80x80/6366f1/ffffff?text=${userName?.charAt(0) || 'U'}`}
                alt={`${userName}'s avatar`}
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-600/50 group-hover:border-purple-400/70 transition-all duration-300 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
              {userName || 'Unknown User'}
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              {subscribersCount || '0'} subscribers
            </p>
            <button
              onClick={HandleUnSubscribe}
              className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <i className="fa-solid fa-user-minus mr-2"></i>
              Unsubscribe
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-700/30 to-slate-800/30 hover:from-slate-600/40 hover:to-slate-700/40 backdrop-blur-sm rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-600/30 hover:border-purple-500/30 group">
      {/* Avatar & Info */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={avatar || `https://via.placeholder.com/64x64/6366f1/ffffff?text=${userName?.charAt(0) || 'U'}`}
            alt={`${userName}'s avatar`}
            className="w-16 h-16 rounded-full object-cover border-3 border-gray-600/50 group-hover:border-purple-400/70 transition-all duration-300 shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
            {userName || 'Unknown User'}
          </h3>
          <p className="text-gray-400">
            {subscribersCount || '0'} subscribers
          </p>
        </div>
      </div>

      {/* Unsubscribe Button */}
      <button
        onClick={HandleUnSubscribe}
        className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/50"
      >
        <i className="fa-solid fa-user-minus mr-2"></i>
        Unsubscribe
      </button>
    </div>
  );
};

export default UserRow;
