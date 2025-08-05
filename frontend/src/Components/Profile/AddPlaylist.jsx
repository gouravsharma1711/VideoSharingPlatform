import React, { useState } from "react";
import playlist from "../../backendUtility/playlist.utility";
import { toast } from "react-toastify";

export default function AddPlaylist({ setIsAddPlaylistClicked }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await playlist.createPlaylist(form);
      console.log("Playlist creation response:", response);

      if (response.statusCode === 200) {
        toast.success("Playlist created successfully!");
        setIsAddPlaylistClicked(false);
      } else {
        toast.error(response.message || "Failed to create playlist");
      }
    } catch (error) {
      toast.error(error.message || "Error creating playlist");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
      <div className="bg-gray-900 text-white rounded-xl shadow-lg w-full max-w-md p-6 relative space-y-6">
        {/* Close Button */}
        <button
          onClick={() => setIsAddPlaylistClicked(false)}
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white text-sm rounded-md transition"
        >
          <i className="fa-solid fa-xmark" />
          <span>Close</span>
        </button>

        <h2 className="text-2xl font-semibold text-center">Create Playlist</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Playlist name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm mb-1">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Short description"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition text-white font-semibold"
          >
            Create Playlist
          </button>
        </form>
      </div>
    </div>
  );
}
