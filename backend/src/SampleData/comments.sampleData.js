import mongoose from "mongoose";

const objectId = (id) => new mongoose.Types.ObjectId(id);

const comments = [
  {
    content: "This is awesome!",
    owner: objectId("507f1f77bcf86cd799439001"),  // user1
    video: objectId("609e129e1c4ae9a1c8e9b001"),  // video1
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: "Great explanation, thanks!",
    owner: objectId("507f1f77bcf86cd799439002"),  // user2
    video: objectId("609e129e1c4ae9a1c8e9b002"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: "I didn’t understand the last part.",
    owner: objectId("507f1f77bcf86cd799439003"),
    video: objectId("609e129e1c4ae9a1c8e9b003"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: "So helpful. Subscribed!",
    owner: objectId("507f1f77bcf86cd799439004"),
    video: objectId("609e129e1c4ae9a1c8e9b004"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: "Could you make a follow-up video?",
    owner: objectId("507f1f77bcf86cd799439005"),
    video: objectId("609e129e1c4ae9a1c8e9b005"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: "This saved me a ton of time!",
    owner: objectId("507f1f77bcf86cd799439006"),
    video: objectId("609e129e1c4ae9a1c8e9b006"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: "Best tutorial I’ve seen today!",
    owner: objectId("507f1f77bcf86cd799439007"),
    video: objectId("609e129e1c4ae9a1c8e9b007"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: "I'm still confused 😕",
    owner: objectId("507f1f77bcf86cd799439008"),
    video: objectId("609e129e1c4ae9a1c8e9b008"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: "Keep up the good work!",
    owner: objectId("507f1f77bcf86cd799439009"),
    video: objectId("609e129e1c4ae9a1c8e9b009"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: "Bhai, full stack bhi laa do!",
    owner: objectId("507f1f77bcf86cd79943900a"),
    video: objectId("609e129e1c4ae9a1c8e9b010"),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default comments;
