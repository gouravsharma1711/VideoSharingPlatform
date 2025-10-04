import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
    
    try {
        const response= await mongoose.connect(process.env.MONGODB_CONNECTION_URL,{ dbName: process.env.MONGODB_DB_NAME });
        console.log("Host Name : ",response.connection.host);
    } catch (error) {
        
        console.log("Error in Data Base Connection :- ",error);
        process.exit(1);
    }
    
}


export default connectToDatabase;
