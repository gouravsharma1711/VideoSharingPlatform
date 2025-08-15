import { Link } from "react-router-dom";
import VideoCard from "../CoreComponents/Cards/VideoCard";

export default function VideoCardList({ videos }) {
  return (
    <div className="grid grid-cols-1 gap-3 px-5">
      {videos.map((video) => (
        <Link to={`/videos/${video._id}`} key={video._id}  >
          <VideoCard video={video} />
          </Link>
      ))}
    </div>
  );
}
