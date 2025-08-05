import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const likesSchema = new mongoose.Schema({
   comment:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Comment'
   },
   likedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },
   video:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Video"
   }
},{timestamps:true});

likesSchema.plugin(mongooseAggregatePaginate);

export const Like=new mongoose.model('Like',likesSchema)