import mongoose from "mongoose";

const PlaylistSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    videos:[
        {
        type:mongoose.Types.ObjectId,
        ref:"Video"
    }],
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:null
    }

},{timestamps:true});

export const PlayList=new mongoose.model("PlayList",PlaylistSchema);