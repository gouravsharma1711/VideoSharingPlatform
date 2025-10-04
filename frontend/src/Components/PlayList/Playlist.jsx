import { useEffect, useState } from "react";
import PlayListCard from "../CoreComponents/Cards/PlayListCard.jsx";
import playlist from "../../backendUtility/playlist.utility.js";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading.jsx";
import { useSelector } from "react-redux";
import AddPlaylist from "../Profile/AddPlaylist.jsx";

function Playlist({ userId }) {
  const loggedInUser = useSelector((state) => state.user.userData);
  const [loading, setLoading] = useState(false);
  const [playlistData, setPlaylistData] = useState([]);
  const [isAddPlaylistClicked, setIsAddPlaylistClicked] = useState(false);

  const fetchPlaylistData = async () => {
    try {
      setLoading(true);
      const response = await playlist.getUserPlaylists(userId);
      if (response.statusCode === 200) {
        setPlaylistData(response.data);
        console.log("response : ", response);
      } else {
        console.log("Error in fetching playlist data");
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylistData();
  }, [userId]);

  const handleDeletePlaylist = async (e, playlistId) => {
    try {
      e.stopPropagation();

      const response = await playlist.deletePlaylist(playlistId);

      if (response.statusCode === 200) {
        toast.success("Playlist deleted successfully");
        fetchPlaylistData();
      } else {
        toast.error("Error in deleting playlist");
      }
    } catch (error) {
      console.error("Delete playlist error:", error);
      toast.error("Error in deleting playlist");
    }
  };

  

  if (loading) {
    return <Loading size={40} msg="Fetching Playlist Data..." />;
  }

  return (
    <div className="mb-[15rem]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-white">Your Playlists</h2>

        {loggedInUser && loggedInUser._id === userId && (
          <button
            onClick={() => setIsAddPlaylistClicked((prev) => !prev)}
            className="bg-blue-600 text-white px-4 py-2 rounded w-fit"
          >
            + Add Playlist
          </button>
        )}
      </div>

      {playlistData.length === 0 && (
        <div className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300 flex justify-center items-center">
          <h1>No playlists found yet. Create a new one!</h1>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 py-6">
        {playlistData.map((item) => (
          <PlayListCard
            key={item._id}
            playlist={item}
            handleDeletePlaylist={(e) => handleDeletePlaylist(e, item._id)}
          />
        ))}
      </div>

      {isAddPlaylistClicked && (
        <AddPlaylist setIsAddPlaylistClicked={setIsAddPlaylistClicked}  />
      )}
    </div>
  );
}

export default Playlist;