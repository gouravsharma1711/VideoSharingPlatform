import { Link } from "react-router-dom";
import VideoCard from "../CoreComponents/Cards/VideoCard";
import { useNavigate } from "react-router-dom";
export default function VideoCardList({ videos }) {
  const navigate=useNavigate();
  return (
    <div className="grid grid-cols-1 gap-3 px-5 ">
      {videos.map((video) => (
        <div onClick={(e)=>{
          e.stopPropagation()
          navigate(`/videos/${video._id}`)
        }} key={video._id} >
          <VideoCard
            video={video} 
          />
        </div>
      ))}
    </div>
  );
}
