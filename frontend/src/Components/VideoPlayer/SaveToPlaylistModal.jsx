import React, { useEffect, useState } from "react";
import playlist from "../../backendUtility/playlist.utility";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function SaveToPlaylistModal({ setIsAddToPlaylistClicked }) {
  const videoId=useParams().videoId;
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const user = useSelector((state) => state.user.userData);

  // Fetch user playlists
  const fetchPlaylists = async () => {
    try {
      const response = await playlist.getUserPlaylists(user._id);
      if (response.statusCode === 200) {
        setUserPlaylists(response.data);
        // Pre-select playlists that already contain this video
        const preSelected = response.data
          .filter((pl) => pl.videos.includes(videoId))
          .map((pl) => pl._id);
        setSelectedPlaylists(preSelected);
      } else {
        toast.error("Failed to fetch playlists");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching playlists");
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchPlaylists();
    }
  }, [user?._id]);

  // Handle add/remove video to/from playlist
  const handleToggle = async (playlistId) => {
    try {
      let updated;
      if (selectedPlaylists.includes(playlistId)) {
        // Remove video
        const res = await playlist.removeVideoFromPlaylist({
          playlistId,
          videoId,
        });
        if (res.statusCode === 200) {
          toast.success("Removed from playlist");
          updated = selectedPlaylists.filter((id) => id !== playlistId);
        } else {
          toast.error(res.message);
          return;
        }
      } else {
        // Add video
        const res = await playlist.addVideoToPlaylist({
          playlistId,
          videoId,
        });
        if (res.statusCode === 200) {
          toast.success("Added to playlist");
          updated = [...selectedPlaylists, playlistId];
        } else {
          toast.error(res.message);
          return;
        }
      }
      setSelectedPlaylists(updated);
    } catch (error) {
      console.log(error);
      toast.error("Error updating playlist");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-black text-white rounded-xl p-6 w-80 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Save To playlist</h2>
          <button
            onClick={() => setIsAddToPlaylistClicked(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Playlist List */}
        <div className="space-y-3">
          {userPlaylists.map((pl) => (
            <label
              key={pl._id}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedPlaylists.includes(pl._id)}
                onChange={() => handleToggle(pl._id)}
                className="w-4 h-4 rounded accent-purple-500"
              />
              <span>{pl.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
