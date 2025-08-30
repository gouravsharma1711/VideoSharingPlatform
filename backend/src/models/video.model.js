import mongoose from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema=new mongoose.Schema({
    videoFile:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String
    },
    duration:{
        type:Number,
    },
    views:{
        type:Number,
        default:0
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    isPublished:{
        type:Boolean,
        default:true,
    },


},{timestamps:true});

videoSchema.plugin(mongooseAggregatePaginate);

export const Video=mongoose.model("Video",videoSchema);