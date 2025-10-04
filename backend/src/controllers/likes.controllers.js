import mongoose, {isValidObjectId} from "mongoose"
import {Like,Comment} from "../models/index.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const user=req.user;
    if(!videoId || !mongoose.Types.ObjectId.isValid(videoId) || typeof videoId !== 'string'){
        throw new ApiError(400,'Invalid Video Id')
    }
    if(!user){
        throw ApiError(401,"Unauthorized User")
    }
    const exsistedLike=await Like.findOne({
        video:videoId.trim(),
        likedBy:user._id
    })

    if(exsistedLike){
        await Like.deleteOne({
            likedBy:user._id,
            video:videoId.trim()
        })
        return res.status(200).json(
            new ApiResponse(200,"Video is Disliked",{ 
                liked:false
            })
        )
    }

    const newLike=await Like.create({
        video:videoId.trim(),
        likedBy:user._id
    })
    if(!newLike){
        throw new ApiError(500,"Internal Server Error")
    }
    res.status(200)
    .json(new ApiResponse(200,"Video is Liked",{
        liked:true
    }))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    const user=req.user;
    if(!commentId || !mongoose.Types.ObjectId.isValid(commentId) || typeof commentId !== 'string'){
        throw new ApiError(400,'Invalid commentId Id')
    }
    if(!user){
        throw ApiError(401,"Unauthorized User")
    }
    const exsistedLike=await Like.findOne({
        comment:commentId.trim(),
        likedBy:user._id
    })

    if(exsistedLike){
        await Like.deleteOne({
            comment:commentId.trim(),
            likedBy:user._id
        })
        return res.status(200).json(
            new ApiResponse(200,"Comment is Disliked",{ 
                liked:false
            })
        )
    }

    const newLike=await Like.create({
        comment:commentId.trim(),
        likedBy:user._id
    })
    if(!newLike){
        throw new ApiError(500,"Internal Server Error")
    }
    res.status(200)
    .json(new ApiResponse(200,"Comment is Liked",{
        liked:true
    }))
})

const getLikedVideos = asyncHandler(async (req, res) => {
    const user=req.user;
    if(!user){
        throw new ApiError(401,"Unauthorized User")
    }
    
    const pipeLine=[
        {
            $match:{
                likedBy:user._id
            }
        },
        {
            $lookup:{
                from:"videos",
                localField:'video',
                foreignField:'_id',
                as:'video',
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:'owner',
                            foreignField:'_id',
                            as:'owner',
                            pipeline:[
                                {
                                    $project:{
                                        userName:1,
                                        avatar:1,
                                    }
                                }
                            ]
                        },
                    }, 
                    {
                        $addFields:{
                            owner:{
                                $first:'$owner'
                            }
                        }
                    },
                    {
                        $project:{
                            _id:1,
                            videoFile:1,
                            thumbnail:1,
                            title:1,
                            duration:1,
                            createdAt:1,
                            views:1,
                            owner:1
                        }
                    },
                ]
            }
        },
        {
           $addFields:{
            video:{
                $first:'$video'
            }
           } 
        },
        {
            $match: {
                video: { $ne: null }
            }
        },
        {
            $replaceRoot:{
                newRoot:'$video'
            }
        }  
        
    ]
    const likedVideos=await Like.aggregate(pipeLine);
    
    if(!likedVideos || likedVideos.length===0){
        return res.status(200).json(
            new ApiResponse(200,"User does not liked any Videos",[])
        )
    }

    res.status(200).json(
        new ApiResponse(200,"Liked Videos Fetched SuccessFully ",likedVideos)
    )
})


const isCurrentUserLikedTheComment=asyncHandler(async(req,res)=>{
    
    const {userId,commentId}=req.body;

    const comment = await Like.findOne({
        comment: commentId,
        likedBy: userId,
    });

    console.log("Comment : ",comment);
    

    if(!comment){
        return res.status(200).json(new ApiResponse(200,"User not Liked This Comment",{liked:false}))
    }
    res.status(200).json(new ApiResponse(200,"User Liked This Comment",{liked:true}))
})


const isCurrentUserLikedTheVideo=asyncHandler(async(req,res)=>{
    const {userId,videoId}=req.body;
    console.log("userId : ",userId," type  : ",typeof userId);
    console.log("videoId : ",videoId," type  : ",typeof videoId);
    
    const video = await Like.findOne({
        video: videoId,
        likedBy: userId,
    });

    if(!video){
        return res.status(200).json(new ApiResponse(200,"User not Liked This Video",{liked:false}))
    }
    res.status(200).json(new ApiResponse(200,"User Liked This video",{liked:true}))
})


export {
    toggleCommentLike,
    toggleVideoLike,
    getLikedVideos,
    isCurrentUserLikedTheComment,
    isCurrentUserLikedTheVideo
}