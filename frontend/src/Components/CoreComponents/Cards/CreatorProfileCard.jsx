import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import playlist from "../../../backendUtility/playlist.utility";
import UpdatePlaylist from "../../Profile/UpdatePlaylist";
import { useSelector } from "react-redux";
export default function CreatorProfileCard({ name, avatar, playlist }) {
  const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false);
  
  const currentProfileUserName = playlist?.user?.userName || "";
  const loggedInUser = useSelector((state) => state.user.userData);

  return (
    <div className="flex flex-row gap-5 justify-center items-center">
      <Link
        to={`/user/${name}`}
        className="flex gap-5 my-10 justify-center items-center"
      >
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-full border border-gray-400 object-cover transition-transform group-hover:scale-105"
        />
        <div className="flex flex-col justify-center">
          <span className="text-white font-semibold text-[1rem]">{name}</span>
        </div>
      </Link>
      {currentProfileUserName === loggedInUser?.userName && (
        <button
          className=" bg-purple-500 text-white hover:bg-purple-600  px-2 py-2 rounded-lg "
          onClick={() => setIsUpdateButtonClicked((prev) => !prev)}
        >
          Update Playlist
        </button>
      )}
      {isUpdateButtonClicked && (
        <UpdatePlaylist
          setIsAddPlaylistClicked={setIsUpdateButtonClicked}
          playlistData={playlist}
        />
      )}
    </div>
  );
}
