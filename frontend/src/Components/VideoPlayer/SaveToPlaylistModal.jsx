import React, { useEffect, useState } from "react";
import playlist from "../../backendUtility/playlist.utility";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function SaveToPlaylistModal({ setIsAddToPlaylistClicked }) {
  const { videoId } = useParams();
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.userData);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const response = await playlist.getUserPlaylists(user._id);
      if (response.statusCode === 200) {
        setUserPlaylists(response.data);
      } else {
        toast.error("Failed to fetch playlists");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching playlists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchPlaylists();
    }
  }, [user?._id]);

  const handleToggle = async (playlistId) => {
    setUserPlaylists((prev) =>
      prev.map((pl) =>
        pl._id === playlistId
          ? {
              ...pl,
              videos: pl.videos.includes(videoId)
                ? pl.videos.filter((v) => v !== videoId)
                : [...pl.videos, videoId],
            }
          : pl
      )
    );

    try {
      const playlistObj = userPlaylists.find((pl) => pl._id === playlistId);
      const isAlreadySelected = playlistObj?.videos?.includes(videoId);

      let res;
      if (isAlreadySelected) {
        res = await playlist.removeVideoFromPlaylist({ playlistId, videoId });
        if (res.statusCode === 200) {
          toast.success("Removed from playlist");
        } else {
          throw new Error(res.message);
        }
      } else {
        res = await playlist.addVideoToPlaylist({ playlistId, videoId });
        if (res.statusCode === 200) {
          toast.success("Added to playlist");
        } else {
          throw new Error(res.message);
        }
      }
      fetchPlaylists();
    } catch (error) {
      console.error(error);
      toast.error("Error updating playlist");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-black text-white rounded-xl p-6 w-80 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Save To Playlist</h2>
          <button
            onClick={() => setIsAddToPlaylistClicked(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Conditional Rendering Block */}
        {loading ? (
          <div className="text-center py-4">Loading playlists...</div>
        ) : userPlaylists.length > 0 ? (
          <div className="space-y-3">
            {userPlaylists.map((pl) => (
              <label key={pl._id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pl.videos.includes(videoId)}
                  onChange={() => handleToggle(pl._id)}
                  className="w-4 h-4 rounded accent-purple-500"
                />
                <span>{pl.name}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-400">
            You don't have any playlists yet.
          </div>
        )}
      </div>
    </div>
  );
}