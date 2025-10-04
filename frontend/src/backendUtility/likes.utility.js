import axios from 'axios';


const axiosInstance=axios.create({
    baseURL:`${import.meta.env.VITE_API_BASE_URL}/api/v1/likes`,
    withCredentials:true
});

class Likes{
    async toggleLike(videoId){

        try {
            const response =await axiosInstance.post(
                `/videos/${videoId}/toggle`
            );
            return response.data;
    
        } catch (error) {
            console.log("Error in toggle Like : ",error);
            throw error;
        }

    }

    async toggleCommentLike(commentId){
        try {
            
            const response=await axiosInstance.post(
                `/comments/${commentId}/toggle`
            );
            return response.data;

        } catch (error) {
            console.log("Error in toggle Comment Like : ",error);
            throw error;
        }
    }

    async getLikesVideos(){
        try {
            const response = await axiosInstance.get(`/videos`);
            
            return response.data;

        } catch (error) {
            console.log("Error in Get likes Videos : ",error);
            throw error;
        }
    }

    async isLikedCommentsByUser({userId,commentId}){
        try {
            const response = await axiosInstance.post('/isCommentLiked',{userId,commentId});
            return response.data;
        } catch (error) {
            console.log("Error in get liked comments : ",error);
            throw error;
            
        }
    }
    async isLikedVideoByUser(userId,videoId){
        try {
             console.log("userId : ",userId," type  : ",typeof userId);
    console.log("videoId : ",videoId," type  : ",typeof videoId);
            const response = await axiosInstance.post('/isVideoLiked',{userId,videoId});
            return response.data;
        } catch (error) {
            console.log("Error in get liked comments : ",error);
            throw error;
            
        }
    }

}

const like =new Likes();
export default like;
