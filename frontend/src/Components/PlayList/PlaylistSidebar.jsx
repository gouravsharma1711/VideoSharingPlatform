import { Link } from 'react-router-dom';
import PlaylistVideoCard from './PlaylistVideoCard';
import { useNavigate } from 'react-router-dom';
import User from '../../backendUtility/user.utility'
import Videos from '../../backendUtility/videos.utility';
export default function PlaylistSidebar({ videos }) {
  const navigate=useNavigate();

  const addViews=async(videoId)=>{
    try {
        const response= await Videos.getSingleView(videoId);
        if(response.statusCode!=200){
          throw new Error('error in adding view')
        }
      } catch (error) {
        console.log("Error from adding views: ",error);
      }
  }
  const addToWatchHistory=async(videoId)=>{
    try {
      const response= await User.addToWatchHistory(videoId);
      if(response.statusCode!=200){
          throw new Error('error in adding video in watch history')
        }
    } catch (error) {
      console.log("error in adding watch history : " ,error);
      
    }
  }
  const handleVideoClick=async(videoId)=>{
    await addViews(videoId)
    await addToWatchHistory(videoId)
    navigate(`/videos/${videoId}`)

  };

  
  return (
    <div className="md:w-[62%] w-full px-2 py-8 flex flex-col gap-2 mb-[15rem]">
        {videos.map((video) => (
          <div onClick={()=>handleVideoClick(video._id)} key={video._id}>
            <PlaylistVideoCard video={video} />
          </div>
        ))}
      </div>
  );
}
