import mongoose from "mongoose"
import {Comment,Like} from "../models/index.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

    if(!videoId || !mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(400,"VideoId is required field");
    }


    const pipeLine=[
        {
            $match:{
                video:new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $sort:{
                createdAt:-1
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"owner",
                pipeline:[
                    {
                        $project:{
                            _id:1,
                            userName:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
        {
            $lookup:{
                from:"likes",
                localField:"_id",
                foreignField:"comment",
                as:"comments",
            }
        },
        {
            $addFields:{
                owner:{
                    $first:"$owner"
                },
                likesCount:{
                    $size:"$comments"
                }
            }
        },
        {
            $project:{
                _id:1,
                content:1,
                createdAt:1,
                owner:1,
                updatedAt:1,
                likesCount:1
            }
        }
    ]
    
    const options={
        page: Math.max(parseInt(page), 1),
        limit: Math.min(Math.max(parseInt(limit), 1), 100)
    }

    const aggregate=Comment.aggregate(pipeLine);
    const comments=await Comment.aggregatePaginate(aggregate, options);
    
    if(!comments ||!comments.docs || comments?.docs?.length==0){
        new ApiResponse(200,"There is not Comments present for this Video ",[])
    }

    res.status(200).json(
        new ApiResponse(200,"Comments Fetches Successfully",comments.docs)
    )
})

const addComment = asyncHandler(async (req, res) => {
    const {videoId}=req.params;
    const user=req.user;
    const {content}=req.body;

    if(!videoId || !mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(400,"Video Id is Required Field");
    }
    if(!user){
        throw new ApiError(403,"User is  not logged in");
    }
    if(!content || typeof(content)!=="string"){
        throw new ApiError(400,"Content is Required Field");
    }

    const comment=await Comment.create({
        video:videoId,
        content,
        owner:user._id
    })
    if(!comment){
        throw new ApiError(500,"Something went wrong while creating the comment");
    }
    res.status(201).json(new ApiResponse(201,"Comment Created Successfully",comment))


})



const updateComment = asyncHandler(async (req, res) => {
    const {content}=req.body;
    const {commentId}=req.params;
    const user=req.user;

    if(!commentId || !mongoose.Types.ObjectId.isValid(commentId)){
        throw new ApiError(400,"Comment Id is Required Field");
    }

    if(!content || typeof(content)!=="string" || content.trim()===""){
        throw new ApiError(400,"Content is Required Field");
    }

    if(!user){
        throw new ApiError(403,"User is  not logged in");
    }

    const comment =await Comment.findById(commentId);
    if(!comment){
        throw new ApiError(404,"Comment Not found");
    }

    if(user._id.toString()!==comment.owner.toString()){
        throw new ApiError(403,"You are not authorized to update this comment");
    }

    comment.content=content.trim();
    const updatedComment=await comment.save({validateBeforeSave:false});
    if(!updatedComment){
        throw new ApiError(500,"Something went wrong while updating the comment");
    }
    res.status(200).json(new ApiResponse(200,"Comment Updated Successfully",updatedComment));

})

const deleteComment = asyncHandler(async (req, res) => {
    const {commentId}=req.params;
    if(!commentId || !mongoose.Types.ObjectId.isValid(commentId)){
        throw new ApiError(400,"Comment Id is Required Field");
    }
    const user=req.user;
    if(!user){
        throw new ApiError(403,"User is  not logged in");
    }
    const comment=await Comment.findById(commentId);
    if(!comment){
        throw new ApiError(404,"Comment Not found");
    }

    if(user._id.toString()!==comment.owner.toString()){
        throw new ApiError(403,"You are not authorized to delete this comment");
    }

    await Like.deleteMany({comment:commentId});
    const deletedComment= await Comment.findByIdAndDelete(commentId);

    if(!deletedComment){
        throw new ApiError(404,"Comment Not found");
    }
    res.status(200).json(new ApiResponse(200,"Comment Deleted Successfully",deletedComment));
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
}