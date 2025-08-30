import React, { useEffect, useState } from "react";
import UserVideos from "./UserVideos";
import Playlist from "../PlayList/Playlist.jsx";
import SubscriptionTab from "./SubscriptionTab.jsx";
import TabContent from "./TabContent.jsx";
import EditProfile from "./EditProfile.jsx";
import UserObject from "../../backendUtility/user.utility.js";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import subscriptionsService from "../../backendUtility/subscriptions.utility.js";
import { toast } from "react-toastify";
import videos from "../../backendUtility/videos.utility.js";
import Loading from "../Loading/Loading.jsx";
import useApi from "../../Hooks/useApi.js";

const User = () => {
  const currentUser = useSelector((state) => state.user.userData);
  const { userName } = useParams();

  const { data: user, request: fetchUser, loading: userLoading } = useApi(UserObject.getUserProfile);
  const { data: videoData, request: fetchUserVideos, loading: videoLoading } = useApi(videos.getUserVideos);

  const [currentTab, setCurrentTab] = useState("UserVideos");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  useEffect(() => {
    if (userName) {
      fetchUser(userName);
    }
  }, [userName, fetchUser]);

  useEffect(() => {
    if (user?._id) {
      fetchUserVideos(user._id);
    }
  }, [user?._id, fetchUserVideos]);

  const HandleTabChange = (tabName) => {
    setCurrentTab(tabName);
  };

  const EditProfileButtonHandler = () => {
    setIsEditProfileOpen((prev) => !prev);
  };
  const isSubscribeHandler = async () => {
    try {
      const response = await subscriptionsService.toggleSubscription(user._id);
      if (response.statusCode === 200) {
        toast.success(`You have successfully ${response.message} to this channel`);
      } else {
        toast.error(`${response.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {isEditProfileOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 z-50 flex justify-center items-center py-10 ">
          <EditProfile user={currentUser} onClose={EditProfileButtonHandler} fetchUser={fetchUser}/>
        </div>
      )}

      <div className="w-full h-[18rem] overflow-hidden">
        <img
          src={user?.coverImage || "https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg"}
          alt="Cover"
          className="w-full h-full object-center"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 px-8 -mt-16">
        <img
          src={user?.avatar || "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-black"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{user?.fullName || ""}</h1>
          <p className="font-bold">@{user?.userName || ""}</p>
          <p className="text-sm font-bold mt-1">
            {user?.SubscribersCount} Subscribers • {user?.subsribedToCount} Subscribed
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className={`${
              user?.isSubscribed
                ? "bg-white text-black hover:bg-gray-300"
                : "bg-purple-500 text-white hover:bg-purple-600"
            } px-4 py-2 rounded-lg`}
            onClick={isSubscribeHandler}
          >
            {user?.isSubscribed ? "Subscribe" : "Unsubscribe"}
          </button>
          {currentUser?._id === user?._id && (
            <button
              onClick={EditProfileButtonHandler}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-6 px-8 mt-6 text-gray-400 border-b border-gray-700">
        <button
          className={`${currentTab === "UserVideos" ? "border-b-2 border-purple-500 text-white" : "text-grey-400"} pb-2 hover:text-white`}
          onClick={() => HandleTabChange("UserVideos")}
        >
          Videos
        </button>
        <button
          className={`${currentTab === "Playlist" ? "border-b-2 border-purple-500 text-white" : "text-grey-400"} pb-2 hover:text-white`}
          onClick={() => HandleTabChange("Playlist")}
        >
          Playlist
        </button>
        <button
          className={`${currentTab === "Subscriptions" ? "border-b-2 border-purple-500 text-white" : "text-grey-400"} pb-2 hover:text-white`}
          onClick={() => HandleTabChange("Subscriptions")}
        >
          Subscriptions
        </button>
      </div>

      <TabContent>
        {currentTab === "UserVideos" && <UserVideos videoData={videoData || []} loading={videoLoading} />}
        {currentTab === "Playlist" && <Playlist userId={user?._id} />}
        {currentTab === "Subscriptions" && <SubscriptionTab user={user} />}
      </TabContent>
    </div>
  );
};

export default User;
