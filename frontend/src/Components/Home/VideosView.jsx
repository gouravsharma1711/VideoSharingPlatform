import React, { useEffect, useState } from 'react'
import Card from './Card.jsx'
import videos from '../../backendUtility/videos.utility.js';
function VideosView({videoData=[]}) {
    
    const [videos,setVideo]=useState([]);

    useEffect(()=>{
        setVideo(videoData);
    },[videoData]);
    
    return (
        
        <div className="container mx-auto px-2 py-8">
                
            <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {
                    videos.map((item)=>{
                        return(
                            <Card key={item._id} item={item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default VideosView;

