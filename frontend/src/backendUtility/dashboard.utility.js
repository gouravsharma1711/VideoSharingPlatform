import axios from "axios";

class DashBoard{
    async getCurrentStats(){
        try {
            
            const response=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/dashboard`
                ,{withCredentials:true}
            );
            return response.data;

            
        } catch (error) {
            console.log("Error in getting current stats : ",error);
            throw error;
        }
    }
}
const dashboard = new DashBoard();
export default dashboard;
