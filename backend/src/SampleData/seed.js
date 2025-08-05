import dotenv from 'dotenv';
dotenv.config({ path: "../../.env" });

import mongoose from "mongoose";
import {
  User,
  Video,
  Comment,
  Like,
  Subscription,
  PlayList
} from "../models/index.js";

import {
  // users,
  // videos,
  // comments,
  // likes,
  // subscriptions,
  playlists
} from "../SampleData/index.js";
// connect to the db
import connectToDatabase from "../db/index.js";



const seedDatabase = async () => {

  try {
    await connectToDatabase();
    console.log("✅ Database connected successfully");

    await Promise.all([
        // User.insertMany(users),
        // Video.insertMany(videos),
        // Comment.insertMany(comments),
        // Like.insertMany(likes),
        // Subscription.insertMany(subscriptions),
        PlayList.insertMany(playlists),
    ])

    console.log("✅ Sample data inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  }finally {
      await mongoose.disconnect();
    }
};

seedDatabase();