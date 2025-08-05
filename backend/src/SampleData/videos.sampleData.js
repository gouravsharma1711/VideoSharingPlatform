import mongoose from "mongoose";

const objectId = (id) => new mongoose.Types.ObjectId(id);

const userIds = [
  "688c10b9df0cee3b10532f30",
  "688c108bdf0cee3b10532f2c",
  "688c105bdf0cee3b10532f28",
  "688c0fdddf0cee3b10532e8e"
];

const videoThumbnail=[
  "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg",
  "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg",
  "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg",
  "https://images.pexels.com/photos/13840776/pexels-photo-13840776.jpeg",
  "https://images.pexels.com/photos/6528375/pexels-photo-6528375.jpeg"
]

const sampleVideoLinks = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
];

const randomVideoLinks=()=>{
  const num=Math.floor(Math.random()*sampleVideoLinks.length);
  return sampleVideoLinks[num];
}
const randomThumbnails=()=>{
  const num=Math.floor(Math.random()*videoThumbnail.length);
  return videoThumbnail[num];
}

const assignUserIds=()=>{
  let num=Math.floor(Math.random()*userIds.length);
  return userIds[num]; 
}



const videos = [
  {
    _id: objectId("507f1f77bcf86cd799439065"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 1",
    description: "Description for video 1",
    duration: 165,
    views: 2827,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343001"),
    updatedAt: new Date("2025-07-15T21:22:02.343004")
  },
  {
    _id: objectId("507f1f77bcf86cd799439066"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 2",
    description: "Description for video 2",
    duration: 215,
    views: 8946,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343011"),
    updatedAt: new Date("2025-07-15T21:22:02.343012")
  },
  {
    _id: objectId("507f1f77bcf86cd799439067"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 3",
    description: "Description for video 3",
    duration: 432,
    views: 2699,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343018"),
    updatedAt: new Date("2025-07-15T21:22:02.343019")
  },
  {
    _id: objectId("507f1f77bcf86cd799439068"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 4",
    description: "Description for video 4",
    duration: 350,
    views: 236,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343029"),
    updatedAt: new Date("2025-07-15T21:22:02.343031")
  },
  {
    _id: objectId("507f1f77bcf86cd799439069"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 5",
    description: "Description for video 5",
    duration: 226,
    views: 6493,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343037"),
    updatedAt: new Date("2025-07-15T21:22:02.343038")
  },
  {
    _id: objectId("507f1f77bcf86cd79943906a"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 6",
    description: "Description for video 6",
    duration: 521,
    views: 9735,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343044"),
    updatedAt: new Date("2025-07-15T21:22:02.343045")
  },
  {
    _id: objectId("507f1f77bcf86cd79943906b"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 7",
    description: "Description for video 7",
    duration: 382,
    views: 9857,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343050"),
    updatedAt: new Date("2025-07-15T21:22:02.343052")
  },
  {
    _id: objectId("507f1f77bcf86cd79943906c"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 8",
    description: "Description for video 8",
    duration: 385,
    views: 7777,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343059"),
    updatedAt: new Date("2025-07-15T21:22:02.343061")
  },
  {
    _id: objectId("507f1f77bcf86cd79943906d"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 9",
    description: "Description for video 9",
    duration: 477,
    views: 2025,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343067"),
    updatedAt: new Date("2025-07-15T21:22:02.343069")
  },
  {
    _id: objectId("507f1f77bcf86cd79943906e"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 10",
    description: "Description for video 10",
    duration: 314,
    views: 6447,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343076"),
    updatedAt: new Date("2025-07-15T21:22:02.343079")
  },
  {
    _id: objectId("507f1f77bcf86cd79943906f"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 11",
    description: "Description for video 11",
    duration: 159,
    views: 2385,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343088"),
    updatedAt: new Date("2025-07-15T21:22:02.343090")
  },
  {
    _id: objectId("507f1f77bcf86cd799439070"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 12",
    description: "Description for video 12",
    duration: 460,
    views: 6797,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343098"),
    updatedAt: new Date("2025-07-15T21:22:02.343101")
  },
  {
    _id: objectId("507f1f77bcf86cd799439071"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 13",
    description: "Description for video 13",
    duration: 408,
    views: 8441,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343110"),
    updatedAt: new Date("2025-07-15T21:22:02.343112")
  },
  {
    _id: objectId("507f1f77bcf86cd799439072"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 14",
    description: "Description for video 14",
    duration: 152,
    views: 2300,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343127"),
    updatedAt: new Date("2025-07-15T21:22:02.343129")
  },
  {
    _id: objectId("507f1f77bcf86cd799439073"),
    owner: objectId(String(assignUserIds())),
    videoFile: randomVideoLinks(),
    thumbnail: randomThumbnails(),
    title: "Video Title 15",
    description: "Description for video 15",
    duration: 312,
    views: 3053,
    isPublished: true,
    createdAt: new Date("2025-07-15T21:22:02.343134"),
    updatedAt: new Date("2025-07-15T21:22:02.343136")
  }
];

export default videos;
