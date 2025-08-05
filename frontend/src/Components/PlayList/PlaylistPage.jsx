import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CreatorProfileCard from "./CreatorProfileCard";
import PlaylistSidebar from "./PlaylistSidebar";
import playlistUtility from "../../backendUtility/playlist.utility";
import { toast } from "react-toastify";
export default function PlaylistPage() {
  const { playlistId } = useParams();


  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);

  const getPlayListData = async () => {
    try {
      const response = await playlistUtility.getPlaylistById(playlistId);

      if (response.statusCode === 200) {
        setPlaylist(response.data);
        setVideos(response.data.playListVideos);
        console.log(response.data.playListVideos);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(Error);
    }
  };

  useEffect(() => {
    getPlayListData();
  }, [playlistId]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      
      <div className="md:w-[38%] w-full flex flex-col items-start px-6 pt-8 pb-6">
        <h1 className="text-3xl my-4 font-bold text-white text-center md:text-left">
            {playlist?.name}
          </h1>
          <div>
            <CreatorProfileCard
              name={playlist?.user.userName}
              avatar={playlist?.user.avatar}
              playlist={playlist}
            />
          </div>

        <div className="w-full rounded-lg overflow-hidden relative">
          <img
            src={
              videos[0]?.thumbnail ||
              "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=2048x2048&w=is&k=20&c=ohMtddTt7BppCvEUNGqJ9FRDyJqAdkzonVQ7KmWbTrg="
            }
            alt="Playlist Cover"
            className="w-full h-56 object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between items-end">
            <div>
              <div className="text-sm text-gray-200 font-medium">
                {playlist?.name}
              </div>
              <div className="text-xs text-gray-300 flex gap-2">
                {playlist?.views || 0}
                <span>•</span>
                {new Date(playlist?.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }) ||
                  new Date(Date.now()).toLocaleDateString({
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
              </div>
            </div>
            <div className="text-sm  text-white font-semibold">
              {videos.length} videos
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2 text-2xl font-bold">Description : </p>
          <p className='text-gray-200'>{playlist?.description}</p>
        </div>
      </div>
      {videos.length === 0 ? (
        <div>No Video in this Playlist</div>
      ) : (
        <PlaylistSidebar videos={videos} />
      )}
    </div>
  );
}
