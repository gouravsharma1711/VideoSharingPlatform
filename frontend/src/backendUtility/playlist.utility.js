import axios from 'axios';


const axiosInstance=axios.create({
    baseURL:`${import.meta.env.VITE_API_BASE_URL}/api/v1/playlist`,
    withCredentials:true
});

class Playlist{
    async createPlaylist(form){
        try {
            console.log("Form Data : ",form);
            
            const response=await axiosInstance.post("/",form);
            console.log("Response data in createPlaylist : ",form);
            
            return response.data;
        } catch (error) {
            console.log("Error in creating the playlist : ",error);
            throw error;
        }
    }
    
    async getUserPlaylists(userId){
        try {
            const response=await axiosInstance.get(`/user/${userId}`);
            return response.data;
        } catch (error) {
            console.log("Error in fetching user playlists",error);
            throw error;
        }
    }

    async getPlaylistById(playlistId){
        try {
            
            const response=await axiosInstance.get(`/${playlistId}`);
            
            return response.data;
        } catch (error) {
            console.log("Error in fetching playlist by id : ",error);
            throw error;
        }
    }

    async addVideoToPlaylist({playlistId,videoId}){
        try {
            
            const reponse=await axiosInstance.patch(`/${playlistId}/videos/${videoId}`);
            return reponse.data;

        } catch (error) {
            console.log("Error in adding video to playlist : ",error);
            throw error;
            
        }
    }

    async removeVideoFromPlaylist({playlistId,videoId}){
        try {
            
            const response=await axiosInstance.delete(`/${playlistId}/videos/${videoId}`);
            return response.data;

        } catch (error) {
            console.log("Error in removing video from playlist : ",error);
            throw error;
        }
    }

    async updatePlaylistDetails({playlistId,form}){
        try {
            console.log("Playlist Id : ",playlistId," Form : ",form);
            
            const response =await axiosInstance.post(`/${playlistId}`,
                form
            )
            console.log("Response : ",response);
            
            return response.data;

        } catch (error) {
            console.log("Error in updating playlist details : ",error);
            throw error;
        }
    }
    async deletePlaylist(playlistId){
        try {
            
            const response=await axiosInstance.delete(`/${playlistId}`);
            return response.data;
        } catch (error) {
            console.log("Error in deleting playlist : ",error);
            throw error;
        }
    }
}
const playlist=new Playlist();
export default playlist;
