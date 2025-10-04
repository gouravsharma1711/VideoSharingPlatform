import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import {Video,User,Comment,Like,PlayList} from '../models/index.js';
import {uplordOnCloudinary,deleteFromCloudinary} from '../utils/cloudinary.js'
import mongoose from 'mongoose';

const getCurrentUserVideos=asyncHandler(async(req,res)=>{
    const user=req.user;
    
    const userVideos=await Video.aggregate([
        {
            $match:{
                owner:user._id
            }
        },
        {
            $sort:{
                createdAt:-1
            }
        },
        {
            $lookup:{
                from :"users",
                localField:"owner",
                foreignField:"_id",
                as:"owner",
                pipeline:[
                    {
                        $project:{
                            userName:1,
                            avatar:1,
                            _id:1
                        }
                    }
                ]
            }
        },
        {
            $lookup:{
                from:"likes",
                localField:"_id",
                foreignField:"video",
                as:"likes",
            }
        },
        {
            $addFields:{
                likes:{
                    $size:'$likes'
                }
            }
        },
        {
            $project:{
                videoFile:1,
                thumbnail:1,
                title:1,
                duration:1,
                views:1,
                createdAt:1,
                likes:1,
                isPublished:1,
                description:1,
                owner: {
                    $first:"$owner"
                }
            }
        }

    ]
    )
    console.log("user mm :",user);

    if(!userVideos ){
        throw new ApiError(404,"No Videos Found")
    }


    if(userVideos.length===0){
        return res.status(200)
        .json(
            new ApiResponse(200,"Successfully User's Videos are fetched",userVideos)
        )
    }

    res.status(200)
    .json(
        new ApiResponse(200,"Successfully User's Videos are fetched",userVideos)
    )
});

const getUserVideos=asyncHandler(async(req,res)=>{
    const userId=req.params.userId;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400,"UserId is required");
    }
    
    const userVideos=await Video.aggregate([
        {
            $match:{
                owner:new mongoose.Types.ObjectId(userId),
                isPublished:true,
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
                            userName:1,
                            avatar:1,
                        }
                    }
                ]
            }   
        },
        {
            $lookup:{
                from:"likes",
                localField:"_id",
                foreignField:"video",
                as:"likes",
            }
        },

        {
            $addFields:{
                owner:{
                    $first:"$owner"
                },
                likes:{
                    $size:'$likes'
                }
            }
        },
        {
            $project:{
                videoFile:1,
                thumbnail:1,
                title:1,
                duration:1,
                views:1,
                owner:1,
                createdAt:1,
                likes:1,
                description:1
            }
        }
    ])

    if(!userVideos || userVideos.length===0){
        return res.status(200).json(
        new ApiResponse(200,"Successfully User's Videos are fetched",[])
    )
    }
    res.status(200)
    .json(
        new ApiResponse(200,"Successfully User's Videos are fetched",userVideos)
    )
    
})

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query
    console.log("I'm Getting the request from the frontend ");
    const pipeline=[
        {
            $match:{
                isPublished:true,
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
                        userName:1,
                        avatar:1,
                        createdAt:1
                    }
                
                }]
            }
            
        },
        {
            $lookup:{
                from:"likes",
                localField:"_id",
                foreignField:"video",
                as:"likes",
            }
        },
        {
            $addFields:{
                owner:{
                    $first:"$owner"
                },
                likes:{
                    $size:'$likes'
                }
            }
        },
        {
            $project:{
                _id:1,
                thumbnail:1,
                title:1,
                duration:1,
                views:1,
                owner:1,
                likes:1,
                updatedAt:1,
                videoFile:1,
            }
        }
    ];

    const options = {
        page: Math.max(parseInt(page), 1),
        limit: Math.min(Math.max(parseInt(limit), 1), 100)
    };

    const aggregate = Video.aggregate(pipeline);
    const videos = await Video.aggregatePaginate(aggregate, options); 
    console.log("Checking is video is there in db or not");
    if(!videos || !videos.docs|| videos.docs.length===0){
        return  res.status(200).json(
            new ApiResponse(200,"No Videos Found",[])
        )
    }
    console.log("videos are there so response status code is 200");
    
    res.status(200).json(
        new ApiResponse(200,"Successfully Video is Fetched",videos.docs)
    )
})


const publishVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body

    if(!title){
        throw new ApiError(400,"Title is required");
    }

    const loggedInUser=req.user;
    if(!loggedInUser){
        throw new ApiError(403,"You are not authorized to perform this action");
    }

    const user=await User.findById(loggedInUser._id);
    if(!user){
        throw new ApiError(404,"User does not exist");
    }


   // upload the video file on cloudinary and save the url in database
   if(!req.files || !req.files.videoFile || !req.files?.videoFile[0]?.path){
        throw new ApiError(400,"Video File is Required");
   }

    const VideoResponse=await uplordOnCloudinary(req.files.videoFile[0].path,"VSW_Videos");
    if(!VideoResponse){
        throw new ApiError(500,"Failed to upload video");
    }
    let thumbnailResponse=null;
    if(req.files?.thumbnail?.[0]?.path ){
        thumbnailResponse=await uplordOnCloudinary(req.files.thumbnail[0].path,"VSW_Thumbnails"); 
        if(!thumbnailResponse){
            throw new ApiError(500,"Failed to upload thumbnail");
        }
    }

    const VideoData= await Video.create({
        videoFile: VideoResponse.secure_url,
        thumbnail:thumbnailResponse?.secure_url,
        title,
        description,
        owner:user._id,
        duration:VideoResponse.duration || 0,
    });

    if(!VideoData){
        throw new ApiError(500,"Failed to Publish Video");
    }

    res.status(201).json(
        new ApiResponse(201,"Successfully Video Published",VideoData)
    )

})

const getVideoById = asyncHandler(async (req, res) => {
    const { id } = req.params

    if(!id || typeof id.trim()!=='string' || !mongoose.Types.ObjectId.isValid(id) ){
        throw new ApiError(400,"Video Id is not provided or the type of videoId is not perfect");
    }

    const video=await Video.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(id),
                isPublished: true
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
                        $lookup:{
                            from:"subscriptions",
                            localField:"_id",
                            foreignField:"channel",
                            as:"subscribers"
                        }
                    },
                    {
                        $addFields:{
                            subscribersCount:{
                                $size:"$subscribers"
                            }
                        }
                    },
                    {
                        $project: {
                            fullName: 1,
                            avatar: 1,
                            userName: 1,
                            subscribersCount: 1

                        }
                    }
                ]
            }
        },
        {
            $lookup:{
                from:"likes",
                localField:"_id",
                foreignField:"video",
                as:"likes",
            }
        },
        {
            $addFields:{
                owner:{
                    $first:"$owner"
                },
                likes:{
                    $size:'$likes'
                }
            }
        },
        {
            $project:{
                _id:1,
                title:1,
                description:1,
                duration:1,
                views:1,
                thumbnail:1,
                videoFile:1,
                owner:1,
                createdAt:1,
                likes:1
            }
        }
    ])
    if (!video || video.length === 0) {
        throw new ApiError(404, "Video Not Found")
    }
    res.status(200).json(new ApiResponse(200, "Successfully Video is Fetched", video[0]))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!videoId){
        throw new ApiError(400,"Video Id is required");
    }
    if(!req.user){
        throw new ApiError(403,"You are not authorized to perform this action");
    }

    const currVideo=await Video.findById(videoId);
    if(!currVideo){
        throw new ApiError(404,"Video Not Found");
    }
    if(currVideo?.owner?.toString()!==req.user._id.toString()){
        throw new ApiError(403,"You are not authorized to perform this action");
    }

    

    const {title,description}=req.body;
    if(
        [title,description].some((field)=>field?.trim()==='')
    ){
        throw new ApiError(400,"All fields are required");
    }

    const video = await Video.findByIdAndUpdate(
        videoId, 
        {
            $set: {
                title: title.trim(),
                description: description.trim()
            }
        },
        { new: true , runValidators: true} 
    );
    if(!video){
        throw new ApiError(404,"Video Not Found");
    }
    res.status(200).json(new ApiResponse(200,"Successfully Video Updated",video))

})

const updateThumbnail = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    console.log("video Id : ",videoId);
    
    if(!videoId){
        throw new ApiError(400,"Video Id is required");
    }
    if(!req.user){
        throw new ApiError(403,"You are not authorized to perform this action");
    }
    const currVideo=await Video.findById(videoId);
    if(!currVideo){
        throw new ApiError(404,"Video Not Found");
    }
    if(currVideo?.owner?.toString()!==req.user._id.toString()){
        throw new ApiError(403,"You are not authorized to perform this action");
    }

    if(!req.file?.path){
        throw new ApiError(400,"Thumbnail is required");
    }

    if(currVideo.thumbnail){
        const thumbnailUrl=currVideo.thumbnail;
        await deleteFromCloudinary(thumbnailUrl);
    }
    

    const thumbnailResponse=await uplordOnCloudinary(req.file.path,"VSW_Thumbnails");
    currVideo.thumbnail=thumbnailResponse.secure_url;
    await currVideo.save({validateBeforeSave:true});

    res.status(200).json(new ApiResponse(200,"Successfully Thumbnail Updated",currVideo));


})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!videoId || !mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError("400","Video Id is required or the type of videoId is not perfect")
    }
    //TODO: delete video
    if(!req.user){
        throw new ApiError(403,"You are not authorized to perform this action");
    }
    const video=await Video.findById(videoId);
    if(!video){
        throw new ApiError(404,"Video Not Found");
    }

    if(req.user._id.toString() !==video.owner.toString()){
        throw new ApiError(403,"You are not authorized to perform this action");
    }

    await Promise.all([
        Comment.deleteMany({
            video:videoId
        }),
        Like.deleteMany({
            video:videoId
        }),
        PlayList.updateMany(
        { videos: videoId },
        { $pull: { videos: videoId } }),
    ])
    if(video.videoFile)await deleteFromCloudinary(video.videoFile);
    if(video.thumbnail)await deleteFromCloudinary(video.thumbnail);
    await Video.deleteOne({
        _id:videoId
    });

    res.status(200).json(new ApiResponse(200,"Successfully Video Deleted"));


});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!videoId){
        throw new ApiError(400,"Video Id is required");
    }
    if(!req.user){
        throw new ApiError(403,"You are not authorized to perform this action");
    }
    const video=await Video.findById(videoId);
    if(!video){
        throw new ApiError(404,"Video Not Found");
    }
    if(req.user._id.toString()!==video.owner.toString()){
        throw new ApiError(403,"You are not authorized to perform this action");
    }

    video.isPublished=!video.isPublished;
    const status = video.isPublished ? "published" : "unpublished";
    await video.save();
    res.status(200).json(new ApiResponse(200,`Successfully Video Status changes to ${status} `,video));
})

const getSingleView = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findByIdAndUpdate(
        videoId,
        { $inc: { views: 1 } }, 
        { new: true }          
    ).populate({
        path: 'owner',
        select: 'userName avatar'
    });

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    res.status(200).json(new ApiResponse(200, "Video views increased By 1 successfully", {isViewIncreasedByOne: true,currViews:video.views}));
});

export  {
    getUserVideos,
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    updateThumbnail,
    getSingleView,
    getCurrentUserVideos
};
