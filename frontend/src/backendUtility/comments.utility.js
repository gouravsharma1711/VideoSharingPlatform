import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/comments`,
    withCredentials: true
});
class Comments{

  async getVideoComments(videoId){
    try {
        
        const response=await axiosInstance.get(`/${videoId}/comments`);
        console.log("Response of fetching comment : ",response);

        return response.data;

    } catch (error) {
        console.log("Error in getting video comments : ",error);
        throw error;
    }
  }
  async addComment({content,videoId}){
    try {
        const response=await axiosInstance.post(
            `/${videoId}/add`,
            {content}
        )
        console.log("Response of adding comment : ",response);
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.log("Error in adding comment : ",error);
        throw error;
    }
  }

  async updateComment({commentId,content}){
    try {
        const response=await axiosInstance.patch(
            `/${commentId}/update`,
            {content}
        );
        return response.data;
    } catch (error) {
        console.log("Error in updating comment : ",error);
        throw error;
    }
  }

  async deleteComment(commentId){
    try {
        const response=await axiosInstance.delete(`/${commentId}/delete`);
        return response.data;
    } catch (error) {
        console.log("Error in deleting comment : ",error);
        throw error;
    }
  }
}

const commentsObject=new Comments();

export default commentsObject;
