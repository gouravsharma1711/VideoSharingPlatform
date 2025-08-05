import mongoose from "mongoose";

const objectId = (id) => new mongoose.Types.ObjectId(id);

const playlists = [
  {
    _id: objectId("507f1f77bcf86cd7994390c9"),
    owner: objectId("507f1f77bcf86cd799439008"),
    videos: [
      objectId("507f1f77bcf86cd79943906c"),
      objectId("507f1f77bcf86cd799439066")
    ],
    name: "Playlist 1",
    description: "Description for playlist 1",
    createdAt: new Date("2025-07-15T21:22:02.343338"),
    updatedAt: new Date("2025-07-15T21:22:02.343341")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390ca"),
    owner: objectId("507f1f77bcf86cd79943900c"),
    videos: [
      objectId("507f1f77bcf86cd79943906c"),
      objectId("507f1f77bcf86cd799439072"),
      objectId("507f1f77bcf86cd79943906d"),
      objectId("507f1f77bcf86cd799439067")
    ],
    name: "Playlist 2",
    description: "Description for playlist 2",
    createdAt: new Date("2025-07-15T21:22:02.343506"),
    updatedAt: new Date("2025-07-15T21:22:02.343509")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390cb"),
    owner: objectId("507f1f77bcf86cd799439008"),
    videos: [
      objectId("507f1f77bcf86cd79943906f"),
      objectId("507f1f77bcf86cd799439073"),
      objectId("507f1f77bcf86cd79943906a")
    ],
    name: "Playlist 3",
    description: "Description for playlist 3",
    createdAt: new Date("2025-07-15T21:22:02.343527"),
    updatedAt: new Date("2025-07-15T21:22:02.343530")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390cc"),
    owner: objectId("507f1f77bcf86cd799439005"),
    videos: [
      objectId("507f1f77bcf86cd799439071"),
      objectId("507f1f77bcf86cd79943906f"),
      objectId("507f1f77bcf86cd79943906c"),
      objectId("507f1f77bcf86cd799439072")
    ],
    name: "Playlist 4",
    description: "Description for playlist 4",
    createdAt: new Date("2025-07-15T21:22:02.343544"),
    updatedAt: new Date("2025-07-15T21:22:02.343547")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390cd"),
    owner: objectId("507f1f77bcf86cd79943900a"),
    videos: [
      objectId("507f1f77bcf86cd799439065"),
      objectId("507f1f77bcf86cd799439068")
    ],
    name: "Playlist 5",
    description: "Description for playlist 5",
    createdAt: new Date("2025-07-15T21:22:02.343560"),
    updatedAt: new Date("2025-07-15T21:22:02.343561")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390ce"),
    owner: objectId("507f1f77bcf86cd79943900b"),
    videos: [
      objectId("507f1f77bcf86cd79943906f"),
      objectId("507f1f77bcf86cd799439065"),
      objectId("507f1f77bcf86cd799439072")
    ],
    name: "Playlist 6",
    description: "Description for playlist 6",
    createdAt: new Date("2025-07-15T21:22:02.343568"),
    updatedAt: new Date("2025-07-15T21:22:02.343570")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390cf"),
    owner: objectId("507f1f77bcf86cd799439008"),
    videos: [
      objectId("507f1f77bcf86cd799439072"),
      objectId("507f1f77bcf86cd799439073"),
      objectId("507f1f77bcf86cd79943906d"),
      objectId("507f1f77bcf86cd79943906c"),
      objectId("507f1f77bcf86cd799439068")
    ],
    name: "Playlist 7",
    description: "Description for playlist 7",
    createdAt: new Date("2025-07-15T21:22:02.343578"),
    updatedAt: new Date("2025-07-15T21:22:02.343580")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390d0"),
    owner: objectId("507f1f77bcf86cd79943900c"),
    videos: [
      objectId("507f1f77bcf86cd799439068"),
      objectId("507f1f77bcf86cd79943906f"),
      objectId("507f1f77bcf86cd799439067")
    ],
    name: "Playlist 8",
    description: "Description for playlist 8",
    createdAt: new Date("2025-07-15T21:22:02.343599"),
    updatedAt: new Date("2025-07-15T21:22:02.343601")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390d1"),
    owner: objectId("507f1f77bcf86cd799439003"),
    videos: [
      objectId("507f1f77bcf86cd799439067"),
      objectId("507f1f77bcf86cd799439070"),
      objectId("507f1f77bcf86cd799439069"),
      objectId("507f1f77bcf86cd79943906e"),
      objectId("507f1f77bcf86cd79943906a")
    ],
    name: "Playlist 9",
    description: "Description for playlist 9",
    createdAt: new Date("2025-07-15T21:22:02.343610"),
    updatedAt: new Date("2025-07-15T21:22:02.343612")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390d2"),
    owner: objectId("507f1f77bcf86cd79943900e"),
    videos: [
      objectId("507f1f77bcf86cd799439069"),
      objectId("507f1f77bcf86cd79943906b")
    ],
    name: "Playlist 10",
    description: "Description for playlist 10",
    createdAt: new Date("2025-07-15T21:22:02.343618"),
    updatedAt: new Date("2025-07-15T21:22:02.343620")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390d3"),
    owner: objectId("507f1f77bcf86cd799439001"),
    videos: [
      objectId("507f1f77bcf86cd799439071"),
      objectId("507f1f77bcf86cd79943906e"),
      objectId("507f1f77bcf86cd799439068"),
      objectId("507f1f77bcf86cd799439070")
    ],
    name: "Playlist 11",
    description: "Description for playlist 11",
    createdAt: new Date("2025-07-15T21:22:02.343627"),
    updatedAt: new Date("2025-07-15T21:22:02.343629")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390d4"),
    owner: objectId("507f1f77bcf86cd79943900a"),
    videos: [
      objectId("507f1f77bcf86cd79943906f"),
      objectId("507f1f77bcf86cd79943906e")
    ],
    name: "Playlist 12",
    description: "Description for playlist 12",
    createdAt: new Date("2025-07-15T21:22:02.343635"),
    updatedAt: new Date("2025-07-15T21:22:02.343637")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390d5"),
    owner: objectId("507f1f77bcf86cd799439002"),
    videos: [
      objectId("507f1f77bcf86cd79943906a"),
      objectId("507f1f77bcf86cd79943906d")
    ],
    name: "Playlist 13",
    description: "Description for playlist 13",
    createdAt: new Date("2025-07-15T21:22:02.343643"),
    updatedAt: new Date("2025-07-15T21:22:02.343645")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390d6"),
    owner: objectId("507f1f77bcf86cd79943900b"),
    videos: [
      objectId("507f1f77bcf86cd799439066"),
      objectId("507f1f77bcf86cd79943906b"),
      objectId("507f1f77bcf86cd799439065"),
      objectId("507f1f77bcf86cd79943906a")
    ],
    name: "Playlist 14",
    description: "Description for playlist 14",
    createdAt: new Date("2025-07-15T21:22:02.343653"),
    updatedAt: new Date("2025-07-15T21:22:02.343654")
  },
  {
    _id: objectId("507f1f77bcf86cd7994390d7"),
    owner: objectId("507f1f77bcf86cd79943900b"),
    videos: [
      objectId("507f1f77bcf86cd79943906c"),
      objectId("507f1f77bcf86cd79943906a"),
      objectId("507f1f77bcf86cd799439070"),
      objectId("507f1f77bcf86cd79943906e")
    ],
    name: "Playlist 15",
    description: "Description for playlist 15",
    createdAt: new Date("2025-07-15T21:22:02.343661"),
    updatedAt: new Date("2025-07-15T21:22:02.343662")
  }
];

export default playlists;
