import { useEffect,useState } from 'react';
import VideosView from '../Home/VideosView.jsx'
import { toast } from 'react-toastify';
import videos from '../../backendUtility/videos.utility.js';
import Loading from '../Loading/Loading.jsx';
function UserContent() {
    const [loading,setLoading]=useState(false);
    const [videoData, setVideoData] = useState([]);
    const fetchVideosData = async () => {
    try {
      setLoading(true);
      const responseData = await videos.getCurrentUserVideos();
      if (responseData?.statusCode !== 200) {
        toast.error(responseData?.message);
      }else {
        setVideoData(responseData?.data || []);
    }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchVideosData();
  },[])

  useEffect(()=>{
    
    console.log("video data : ",videoData);
  },[videoData])

  if(loading){
    return (
      <Loading size={50} msg="Fetching Data ..."/>
    )
  }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
            <div className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-4">
                        <i className="fa-solid fa-video mr-3 text-blue-400"></i>
                        My Content
                    </h1>
                    <p className="text-gray-400 text-lg">View all your uploaded videos</p>
                    <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-400">
                            <i className="fa-solid fa-play-circle text-blue-400"></i>
                            <span>{videoData.length} videos uploaded</span>
                        </div>
                    </div>
                </div>
                <VideosView  videoData={videoData} />
            </div>
        </div>
    )
}

export default UserContent
