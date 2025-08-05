import mongoose from "mongoose";

const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

const objectId = (id) => {
  if (!isValidObjectId(id)) {
    throw new Error(`Invalid ObjectId: ${id}`);
  }
  return new mongoose.Types.ObjectId(id);
};

const subscriptions = [
  {
    _id: objectId("507f1f77bcf86cd799439012"),
    subscriber: objectId("507f1f77bcf86cd79943900a"),
    channel: objectId("507f1f77bcf86cd799439001"),
    createdAt: new Date("2025-07-15T21:22:02.343865"),
    updatedAt: new Date("2025-07-15T21:22:02.343868")
  },
  {
    _id: objectId("507f1f77bcf86cd799439013"),
    subscriber: objectId("507f1f77bcf86cd79943900b"),
    channel: objectId("507f1f77bcf86cd799439001"),
    createdAt: new Date("2025-07-15T21:22:02.343875"),
    updatedAt: new Date("2025-07-15T21:22:02.343876")
  },
  {
    _id: objectId("507f1f77bcf86cd799439014"),
    subscriber: objectId("507f1f77bcf86cd799439003"),
    channel: objectId("507f1f77bcf86cd79943900e"),
    createdAt: new Date("2025-07-15T21:22:02.343882"),
    updatedAt: new Date("2025-07-15T21:22:02.343884")
  },
  {
    _id: objectId("507f1f77bcf86cd799439015"),
    subscriber: objectId("507f1f77bcf86cd799439005"),
    channel: objectId("507f1f77bcf86cd799439009"),
    createdAt: new Date("2025-07-15T21:22:02.343889"),
    updatedAt: new Date("2025-07-15T21:22:02.343890")
  },
  {
    _id: objectId("507f1f77bcf86cd799439016"),
    subscriber: objectId("507f1f77bcf86cd79943900b"),
    channel: objectId("507f1f77bcf86cd79943900f"),
    createdAt: new Date("2025-07-15T21:22:02.343896"),
    updatedAt: new Date("2025-07-15T21:22:02.343897")
  },
  {
    _id: objectId("507f1f77bcf86cd799439017"),
    subscriber: objectId("507f1f77bcf86cd799439001"),
    channel: objectId("507f1f77bcf86cd799439004"),
    createdAt: new Date("2025-07-15T21:22:02.343903"),
    updatedAt: new Date("2025-07-15T21:22:02.343904")
  },
  {
    _id: objectId("507f1f77bcf86cd799439018"),
    subscriber: objectId("507f1f77bcf86cd79943900a"),
    channel: objectId("507f1f77bcf86cd799439005"),
    createdAt: new Date("2025-07-15T21:22:02.343909"),
    updatedAt: new Date("2025-07-15T21:22:02.343911")
  },
  {
    _id: objectId("507f1f77bcf86cd799439019"),
    subscriber: objectId("507f1f77bcf86cd79943900d"),
    channel: objectId("507f1f77bcf86cd799439006"),
    createdAt: new Date("2025-07-15T21:22:02.343918"),
    updatedAt: new Date("2025-07-15T21:22:02.343920")
  },
  {
    _id: objectId("507f1f77bcf86cd79943901a"),
    subscriber: objectId("507f1f77bcf86cd799439001"),
    channel: objectId("507f1f77bcf86cd79943900c"),
    createdAt: new Date("2025-07-15T21:22:02.343926"),
    updatedAt: new Date("2025-07-15T21:22:02.343928")
  },
  {
    _id: objectId("507f1f77bcf86cd79943901b"),
    subscriber: objectId("507f1f77bcf86cd799439009"),
    channel: objectId("507f1f77bcf86cd79943900b"),
    createdAt: new Date("2025-07-15T21:22:02.343933"),
    updatedAt: new Date("2025-07-15T21:22:02.343935")
  },
  {
    _id: objectId("507f1f77bcf86cd79943901c"),
    subscriber: objectId("507f1f77bcf86cd799439003"),
    channel: objectId("507f1f77bcf86cd79943900d"),
    createdAt: new Date("2025-07-15T21:22:02.343939"),
    updatedAt: new Date("2025-07-15T21:22:02.343941")
  },
  {
    _id: objectId("507f1f77bcf86cd79943901d"),
    subscriber: objectId("507f1f77bcf86cd799439001"),
    channel: objectId("507f1f77bcf86cd799439009"),
    createdAt: new Date("2025-07-15T21:22:02.343946"),
    updatedAt: new Date("2025-07-15T21:22:02.343948")
  },
  {
    _id: objectId("507f1f77bcf86cd79943901e"),
    subscriber: objectId("507f1f77bcf86cd799439006"),
    channel: objectId("507f1f77bcf86cd799439008"),
    createdAt: new Date("2025-07-15T21:22:02.343953"),
    updatedAt: new Date("2025-07-15T21:22:02.343955")
  },
  {
    _id: objectId("507f1f77bcf86cd79943901f"),
    subscriber: objectId("507f1f77bcf86cd79943900b"),
    channel: objectId("507f1f77bcf86cd799439006"),
    createdAt: new Date("2025-07-15T21:22:02.343960"),
    updatedAt: new Date("2025-07-15T21:22:02.343961")
  },
  {
    _id: objectId("507f1f77bcf86cd799439020"),
    subscriber: objectId("507f1f77bcf86cd79943900e"),
    channel: objectId("507f1f77bcf86cd799439003"),
    createdAt: new Date("2025-07-15T21:22:02.343966"),
    updatedAt: new Date("2025-07-15T21:22:02.343967")
  }
];

export default subscriptions;
