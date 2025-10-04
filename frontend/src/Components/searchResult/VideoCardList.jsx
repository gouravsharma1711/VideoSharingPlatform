import { Link } from "react-router-dom";
import VideoCard from "../CoreComponents/Cards/VideoCard";
import { useNavigate } from "react-router-dom";
import Videos from "../../backendUtility/videos.utility.js";

export default function VideoCardList({ videos }) {

  const navigate=useNavigate();

  const onClickHandler=(id,e)=>{
    e.stopPropagation()
    Videos.getSingleView(id);
    navigate(`/videos/${id}`)
  }

  return (
    <div className="grid grid-cols-1 gap-3 px-5 ">
      {videos.map((video) => (
        <div onClick={(e)=>onClickHandler(video._id,e)} key={video._id} >
          <VideoCard
            video={video} 
          />
        </div>
      ))}
    </div>
  );
}
