import mongoose from "mongoose"
import {Like,Subscription,User, Video} from "../models/index.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    
    const user = req.user;
    if (!user) {
        throw new ApiError(401, "Unauthorized User. Please log in.");
    }

    // Total Views of All Uploaded Videos
    const viewsResult = await Video.aggregate([
        { $match: { owner: user._id } },
        { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]);
    const totalViews = viewsResult[0]?.totalViews || 0;

    // Total Number of Videos Uploaded
    const totalVideoUploaded = await Video.countDocuments({ owner: user._id });

    // Get all video IDs of the user
    const videoIds = await Video.distinct("_id", { owner: user._id });

    // Total Likes on User's Videos
    const totalLikes = await Like.countDocuments({ video: { $in: videoIds } });

    // Total Subscribers to the Channel
    const totalSubscribers = await Subscription.countDocuments({ channel: user._id });

    res.status(200).json(
        new ApiResponse(200, "Channel Stats Fetched Successfully", {
            user,
            totalViews,
            totalLikes,
            totalSubscribers,
            totalVideoUploaded
        })
    );
});


export {
    getChannelStats
}