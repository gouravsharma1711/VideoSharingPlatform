import axios from 'axios';
import { use } from 'react';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/users`,
    withCredentials: true
});

class User {

    async registerUser(formData) {
        try {
            const response  = await axiosInstance.post("/signup", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    }

    async logInUser({ email, userName, password }) {
        
        try {
            const response = await axiosInstance.post("/login", { email, userName, password });
            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    async logOutUser() {
        try {
            console.log("Logging out...");
            
            const { data } = await axiosInstance.post("/logout");
            console.log("Logged out successfully.",data);
            
            return data;
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    }

    async refreshToken() {
        try {
            const { data } = await axiosInstance.get("/refresh-token");
            return data;
        } catch (error) {
            console.error("Token refresh error:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const { data } = await axiosInstance.get("/current-user");
            return data;
        } catch (error) {
            console.error("Get current user error:", error);
            throw error;
        }
    }

    async changePassword({ oldPassword, newPassword, retypeNewPassword }) {
        try {
            const { data } = await axiosInstance.post("/change-password", {
                oldPassword, newPassword, retypeNewPassword
            });
            return data;
        } catch (error) {
            console.error("Change password error:", error);
            throw error;
        }
    }

    async updateAvatar(formData) {
        try {
            const { data } = await axiosInstance.patch("/change-avatar", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return data;
        } catch (error) {
            console.error("Update avatar error:", error);
            throw error;
        }
    }

    async updateCoverImage(formData) {
        try {
            const { data } = await axiosInstance.patch("/change-cover-image", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return data;
        } catch (error) {
            console.error("Update cover image error:", error);
            throw error;
        }
    }

    async updateAccountDetails(form) {
        try {
            const { data } = await axiosInstance.post("/update-account-details", form);
            return data;
        } catch (error) {
            console.error("Update account details error:", error);
            throw error;
        }
    }

    async getUserProfile(userName) {
        try {
            const response = await axiosInstance.get(`/profile/${userName}`);
            console.log("Response data : ",response);
            console.log("Response.data  data : ",response.data);
            return response.data;
            
        } catch (error) {
            console.error("Get user profile error:", error);
            throw error;
        }
    }

    async getWatchHistory() {
        try {
            const response = await axiosInstance.get("/watchHistory");
            console.log("Data : ",response.data);
            
            return response.data;
        } catch (error) {
            console.error("Get watch history error:", error);
            throw error;
        }
    }

    async addToWatchHistory(videoId) {
        try {
            const { data } = await axiosInstance.get(`/updateWatchHistory/${videoId}`);
            return data;
        } catch (error) {
            console.error("Add to watch history error:", error);
            throw error;
        }
    }

    async deleteAccount() {
        try {
            const { data } = await axiosInstance.delete("/delete-account");
            return data;
        } catch (error) {
            console.error("Delete account error:", error);
            throw error;
        }
    }
    async clearHisory(){
        try{
            const {data}=await axiosInstance.delete('/clear-History');
            return data;
        }catch(error){
            console.error('Clear History Error:',error);
            throw error;
        }
    }
}

const userObject = new User();
export default userObject;
