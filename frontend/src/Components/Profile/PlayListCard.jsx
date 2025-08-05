import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import videos from '../../backendUtility/videos.utility';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function PlayListCard({ playlist = {}, handleDeletePlaylist }) {
  const [videoThumbnail, setThumbnail] = useState('');
  const currProfileUserName=useParams().userName;
  const loggedInUser=useSelector((state)=>state.user.userData);
  
  
  const getVideoData = async () => {
    try {
      const videoId = playlist?.videos?.[0];
      if (!videoId) return;

      const response = await videos.getVideoById(videoId);
      if (response?.statusCode === 200) {
        setThumbnail(response.data.thumbnail);
      } else {
        toast.error('Error in fetching video data');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in fetching video data');
    }
  };

  useEffect(() => {
    getVideoData();
  }, [playlist]);

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      <div className="relative group rounded-xl overflow-hidden">
        {/* Delete Button */}
        {
          currProfileUserName===loggedInUser.userName &&
          <button
          onClick={handleDeletePlaylist}
          className="absolute top-2 right-2 z-20 p-2 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-500"
          aria-label="Delete playlist"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
          </svg>
        </button>
        }

        <Link to={`/user/playlist/${playlist._id}`}>
          <img
            src={videoThumbnail || 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=2048x2048&w=is&k=20&c=ohMtddTt7BppCvEUNGqJ9FRDyJqAdkzonVQ7KmWbTrg='}
            alt={playlist.title}
            className="w-full h-48 object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-3 flex flex-col justify-end">
            <div className="flex justify-between text-sm text-white">
              <span>{playlist.name} · {new Date(playlist.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              })}</span>
              <span>{playlist.videos.length} videos</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="px-1">
        <h3 className="text-white text-base font-semibold leading-snug">{playlist.title}</h3>
        <p className="text-gray-400 text-sm mt-1 leading-relaxed line-clamp-2">
          {playlist.description?.length > 80
            ? playlist.description.slice(0, 80) + '...'
            : playlist.description || 'No description provided.'}
        </p>
      </div>
    </div>
  );
}
