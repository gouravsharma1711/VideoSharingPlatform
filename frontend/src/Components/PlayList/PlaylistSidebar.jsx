import { Link, useParams } from 'react-router-dom';
import PlaylistVideoCard from './PlaylistVideoCard';
export default function PlaylistSidebar({ videos }) {


  
  return (
    <div className="md:w-[62%] w-full px-2 py-8 flex flex-col gap-2 mb-[15rem]">
        {videos.map((video) => (
          <Link to={`/video/${video._id}`} key={video._id}>
            <PlaylistVideoCard video={video} />
          </Link>
        ))}
      </div>
  );
}
