import { useEffect, useState } from "react";
import ChannelHeader from "./ChannelHeader";
import VideoCardList from "./VideoCardList";
import User from '../../backendUtility/user.utility'
import { useSearchParams } from "react-router-dom";
import video from '../../backendUtility/videos.utility'
export default function SearchResultPage() {
  const [channel,setChannel]=useState({});
  const [videos,setVideos]=useState([]);
  const [searchParams] = useSearchParams();
    const query = searchParams.get("search_query");
    
  const searchChannel=async()=>{
    try {
  
      const response = await User.getUserProfile(query);
      
      if(response.statusCode===200){
        setChannel(response.data);
        console.log(response.data);
        
      }
    } catch (error) {
      console.log("Errror fetching data",error);
    }
  }

  useEffect(()=>{
    searchChannel()
  },[query]);

  const fetchVideo=async()=>{
    try {
      const response =await video.getUserVideos(channel?._id);
      if(response.statusCode===200){
        setVideos(response.data);
        console.log("Response : ",response.data);
        
      }
    } catch (error) {
      console.log(" Error in fetching videos :  ",error);
    }
  }

  useEffect(()=>{
     if (channel && channel._id) {
    fetchVideo();
  }
  },[channel]);


  if(!channel){
    return (
      <div className="h-screen w-full flex justify-center items-center flex-col gap-y-4 text-white text-xl">
        <img src="https://res.cloudinary.com/dcs7eq5kf/image/upload/v1753995785/person_bkejva.png" className="w-[20%] h-[30%]" />
        <h1>No user Found</h1>
      </div>
    )
  }

  return (
    <div className="text-white md:p-16">
      <ChannelHeader channel={channel} />
      <h2 className="text-base sm:text-xl font-semibold p-4 border-b border-gray-700">
        Latest from {channel.userName}
      </h2>
      <VideoCardList videos={videos} />
    </div>
  );
}
