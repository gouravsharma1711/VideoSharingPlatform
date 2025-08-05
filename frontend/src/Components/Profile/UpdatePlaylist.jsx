import React, { useState } from "react";
import playlistApi from "../../backendUtility/playlist.utility";
import { toast } from "react-toastify";

function UpdatePlaylist({ setIsAddPlaylistClicked, playlistData }) {
  const [form, setForm] = useState({
    name: playlistData?.name || "",
    description: playlistData?.description || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Playlist : ",playlistData);
    
    try {
      const response = await playlistApi.updatePlaylistDetails({
        playlistId: playlistData?._id,
        form,
      });

      if (response?.statusCode === 200) {
        toast.success("Playlist updated successfully");
        setIsAddPlaylistClicked(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="m-2 fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-gray-900 text-white rounded-xl shadow-lg w-full max-w-md p-6 relative space-y-4">
        <button
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-red-700 text-gray-300 hover:text-white text-sm rounded-md shadow-sm transition"
          onClick={() => setIsAddPlaylistClicked(false)}
        >
          <i className="fa-solid fa-xmark"></i>
          <span>Close</span>
        </button>

        <h2 className="text-2xl font-bold text-center">Update The Playlist</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter playlist name"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter playlist description"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#9333ea] hover:bg-purple-800 transition py-2 rounded-md text-white font-medium"
          >
            Update Playlist
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePlaylist;
