import VideosView from "./VideosView.jsx";
import { useState, useEffect, useRef, useCallback } from "react";
import videos from "../../backendUtility/videos.utility.js";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Home() {
  const [videoData, setVideoData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const location = useLocation();
  const navigate=useNavigate()

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const fetchVideos = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response = await videos.getAllVideos({ page: pageNum });
      if (response.statusCode === 200) {
        const newVideos = response.data;
        if (newVideos.length === 0) {
          setHasMore(false); // no more data to fetch
        } else {
          setVideoData((prev) => [...prev, ...newVideos]);
        }
      }
    } catch (error) {
      console.log("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  const lastVideoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="px-5 min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black mt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Trending Videos
        </h1>
        <p className="text-gray-400">
          Discover the most popular content on our platform
        </p>
      </div>

      <VideosView videoData={videoData} lastVideoRef={lastVideoRef} />

      {loading && (
        <div className="text-center text-gray-300 mt-5">
          Loading more videos...
        </div>
      )}

      {!hasMore && (
        <div className="text-center text-gray-400 mt-5">
          No more videos to show
        </div>
      )}
    </div>
  );
}

export default Home;
