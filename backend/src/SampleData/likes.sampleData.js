import mongoose from "mongoose";

const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

const objectId = (id) => {
  if (!isValidObjectId(id)) {
    throw new Error(`Invalid ObjectId: ${id}`);
  }
  return new mongoose.Types.ObjectId(id);
};

const likes = [
  {
    _id: objectId("507f1f77bcf86cd7994391f5"),
    likedBy: objectId("507f1f77bcf86cd799439008"),
    video: objectId("507f1f77bcf86cd799439068"),
    comment: objectId("507f1f77bcf86cd799439198"),
    createdAt: new Date("2025-07-15T21:22:02.344325"),
    updatedAt: new Date("2025-07-15T21:22:02.344328")
  },
  {
    _id: objectId("507f1f77bcf86cd7994391f6"),
    likedBy: objectId("507f1f77bcf86cd79943900b"),
    video: objectId("507f1f77bcf86cd799439071"),
    comment: objectId("507f1f77bcf86cd799439198"),
    createdAt: new Date("2025-07-15T21:22:02.344332"),
    updatedAt: new Date("2025-07-15T21:22:02.344334")
  },
  {
    _id: objectId("507f1f77bcf86cd7994391f7"),
    likedBy: objectId("507f1f77bcf86cd799439008"),
    video: objectId("507f1f77bcf86cd799439067"),
    comment: objectId("507f1f77bcf86cd799439197"),
    createdAt: new Date("2025-07-15T21:22:02.344341"),
    updatedAt: new Date("2025-07-15T21:22:02.344344")
  },
  {
    _id: objectId("507f1f77bcf86cd7994391f8"),
    likedBy: objectId("507f1f77bcf86cd79943900f"),
    video: objectId("507f1f77bcf86cd79943906f"),
    comment: objectId("507f1f77bcf86cd79943919a"),
    createdAt: new Date("2025-07-15T21:22:02.344350"),
    updatedAt: new Date("2025-07-15T21:22:02.344353")
  },
  {
    _id: objectId("507f1f77bcf86cd7994391f9"),
    likedBy: objectId("507f1f77bcf86cd79943900b"),
    video: objectId("507f1f77bcf86cd799439073"),
    comment: objectId("507f1f77bcf86cd799439193"),
    createdAt: new Date("2025-07-15T21:22:02.344358"),
    updatedAt: new Date("2025-07-15T21:22:02.344361")
  },
  {
    _id: objectId("507f1f77bcf86cd7994391fa"),
    likedBy: objectId("507f1f77bcf86cd79943900e"),
    video: objectId("507f1f77bcf86cd799439071"),
    comment: objectId("507f1f77bcf86cd79943919b"),
    createdAt: new Date("2025-07-15T21:22:02.344368"),
    updatedAt: new Date("2025-07-15T21:22:02.344371")
  },
  {
    _id: objectId("507f1f77bcf86cd7994391fb"),
    likedBy: objectId("507f1f77bcf86cd79943900f"),
    video: objectId("507f1f77bcf86cd79943906b"),
    comment: objectId("507f1f77bcf86cd79943919e"),
    createdAt: new Date("2025-07-15T21:22:02.344376"),
    updatedAt: new Date("2025-07-15T21:22:02.344378")
  },
  {
    _id: objectId("507f1f77bcf86cd7994391fc"),
    likedBy: objectId("507f1f77bcf86cd79943900b"),
    video: objectId("507f1f77bcf86cd799439067"),
    comment: objectId("507f1f77bcf86cd79943919f"),
    createdAt: new Date("2025-07-15T21:22:02.344383"),
    updatedAt: new Date("2025-07-15T21:22:02.344385")
  },
  {
    _id: objectId("507f1f77bcf86cd7994391fd"),
    likedBy: objectId("507f1f77bcf86cd799439003"),
    video: objectId("507f1f77bcf86cd799439069"),
    comment: objectId("507f1f77bcf86cd799439198"),
    createdAt: new Date("2025-07-15T21:22:02.344389"),
    updatedAt: new Date("2025-07-15T21:22:02.344391")
  },
  {
    _id: objectId("507f1f77bcf86cd7994391fe"),
    likedBy: objectId("507f1f77bcf86cd79943900b"),
    video: objectId("507f1f77bcf86cd799439073"),
    comment: objectId("507f1f77bcf86cd79943919c"),
    createdAt: new Date("2025-07-15T21:22:02.344394"),
    updatedAt: new Date("2025-07-15T21:22:02.344396")
  },
  {
    _id: objectId("507f1f77bcf86cd7994391ff"),
    likedBy: objectId("507f1f77bcf86cd799439002"),
    video: objectId("507f1f77bcf86cd799439069"),
    comment: objectId("507f1f77bcf86cd799439197"),
    createdAt: new Date("2025-07-15T21:22:02.344400"),
    updatedAt: new Date("2025-07-15T21:22:02.344401")
  },
  {
    _id: objectId("507f1f77bcf86cd799439200"),
    likedBy: objectId("507f1f77bcf86cd799439005"),
    video: objectId("507f1f77bcf86cd79943906b"),
    comment: objectId("507f1f77bcf86cd799439193"),
    createdAt: new Date("2025-07-15T21:22:02.344405"),
    updatedAt: new Date("2025-07-15T21:22:02.344407")
  },
  {
    _id: objectId("507f1f77bcf86cd799439201"),
    likedBy: objectId("507f1f77bcf86cd79943900c"),
    video: objectId("507f1f77bcf86cd799439067"),
    comment: objectId("507f1f77bcf86cd799439195"),
    createdAt: new Date("2025-07-15T21:22:02.344410"),
    updatedAt: new Date("2025-07-15T21:22:02.344412")
  },
  {
    _id: objectId("507f1f77bcf86cd799439202"),
    likedBy: objectId("507f1f77bcf86cd799439004"),
    video: objectId("507f1f77bcf86cd79943906d"),
    comment: objectId("507f1f77bcf86cd799439194"),
    createdAt: new Date("2025-07-15T21:22:02.344415"),
    updatedAt: new Date("2025-07-15T21:22:02.344417")
  },
  {
    _id: objectId("507f1f77bcf86cd799439203"),
    likedBy: objectId("507f1f77bcf86cd799439006"),
    video: objectId("507f1f77bcf86cd79943906f"),
    comment: objectId("507f1f77bcf86cd79943919e"),
    createdAt: new Date("2025-07-15T21:22:02.344427"),
    updatedAt: new Date("2025-07-15T21:22:02.344430")
  }
];

export default likes;
