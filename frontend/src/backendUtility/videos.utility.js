import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/videos`,
    withCredentials: true,
});

class Videos {
    async getUserVideos(userId) {
        try {
            
            const response = await axiosInstance.get(`/${userId}/videos`);
            
            return response.data;
        } catch (error) {
            console.error("getUserVideos error:", error);
            throw error;
        }
    }

    async getAllVideos({ page = 1, limit = 10 } = {}) {
        try {
            const response = await axiosInstance.get(
                `/`,
                {
                    params: {
                        page,
                        limit,
                    }
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("getAllVideos error:", error);
            throw error;
        }
    }

    async publishVideo(formData) {
        try {
            console.log("Formm Data recived : ",formData);
            

            const response = await axiosInstance.post(
                `/publish-video`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("publishVideo error:", error);
            throw error;
        }
    }

    async getVideoById(videoId) {
        try {
            let response;
            if(videoId){
                response = await axiosInstance.get(`/video/${videoId}`);
            }
            
            return response?.data || {};
        } catch (error) {
            console.error("getVideoById error:", error);
            throw error;
        }
    }

    async updateVideo({ title, description, videoId }) {
        console.log("data recieved : ");
        console.log(title);
        console.log(description);
        console.log(videoId);
        
        
        try {
            const response = await axiosInstance.patch(
                `/update/${videoId}`,
                {
                    title,
                    description
                }
            );
            return response.data;
        } catch (error) {
            console.error("updateVideo error:", error);
            throw error;
        }
    }

    async deleteVideo(videoId) {
        try {
            const response = await axiosInstance.delete(`/delete/${videoId}`);
            return response.data;
        } catch (error) {
            console.error("deleteVideo error:", error);
            throw error;
        }
    }

    async togglePublishStatus(videoId) {
        try {
            const response = await axiosInstance.get(`/publish-status/${videoId}`);
            return response.data;
        } catch (error) {
            console.error("togglePublishStatus error:", error);
            throw error;
        }
    }

    async updateThumbnail(formData, videoId) {
        console.log("videoId in utility : ",videoId);
        
        try {
            const response = await axiosInstance.patch(
                `/update-thumbnail/${videoId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("updateThumbnail error:", error);
            throw error;
        }
    }

    async getSingleView(videoId) {
        try {
            const response = await axiosInstance.get(`/${videoId}`);
            return response.data;
        } catch (error) {
            console.error("getSingleView error:", error);
            throw error;
        }
    }

    async getCurrentUserVideos() {
        try {
            const response = await axiosInstance.get(`/user-videos`);
            return response.data;
        } catch (error) {
            console.error("getCurrentUserVideos error:", error);
            throw error;
        }
    }
}

const videos = new Videos();

export default videos;
