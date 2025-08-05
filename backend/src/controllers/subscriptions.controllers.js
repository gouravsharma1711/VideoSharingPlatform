import mongoose, {isValidObjectId} from "mongoose"
import {Subscription} from '../models/index.js';
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    console.log("Channel Id in Controller : ",channelId);
    
    if(!channelId || typeof channelId !=='string'|| !mongoose.Types.ObjectId.isValid(channelId)){
        throw new ApiError(400, `Invalid Channel Id ${channelId}`)
    }

    const user=req.user;
    if(!user){
        throw new ApiError(401,'User is not Logged In');
    }

    let existedUser=await Subscription.findOne({
        channel:channelId,
        subscriber:user._id
    });
    if(!existedUser){
        await Subscription.create({
            channel:channelId,
            subscriber:user._id
        });

        return res.status(200).json(
            new ApiResponse(200,"Subscribed",{ subscribed: true })
        )
    }

    
        await Subscription.deleteOne({
            channel:channelId,
            subscriber:user._id
        })

        res.status(200).json(
            new ApiResponse(200,"Unsubscribed",{ subscribed: false })
        )
})

 // controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    if(!channelId || typeof channelId !=='string'|| !mongoose.Types.ObjectId.isValid(channelId)){
        throw new ApiError(400, `Invalid Channel Id ${channelId}`)
    }

    const userSubscriberToChannel=await Subscription.aggregate([
        {
            $match:{
                channel:new mongoose.Types.ObjectId(String(channelId))
            }
        },
        {
            $lookup:{
                from:"users",
                foreignField:"_id",
                localField:"subscriber",
                as:"subscriber",
                pipeline:[
                    {
                        $project:{
                            _id:1,
                            userName:1,
                            avatar:1,
                            createdAt:1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$subscriber" 
        },
        {
            $replaceRoot: { newRoot: "$subscriber" }
        }
    ]);

    if(!userSubscriberToChannel || userSubscriberToChannel.length===0){
        return res.status(200).json(new ApiResponse(200,"No subscribers yet"));
    }
    res.status(200).json(new ApiResponse(200,"Success",userSubscriberToChannel));

})



// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { channelId   } = req.params
    const subscriberId=channelId;
    if(!subscriberId  || typeof subscriberId  !=='string'|| !mongoose.Types.ObjectId.isValid(subscriberId )){
        throw new ApiError(400, `Invalid Channel Id ${subscriberId }`)
    }

    const channelListUserSubscribed=await Subscription.aggregate([
        {
            $match:{
                subscriber:new mongoose.Types.ObjectId(String(subscriberId ))
            },
        },
        {
            $lookup:{
                from:"users",
                foreignField:"_id",
                localField:"channel",
                as:"channel",
                pipeline:[
                    {
                        $lookup:{
                            from:"subscriptions",
                            localField:"_id",
                            foreignField:"channel",
                            as:"Subscribers"
                        }
                    },
                    {
                        $addFields:{
                            subscribersCount:{$size:"$Subscribers"}
                        }
                    },
                    {
                        $project:{
                            _id:1,
                            userName:1,
                            avatar:1,
                            createdAt:1,
                            subscribersCount:1
                        }
                    }
                ]
            }
        },
        {
            $unwind:"$channel"
        },
        {
            $replaceRoot:{newRoot:"$channel"}
        }
    ])

    if(!channelListUserSubscribed|| channelListUserSubscribed.length === 0){
        return res.status(200).json(new ApiResponse(200,"You have no subscriptions"));
    }

    res.status(200).json(new ApiResponse(200,"Success",channelListUserSubscribed));
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}