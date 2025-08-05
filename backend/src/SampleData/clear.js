import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: "../../.env" });
import {
  User,
  Video,
  Comment,
  Like,
  Subscription,
  PlayList
} from "../models/index.js"; 

import connectToDatabase from "../db/index.js";

connectToDatabase()
.then(()=>{
    console.log("Database connected successfully");
})
.catch((error)=>{
    process.exit(1);
})

const clearDatabase = async () => {
  try {

    await Promise.all([
        User.deleteMany({}),
        Video.deleteMany({}),
        Comment.deleteMany({}),
        Like.deleteMany({}),
        Subscription.deleteMany({}),
        PlayList.deleteMany({}),

    ])

    console.log("🗑️ All data deleted successfully!");
  } catch (error) {
    console.error("❌ Error deleting data:", error);
  } finally {
    await mongoose.disconnect();
  }
};

clearDatabase();
