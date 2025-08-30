import dotenv from 'dotenv';
dotenv.config({ path: "../../.env" });

import mongoose from "mongoose";
import {Video} from '../models/video.model.js'



async function insertDemoVideos() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL,{dbName: process.env.MONGODB_DB_NAME});

    // Your existing users
    const userIds = [
      "6892705426fdca187ba40f87", // Gourav
      "68a70d72a494b82afb68ab26", // Aarti
      "68a710a8a494b82afb68afd6", // Ayushman
      "68a712bca494b82afb68b3b8", // Shruti
      "68af0833c3c6549484cc5e37"  // Anurag
    ];

    // Real Cloudinary video + thumbnail samples
    const videoFiles = [
      "https://res.cloudinary.com/dgavuxx13/video/upload/v1755773650/VSW_Videos/xnymeotuhvmp0aqb35cu.mp4",
      "https://res.cloudinary.com/dgavuxx13/video/upload/v1755773475/VSW_Videos/ymfsuwfix7fmvi7hgf9p.mp4",
      "https://res.cloudinary.com/dgavuxx13/video/upload/v1755778863/VSW_Videos/sccvuzhot2i76qs1avmi.mp4",
      "https://res.cloudinary.com/dgavuxx13/video/upload/v1755779020/VSW_Videos/c9bvdevpbf8tjpqxzfbu.mp4",
      "https://res.cloudinary.com/dgavuxx13/video/upload/v1755780104/VSW_Videos/dqucaa3sikpeuiz4mvyv.mp4"
    ];

    const thumbnails = [
      "https://res.cloudinary.com/dgavuxx13/image/upload/v1755773478/VSW_Thumbnails/nmrhozboqaslebxf0lla.jpg",
      "https://res.cloudinary.com/dgavuxx13/image/upload/v1755778865/VSW_Thumbnails/xggrzl4cr5vyebqai8gp.jpg",
      "https://res.cloudinary.com/dgavuxx13/image/upload/v1755773651/VSW_Thumbnails/awt1oavbcsh9f5ey0mpi.jpg",
      "https://res.cloudinary.com/dgavuxx13/image/upload/v1755779437/VSW_Thumbnails/jstw9mdikvnzxdvwwewm.jpg",
      "https://res.cloudinary.com/dgavuxx13/image/upload/v1755779154/VSW_Thumbnails/vk7se5sbyl9n9tpmjkud.jpg"
    ];

    // Titles & descriptions to look real
    const titles = [
      "Jhol | Coke Studio | Season 15 | Maanu x Annural Khalid",
      "Locha-E-Ulfat | Arijit Singh | Romantic Hit",
      "Shape of You | Ed Sheeran | Official Music Video",
      "Tutorial: Learn React in 10 Minutes",
      "Travel Vlog | Exploring Manali 2025",
      "How to Cook Paneer Butter Masala | Easy Recipe",
      "Motivational Speech | APJ Abdul Kalam",
      "Coding Interview Tips | DSA & System Design",
      "Stand-up Comedy | Zakir Khan",
      "Chai with Friends | Relaxing Cafe Music"
    ];

    const sampleVideos = [];

    for (let i = 1; i <= 100; i++) {
      const randomUser = userIds[Math.floor(Math.random() * userIds.length)];
      const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];
      const randomThumb = thumbnails[Math.floor(Math.random() * thumbnails.length)];
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];

      sampleVideos.push({
        videoFile: randomVideo,
        thumbnail: randomThumb,
        title: randomTitle + ` | Demo ${i}`,
        description: `This is a sample description for ${randomTitle}.`,
        duration: (Math.random() * 500).toFixed(2),
        views: Math.floor(Math.random() * 10000),
        owner: randomUser,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    console.log("sampleVideos : ",sampleVideos);
    
    await Video.insertMany(sampleVideos);
    console.log("✅ Inserted 100 demo videos with real Cloudinary links!");
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error inserting demo videos:", error);
    await mongoose.disconnect();
  }
}

insertDemoVideos();