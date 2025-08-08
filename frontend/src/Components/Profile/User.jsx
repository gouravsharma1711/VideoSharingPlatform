import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// Component Imports
import UserVideos from "./UserVideos";
import Playlist from "../PlayList/Playlist.jsx";
import SubscriptionTab from "./SubscriptionTab.jsx";
import TabContent from "./TabContent.jsx";
import EditProfile from "./EditProfile.jsx";
import Loading from "../Loading/Loading.jsx";

// API Service Imports
import UserObject from "../../backendUtility/user.utility.js";
import subscriptionsService from "../../backendUtility/subscriptions.utility.js";
import videos from "../../backendUtility/videos.utility.js";

const User = () => {
  // State for the profile being viewed and their videos
  const [user, setUser] = useState(null);
  const [videoData, setVideoData] = useState([]);
  
  // UI and loading states
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("UserVideos");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Get the logged-in user from Redux and the username from the URL
  const currentUser = useSelector((state) => state.user.userData);
  const { userName } = useParams();

  // --- Main Data Fetching Effect ---
  // This single effect handles fetching all data for the page
  // and correctly re-runs whenever the `userName` in the URL changes.
  useEffect(() => {
    const loadPageData = async () => {
      if (!userName) return; // Exit if userName is not available

      setLoading(true);
      try {
        // Step 1: Fetch the user profile
        const userResponse = await UserObject.getUserProfile(userName);

        if (userResponse?.data) {
          const fetchedUser = userResponse.data;
          setUser(fetchedUser);

          // Step 2: Immediately fetch that user's videos
          const videoResponse = await videos.getUserVideos(fetchedUser._id);
          setVideoData(videoResponse?.data || []);
        } else {
          // Handle case where user is not found
          toast.error(userResponse?.message || "User not found.");
          setUser(null);
          setVideoData([]);
        }
      } catch (error) {
        console.error("Failed to load page data:", error);
        toast.error("Something went wrong while loading the profile.");
        setUser(null);
        setVideoData([]);
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, [userName]); // The ONLY dependency needed!

  // --- Event Handlers ---
  const handleSubscribe = async () => {
    if (!user?._id) return;
    try {
      const response = await subscriptionsService.toggleSubscription(user._id);
      if (response.statusCode === 200) {
        // Update local state for instant UI feedback
        setUser((prev) => ({
          ...prev,
          isSubscribed: !prev.isSubscribed,
          SubscribersCount: prev.isSubscribed
            ? prev.SubscribersCount - 1
            : prev.SubscribersCount + 1,
        }));
        toast.success(`Successfully ${response.message}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Something went wrong.");
    }
  };

  const handleTabChange = (tabName) => setCurrentTab(tabName);
  const toggleEditProfileModal = () => setIsEditProfileOpen((prev) => !prev);

  // --- Render Logic ---
  // Show a loading spinner while fetching initial data
  if (loading) {
    return <Loading />;
  }

  // Show a "not found" message if the user couldn't be loaded
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-2xl">
        User not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {isEditProfileOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 z-50 flex justify-center items-center py-10">
          <EditProfile user={currentUser} onClose={toggleEditProfileModal} />
        </div>
      )}

      {/* Cover Image */}
      <div className="w-full h-[15rem] overflow-hidden bg-gray-800">
        {user.coverImage && <img src={user.coverImage} alt="Cover" className="w-full h-full object-cover" />}
      </div>

      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 px-8 -mt-16">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-black bg-gray-700"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold">{user.fullName}</h1>
          <p className="text-gray-400">@{user.userName}</p>
          <p className="text-sm text-gray-400 mt-1">
            {user.SubscribersCount} Subscribers • {user.subsribedToCount} Subscribed
          </p>
        </div>

        {currentUser?._id === user._id ? (
          <button onClick={toggleEditProfileModal} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSubscribe}
            className={`${user.isSubscribed ? 'bg-gray-700 hover:bg-gray-600' : 'bg-purple-500 hover:bg-purple-600'} text-white px-4 py-2 rounded-lg`}
          >
            {user.isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-6 px-8 mt-6 text-gray-400 border-b border-gray-700">
        <button onClick={() => handleTabChange("UserVideos")} className={`${currentTab === "UserVideos" ? "border-b-2 border-purple-500 text-white" : ""} pb-2 hover:text-white`}>
          Videos
        </button>
        <button onClick={() => handleTabChange("Playlist")} className={`${currentTab === "Playlist" ? "border-b-2 border-purple-500 text-white" : ""} pb-2 hover:text-white`}>
          Playlist
        </button>
        <button onClick={() => handleTabChange("Subscriptions")} className={`${currentTab === "Subscriptions" ? "border-b-2 border-purple-500 text-white" : ""} pb-2 hover:text-white`}>
          Subscriptions
        </button>
      </div>

      {/* Tab Content */}
      <TabContent>
        {currentTab === "UserVideos" && <UserVideos videoData={videoData} />}
        {currentTab === "Playlist" && <Playlist userId={user._id} />}
        {currentTab === "Subscriptions" && <SubscriptionTab user={user} />}
      </TabContent>
    </div>
  );
};

export default User;