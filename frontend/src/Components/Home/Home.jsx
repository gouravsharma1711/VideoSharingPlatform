import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../../Hooks/useApi.js";
import videos from "../../backendUtility/videos.utility.js";
import VideosView from "./VideosView.jsx";
import LoadingSpinner from "../Loading/LoadingSpinner.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const [videoData, setVideoData] = useState([]);
  const { data, loading, error, request } = useApi(videos.getAllVideos);
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    setIsFetching(true);
    request({ page });
  }, [page]);

  useEffect(() => {
    if (data) {
      if (data.length < 10) {
        setHasMore(false);
      }
      setVideoData((prevVideos) => [...prevVideos, ...data]);
    }
    setIsFetching(false);
  }, [data]);

  const loadMoreVideos = () => {
    const timeOutId=setTimeout(()=>{
      setPage((prev) => prev + 1);
    },500)
    return ()=>clearTimeout(timeOutId)
  };

  return (
    <div className="px-5 min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black pt-20">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Trending Videos
        </h1>
        <p className="text-gray-400">
          Discover the most popular content on our platform
        </p>
      </div>

      {error && (
        <div className="text-center text-red-500 mt-5 p-4">
          Could not load videos. Please try again later.
        </div>
      )}

      {loading && page === 1 && (
        <div className="min-h-[40vh] flex flex-col gap-2 items-center justify-center text-white">
          <LoadingSpinner size={50} />
          <p>Fetching Data...</p>
        </div>
      )}

      {!isFetching && videoData.length === 0 && (
        <div className="text-center text-gray-400 mt-5 p-4">
          No videos found.
        </div>
      )}

      {videoData.length > 0 && (
        <InfiniteScroll
          dataLength={videoData.length}
          next={loadMoreVideos}
          hasMore={hasMore}
          loader={
            <div className="flex flex-col justify-center items-center py-4">
              <span className="ml-2 text-white ">Fetching More Data...</span>
              <br />
              <LoadingSpinner size={50} />
            </div>
          }
          endMessage={
            <p className="text-center text-gray-400 mt-5 p-4">No more videos!</p>
          }
        >
          <VideosView videoData={videoData} />
        </InfiniteScroll>
      )}
    </div>
  );
}

export default Home;
