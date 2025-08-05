import VideosView from '../Home/VideosView.jsx'
import user from '../../backendUtility/user.utility.js'
import { useEffect, useState } from 'react'
import LoadingSpinner from '../dashBoard/LoadingSpinner.jsx'
import {toast} from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import {toggleisHistoryStatus} from '../../Features/WatchHistory/history.slice.js'
function WatchHistory() {
    const [userHistory,setUserHistory]=useState([]);
    const [loading,setLoading]=useState(false);
    const isHistoryOn=useSelector((state)=>state.history.isHistoryOn);
    
    const dispatch=useDispatch();

    const fetchHistoru=async()=>{
        try{
            setLoading(true);
            const response=await user.getWatchHistory();
            if(response.statusCode===200){
                setUserHistory(response.data);
            }else{
                toast.error("Failed to fetch watch history");
            }
        }catch(err){
            toast.error(err.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchHistoru();
    },[]);


    const handleClearAllHistoryClick=async()=>{
        try{
            setLoading(true);
            const response=await user.clearHisory();
            if(response.statusCode===200){
                setUserHistory([]);
            }else{
                toast.error("Failed to clear watch history");
            }
        }catch{
            toast.error(err.message);
        }finally{
            setLoading(false);
        }
    }

    const HandlePauseHistoryClick=()=>{
        dispatch(toggleisHistoryStatus());
    }

    if(loading){ 
        return (
            <div  className='flex justify-center items-center h-full w-full gap-2'>
                <p>Fetching your watch history...</p>
                <LoadingSpinner/> 
            </div>
        )
    }

    return (
        loading?( <div className='flex justify-center items-center h-full w-full gap-2'>
            <LoadingSpinner/>
            <p>Wait ....</p>
        </div> ):(
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
            <div className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-4 text-white">
                        <i className="fa-solid fa-clock-rotate-left mr-3 text-purple-400 "></i>
                        Watch History
                    </h1>
                    <p className="text-gray-400 text-lg">Keep track of all the videos you've watched</p>
                    <div className="mt-4 flex items-center gap-4">
                        <button
                         className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                        onClick={handleClearAllHistoryClick}
                         >
                            <i className="fa-solid fa-trash mr-2"></i>
                            Clear All History
                        </button>
                        <button
                            onClick={HandlePauseHistoryClick}
                            className="bg-slate-700/50 hover:bg-slate-600/50 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-600/50">
                            <i className="fa-solid fa-pause mr-2"></i>
                            Pause History
                        </button>
                    </div>
                </div>
                <VideosView videoData={userHistory}/>
            </div>
        </div>
        )
    )
}

export default WatchHistory
