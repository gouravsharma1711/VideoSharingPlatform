import Home from '../Home/Home.jsx'
import VideosView from '../Home/VideosView.jsx'
import Likes from '../../backendUtility/likes.utility.js'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import LoadingSpinner from '../dashBoard/LoadingSpinner.jsx'
function UserLikes() {

    const [likedVideos,setLikedVideos]=useState([])
    const [loading,setLoading]=useState(false);
    const getLikedVideos=async()=>{
        try {
            setLoading(true);
            const response=await Likes.getLikesVideos();
            if(response.status===200){
                setLikedVideos(response.data);
                
            }else{
                toast.error("Something went wrong");
            }
            
        } catch (error) {
           toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getLikedVideos();
    },[])

    if(loading){
        return (
            <div className='flex flex-col items-center justify-center h-full w-full gap-5'>
                <LoadingSpinner/>
                <p>Fetching your liked videos...</p>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
            <div className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-4 text-white">
                        <i className="fa-solid fa-thumbs-up mr-3 text-pink-400"></i>
                        Liked Videos
                    </h1>
                    <p className="text-gray-400 text-lg">All the videos you've liked and enjoyed</p>
                </div>
                <VideosView videos={likedVideos} />
            </div>
        </div>
    )
}

export default UserLikes
