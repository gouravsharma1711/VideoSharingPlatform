import { useState } from 'react';
import subscription from '../../backendUtility/subscriptions.utility'
import {useSelector} from 'react-redux'
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
export default function ChannelHeader({ channel }) {
  const user=useSelector((state)=>state.user.userData);
  const [isSubscribed,setIsSubscribed]=useState(false);
  const navigate=useNavigate();
  const profileHanlder=()=>{
    navigate(`/user/${channel.userName}`)
  }
  const handlerSubscribe=async()=>{
    if(!user){
      toast.error("Please login first");
      return;
    }
    try {
      const response=subscription.toggleSubscription(channel._id);
      if(response.statusCode===200){
        setIsSubscribed((prev)=>!prev)
      }
      // if(response.)
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <div onClick={profileHanlder} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border-b border-gray-700">
      <img
        src={channel.avatar}
        alt={channel.fullName}
        className="w-28 h-28 sm:w-36 sm:h-36 rounded-full  object-cover"
      />
      <div className="flex-1">
        <h1 className="text-xl sm:text-3xl font-bold">{channel.userName}</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          @{channel.fullName} • {channel.SubscribersCount} subscribers
        </p>
      </div>
      <button
        onClick={handlerSubscribe}
       className="bg-white text-black px-4 py-2 text-sm sm:text-base rounded-full font-semibold hover:bg-gray-200 transition">
        Subscribe
      </button>
    </div>
  );
}
