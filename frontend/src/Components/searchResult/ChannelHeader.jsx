import { useState, useEffect } from "react";
import subscription from "../../backendUtility/subscriptions.utility";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ChannelHeader({ channel }) {
  const user = useSelector((state) => state.user);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  
  // Use useEffect to dynamically update isSubscribed when the channel prop changes
  useEffect(() => {
    // This will re-run whenever the channel prop object changes
    // It correctly sets the initial state for each new channel
    if (channel && channel.isSubscribed !== undefined) {
      setIsSubscribed(channel.isSubscribed);
    }
  }, [channel]);

  const profileHanlder = () => {
    navigate(`/user/${channel.userName}`);
  };

  const handlerSubscribe = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login first");
      return;
    }
    try {
      // FIX: Add 'await' to correctly handle the promise
      const response = await subscription.toggleSubscription(channel._id);
      if (response.statusCode === 200) {
        setIsSubscribed((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div
      onClick={profileHanlder}
      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border-b border-gray-700 pt-20"
    >
      <img
        src={channel.avatar}
        alt={channel.fullName}
        className="w-28 h-28 sm:w-36 sm:h-36 rounded-full  object-cover"
      />
      <div className="flex-1">
        <h1 className="text-xl sm:text-3xl font-bold">{channel.userName}</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          @{channel.fullName} • {channel.SubscribersCount} subscribers
        </p>
      </div>
      <button
        className={`${
          isSubscribed
            ? "bg-white text-black hover:bg-gray-300"
            : "bg-purple-500 text-white hover:bg-purple-600"
        } px-4 py-2 rounded-lg`}
        onClick={handlerSubscribe}
      >
        {isSubscribed ? "Unsubscribe" : "Subscribe"}
      </button>
    </div>
  );
}