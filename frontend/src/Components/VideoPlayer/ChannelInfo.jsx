import { useEffect, useState } from "react";
import Subscription from '../../backendUtility/subscriptions.utility';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChannelInfo = ({ channelData }) => {
  const [subscriberCount,setSubscriberCount]=useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [prevIsFollowing,setPrevIsFollowing]=useState(isFollowing);

  
  const user=useSelector((state) => state.user.userData);
  

  useEffect(()=>{

    const checkSubscriptionStatus=async()=>{
      try{
        const response=await Subscription.getUserChannelSubscribers(channelData._id);
        response.data.map((data)=>{
          if(data._id===user?._id){
            setIsFollowing(prev=>!prev);
            setPrevIsFollowing(prev=>!prev)
          }
        })
      }
      catch(err){
        console.error(err)
      };
    }
    if(channelData){
      setSubscriberCount(channelData.subscribersCount);
    }
    if(channelData && user){
      checkSubscriptionStatus()
    }
    
  },[user,channelData])


  const subscribeHandler=async()=>{
    if(!user){
      toast.info("Please login first");
      return;
    }
    try {
      const response = await Subscription.toggleSubscription(channelData._id);
      setIsFollowing(prev=>!prev);
      setPrevIsFollowing(prev=>{
        if(prev==false){
          setSubscriberCount(prev=>prev+1);
        }else{
          setSubscriberCount(prev=>prev-1);
        }
        return !prev
      });
      
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
      return;
    }
  }
  const navigate=useNavigate();
  const navigateHandler=()=>{
    navigate(`/user/${channelData?.userName}`)
  }

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Avatar */}
        <img
          onClick={navigateHandler}
          src={channelData?.avatar}
          alt={channelData?.userName}
          className="w-12 h-12 rounded-full border-2 border-slate-600 hover:border-blue-500 transition-all duration-300 cursor-pointer hover:scale-105"
        />

        {/* Name + Subscribers */}
        <div
          onClick={navigateHandler}
          className="truncate cursor-pointer">
          <h3 className="font-bold text-slate-100 text-base hover:text-blue-400 transition-colors duration-300 truncate">
            {channelData?.userName}
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <i className="fa-solid fa-users text-slate-500"></i>
            <span>{subscriberCount} subscribers</span>
          </div>
        </div>
      </div>

      {/* Right: Subscribe Button */}
      <button
        onClick={subscribeHandler}
        className={`px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 ${
          prevIsFollowing
            ? "bg-slate-100 text-slate-900 hover:bg-slate-200"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <span className="flex items-center gap-2">
          <i className={`fa-solid ${isFollowing ? "fa-check" : "fa-plus"}`}></i>
          {isFollowing ? "Subscribed" : "Subscribe"}
        </span>
      </button>
    </div>
  );
};

export default ChannelInfo;
