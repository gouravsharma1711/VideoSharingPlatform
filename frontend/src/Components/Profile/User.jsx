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

const User = () => {
  const [loading,setLoading]=useState(false);
  const currentUser = useSelector((state) => state.user.userData);
   // logged In user
  const { userName } = useParams(); 
  const [videoData,setVideoData]=useState([]);

  const findVideoData=async()=>{
    try {
      setLoading(true);
      
      const response=await videos.getUserVideos(user._id);
      
      if(response.statusCode===200){
        setVideoData(response.data);
      }else{
        toast.error(`${response.message}`)
      }
    } catch (error) {
       console.log(error);
       toast.error('Something went wrong');
    }finally{
      setLoading(false);
    }
  }

  const fetchUser = async () => {
      try {
        setLoading(true);
        const currUser = await UserObject.getUserProfile(userName);

       if ( currUser && currUser.data!==null && currUser?.statusCode === 200 ){
          setUser(currUser.data);
        } else {
          setUser({});

        }
      } catch (error) {
        console.log(error.message);
        setUser({});
      }finally{
        setLoading(false);
      }
    };

  const [user, setUser] = useState({});// Profile user

  useEffect(() => {
  fetchUser();
}, [userName]);

useEffect(() => {
  if (user._id) {
    findVideoData();
  }
}, [user._id]);
  
  const [currentTab, setCurrentTab] = useState("UserVideos");

  const HandleTabChange = (tabName) => {
    setCurrentTab(tabName);
  };

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const EditProfileButtonHandler = (e) => {
    console.log(e.target.value);
    setIsEditProfileOpen((prev) => !prev);
  };

  const isSubscribeHandler=async()=>{
    try {
      const response=await subscriptionsService.toggleSubscription(user._id);
      if(response.statusCode===200){
        setUser(prev=>({...prev,isSubscribed:!prev.isSubscribed}));
        toast.success(`You have successfully ${response.message} to this channel`);
      }else{
        toast.error(`${response.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
      
    }
  }


  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Tabs */}
      <div className="flex gap-6 px-8 mt-6 text-gray-400 border-b border-gray-700">
        <button
          className={`${
            currentTab === "UserVideos"
              ? "border-b-2 border-purple-500 text-white"
              : "text-grey-400"
          } pb-2 hover:text-white`}
          onClick={() => HandleTabChange("UserVideos")}
        >
          Videos
        </button>

        <button
          className={`${
            currentTab === "Playlist"
              ? "border-b-2 border-purple-500 text-white"
              : "text-grey-400"
          } pb-2 hover:text-white`}
          onClick={() => HandleTabChange("Playlist")}
        >
          Playlist
        </button>

        <button
          className={`${
            currentTab === "Subscriptions"
              ? "border-b-2 border-purple-500 text-white"
              : "text-grey-400"
          } pb-2 hover:text-white`}
          onClick={() => HandleTabChange("Subscriptions")}
        >
          Subscriptions
        </button>
      </div>
      {/* Video Grid */}
      <TabContent>
        {currentTab === "UserVideos" && <UserVideos videoData={videoData}/>}
        {currentTab === "Playlist" && <Playlist userId={user._id}/>}
        {currentTab === "Subscriptions" && <SubscriptionTab user={user}/>}
      </TabContent>
    </div>
  );
};

export default User;
