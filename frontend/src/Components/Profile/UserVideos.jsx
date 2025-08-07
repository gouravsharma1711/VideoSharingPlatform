import React from 'react'
import Card from '../Home/Card.jsx'
import VideosView from '../Home/VideosView.jsx'



function UserVideos({videoData=[]}) {
    
    return (
        <div >
            <VideosView videoData={videoData}/>
        </div>
    );
}

export default UserVideos