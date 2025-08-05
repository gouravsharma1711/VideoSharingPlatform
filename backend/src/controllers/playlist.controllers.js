import mongoose, {isValidObjectId} from "mongoose"
import { PlayList } from "../models/index.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    // check name field is given or not
    // check get userDetails from req.user and store it in the user
    // create playlist with the name and description and add the the user._id in the owner
    if(!name){
        throw new ApiError(400,"name field is required");
    }
    if(description && typeof description!=='string'){
        throw new ApiError(400,"Please enter the correct Description")
    }
    const user=req.user;
    
    const playlist=await PlayList.create({
        name,
        owner:user._id,
        description:description?.trim() || null
    })
    if(!playlist){
        throw new ApiError(500,"Playlist creation Failed")
    }

    res.status(200).json(
        new ApiResponse(200,"Playlist is SuccessFully Created",playlist)
    )
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params;

    if(!userId || typeof userId!=='string' || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400,"UserId is required")
    }
    const UserPlaylists=await PlayList.find({
        owner:userId
    }).select(
        ' -owner'
    )

    if(!UserPlaylists || UserPlaylists.length===0){
        return res.status(200).json(
            new ApiResponse(200,"No Playlist Found for this User",[])
        )
    }

    res.status(200).json(
        new ApiResponse(200,"Playlist Data Fetched Successfully",UserPlaylists)
    )
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const playlist= await PlayList.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(playlistId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"user",
                pipeline:[
                    {
                        $project:{
                            _id:1,
                            userName:1,
                            fullName:1,
                            avatar:1,
                        }
                    }
                ]
            },

        },
        {
            $lookup:{
                from:"videos",
                localField:"videos",
                foreignField:"_id",
                as:"playListVideos",
                pipeline:[
                    {
                        $match:{
                            isPublished:true
                        }
                    },
                    {
                        $lookup:{
                            from:"users",
                            foreignField:"_id",
                            localField:"owner",
                            as:"owner",
                            pipeline:[
                                {
                                    $project:{
                                        avatar:1,
                                        userName:1,
                                        fullName:1,
                                        coverImage:1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $project:{
                            _id:1,
                            videoFile:1,
                            thumbnail:1,
                            title:1,
                            description:1,
                            duration:1,
                            views:1,
                            createdAt:1,
                            owner:{
                                $first:"$owner"
                            }
                        }
                    }
                ]
            }
        },  
        {
            $addFields:{
                user:{
                    $first:'$user'
                },
                playListVideos:"$playListVideos"
            }
        },
        {
            $project:{
                user:1,
                playListVideos:1,
                name:1,
                description:1,
                createdAt:1,
            }
        }
    ])
    if(!playlist || playlist.length===0){
        throw new ApiError(404,"Playlist Data is not Fetched SuccessFully")
    }

    res.status(200).json(
        new ApiResponse(200,"Playlist Data is Fetched Successfully",playlist[0])
    )

})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params;

    if(!videoId || !mongoose.Types.ObjectId.isValid(videoId) || typeof videoId!=='string'){
        throw new ApiError(400,"Video Id is required")
    }
    if(!playlistId || !mongoose.Types.ObjectId.isValid(playlistId) || typeof playlistId!=='string'){
        throw new ApiError(400,"PlaylistId is required")
    }
    const existingPlaylist = await PlayList.findById(playlistId);
    if (!existingPlaylist) {
        throw new ApiError(404, "Playlist not found");
    }
    if(existingPlaylist.owner.toString()!==req.user._id.toString()){
        throw new ApiError(403,"You are not authorized to update this playlist")
    }
    if (existingPlaylist.videos.includes(new mongoose.Types.ObjectId(videoId))) {
        throw new ApiError(400, "This Video is already added to the playlist");
    }
    const updatedPlaylist = await PlayList.findOneAndUpdate(
        {_id: playlistId},
        {$addToSet:{videos:videoId}},
        {new:true}
    );
    if (!updatedPlaylist) {
        throw new ApiError(500, "Failed to add video to playlist");
    }
    res.status(200).json(
        new ApiResponse(200, "Video Added To Playlist Successfully", updatedPlaylist)
    )
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    
    if(!videoId || !mongoose.Types.ObjectId.isValid(videoId) || typeof videoId!=='string'){
        throw new ApiError(400,"Video Id is required")
    }
    if(!playlistId || !mongoose.Types.ObjectId.isValid(playlistId) || typeof playlistId!=='string'){
        throw new ApiError(400,"PlaylistId is required")
    }

    const existingPlaylist = await PlayList.findById(playlistId);
    if (!existingPlaylist) {
        throw new ApiError(404, "Playlist not found");
    }
    if (existingPlaylist.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this playlist");
    }
    if (!existingPlaylist.videos.includes(new mongoose.Types.ObjectId(videoId))) {
        throw new ApiError(400, "This Video is already removed from the playlist");
    }
    const updatedPlaylist = await PlayList.findOneAndUpdate(
        {_id: playlistId},
        {$pull:{videos:videoId}},
        {new:true}
    );
    if (!updatedPlaylist) {
        throw new ApiError(500, "Failed to remove video from playlist");
    }
    res.status(200).json(
        new ApiResponse(200, "Video Removed From Playlist Successfully", updatedPlaylist)
    )

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    if(!playlistId || !mongoose.Types.ObjectId.isValid(playlistId) || typeof playlistId!=='string'){
        throw new ApiError(400,"PlaylistId is  required")
    }
    const existingPlaylist = await PlayList.findById(playlistId);
    if (!existingPlaylist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (existingPlaylist.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this playlist");
    }
    const deletePlaylist=await PlayList.deleteOne({
        _id:playlistId.trim()
    })
    if(deletePlaylist?.deletedCount===0){
        throw new ApiError(500,"Internet Server Error or Unknow reason")
    }
    res.status(200).json(
        new ApiResponse(200,"Playlist is Deleted SuccessFully")
    )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body;
    
    if(!playlistId || !mongoose.Types.ObjectId.isValid(playlistId) || typeof playlistId!=='string'){
        throw new ApiError(400,"PlaylistId is Required")
    }
    const existingPlaylist = await PlayList.findById(playlistId);
    if (!existingPlaylist) {
        throw new ApiError(404, "Playlist not found");
    }
    if (existingPlaylist.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this playlist");
    }
    if(name && typeof name !== 'string'){
        throw new ApiError(400,"Name must be a string")
    }
    const playlist=await PlayList.findByIdAndUpdate(
        playlistId,
        {
            name:name?.trim(),
            description:description?.trim()||null,
        },
        {
            new:true,
            runValidators:true
        }
    )
    if(!playlist){
        throw new ApiError(500,"Update Playlist Failed")
    }
    res.status(200).json(
        new ApiResponse(200,"Playlist Updated Successfully",playlist)
    )

})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}