import axios from "axios";

const axiosInstance=axios.create({
    baseURL:`${import.meta.env.VITE_API_BASE_URL}/api/v1/subscriptions`,
    withCredentials:true,
})

class Subscriptions {
    async toggleSubscription(channelId){
        try {
            console.log("Channel Id : ",channelId);
            const response = await axiosInstance.post(`/channels/${channelId}`);
            console.log("Response : ",response);
            console.log("ResponseData : ",response.data);
            
            return response.data;
        } catch (error) {
            console.log("Error in toggling subscription : ",error);
            throw error;
        }
    }

    async getUserChannelSubscribers(channelId){
        try {
            const response = await axiosInstance.get(`/channels/${channelId}/subscribers`);
            return response.data;
        } catch (error) {
            console.log("Error in getting user channel subscribers : ",error);
            throw error;
        }
    }

    async getSubscribedChannels(channelId){
        try {
            const response = await axiosInstance.get(`/users/${channelId}/subscriptions`);
            return response.data;
        } catch (error) {
            console.log("Error in fetching subscriptions of user : ",error);
            throw error; 
        }
    }


}

const subscriptionsService=new Subscriptions();
export default subscriptionsService;
