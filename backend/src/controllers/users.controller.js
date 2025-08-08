import asyncHandler from "../utils/asyncHandler.js";
import {
  User,
  Video,
  Comment,
  Like,
  PlayList,
  Subscription,
} from "../models/index.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import {
  uplordOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000
};

const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();
    if (!refreshToken || !accessToken) {
      throw new ApiError(500, "Failed to generate tokens");
    }
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};
const signUpUser = asyncHandler(async (req, res) => {
  // similarly with the files and in which avatar is reqired field
  // check that the user is not already exists or not
  //upload the files on cloudinary and get the urls(check does upload or not )
  // create a user Object
  // save the data on db
  // send the status code and response

  const { userName, email, fullName, password } = req.body;

  if (
    [userName, email, fullName, password].some((field) => {
      return field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "Some fields are missing");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    res.status(409).json(new ApiResponse(409, "User Already Exists"));
  }
  if (!req.files?.avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;

  let coverImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatarResponse = await uplordOnCloudinary(
    avatarLocalPath,
    "VSW_Avatars"
  );
  let coverImageResponse;
  if (coverImageLocalPath) {
    coverImageResponse = await uplordOnCloudinary(
      coverImageLocalPath,
      "VSW_CoverImages"
    );
  }

  if (!avatarResponse) {
    throw new ApiError(500, "Failed to upload avatar image");
  }

  const user = await User.create({
    userName,
    email,
    fullName,
    password,
    avatar: avatarResponse.secure_url,
    coverImage: coverImageResponse ? coverImageResponse.secure_url : null,
  });

  if (!user) {
    throw new ApiError(500, "Failed to sign up");
  }

  const userData = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  res
    .status(200)
    .json(new ApiResponse(200, "User signed up successfully", userData));
});

const logInUser = asyncHandler(async (req, res) => {
  // get the userName ,email and password from the request body
  // check one of the fields from userName or email is provided
  // check the user exists or not
  // now check the password is correct or not
  // if something went right then generate the refresh token and access token and save the refresh token in th user document
  // send the refresh token and access token in the response through cookies

  const { userName, email, password } = req.body;

  

  if (!userName && !email) {
    throw new ApiError(400, "Please provide either userName or email");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User Does Not Exists");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Incorrect Password");
  }

  const { refreshToken, accessToken } = await generateRefreshAndAccessToken(
    user._id
  );
  const updatedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(200, "Logged In Successfully", updatedUser));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: {
      refreshToken: 1,
    },
  });

  res
    .status(200)
    .clearCookie("refreshToken", cookieOptions)
    .clearCookie("accessToken", cookieOptions)
    .json(new ApiResponse(200, "Logged Out Successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken || !cookies.accessToken) {
    throw new ApiError(403, "User is not Logged In");
  }

  const decodedAccessToken = jwt.verify(
    cookies.accessToken,
    process.env.JWT_ACCESS_TOKEN_SECRET
  );
  const user = await User.findById(decodedAccessToken._id);

  if (cookies.refreshToken !== user.refreshToken) {
    throw new ApiError(403, "Invalid Refresh Token");
  }

  const { refreshToken, accessToken } = await generateRefreshAndAccessToken(
    user._id
  );

  res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(200, "Access Token refreshed", {
        accessToken,
        refreshToken,
      })
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, retypeNewPassword } = req.body;

  const user = await User.findById(req.user._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Old Password is incorrect");
  }
  if (newPassword !== retypeNewPassword) {
    throw new ApiError(
      400,
      "new Password and Retype New Password do not match"
    );
  }
  if (newPassword === oldPassword) {
    throw new ApiError(400, "New Password cannot be same as old password");
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json(new ApiResponse(200, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(403, "User is not logged in");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully", req.user));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(403, "User is not logged in");
  }

  if (!req.file) {
    throw new ApiError(400, "Avatar file is required");
  }

  await deleteFromCloudinary(req.user.avatar);

  const avatarResponse = await uplordOnCloudinary(req.file.path, "VSW_Avatars");

  if (!avatarResponse) {
    throw new ApiError(500, "Failed to upload avatar image");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatarResponse.secure_url,
      },
    },
    {
      new: true,
      select: "-password -refreshToken",
    }
  );

  if (!updatedUser) {
    throw new ApiError(500, "Failed to update avatar");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Avatar uploaded successfully", updatedUser));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(403, "User is not logged in");
  }

  if (!req.file) {
    throw new ApiError(400, "Cover Image file is required");
  }

  if (req.user.coverImage) {
    await deleteFromCloudinary(req.user.coverImage);
  }

  const coverImageResponse = await uplordOnCloudinary(
    req.file.path,
    "VSW_CoverImages"
  );

  if (!coverImageResponse) {
    throw new ApiError(500, "Failed to upload cover Image");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        coverImage: coverImageResponse.secure_url,
      },
    },
    {
      new: true,
      select: "-password -refreshToken",
    }
  );

  if (!updatedUser) {
    throw new ApiError(500, "Failed to update avatar");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Cover image uploaded successfully", updatedUser)
    );
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { userName, email, fullName } = req.body;

  if (
    [userName, email, fullName].some((field) => {
      return field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "Fields cannot be empty");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser && existedUser._id.toString() !== req.user._id.toString()) {
    throw new ApiError(409, "User already exists with this username or email");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        userName,
        email,
        fullName,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw new ApiError(500, "Failed to update account details");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Account details updated successfully", user));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const userName = req.params.userName;

  if (!userName?.trim()) {
    throw new ApiError(400, "UserName is required");
  }

  const user = await User.aggregate([
    {
      $match: {
        userName: userName.trim(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribers: "$subscribers",
        SubscribersCount: {
          $size: "$subscribers",
        },
        subsribedToCount: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        userName: 1,
        fullName: 1,
        avatar: 1,
        coverImage: 1,
        SubscribersCount: 1,
        subsribedToCount: 1,
        isSubscribed: 1,
      },
    },
  ]);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "User profile fetched successfully", user[0]));
});

const getWatchHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(403, "User is not logged in");
  }

  const watchHistory = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(String(userId)),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $match: {
              isPublished: true,
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    userName: 1,
                    fullName: 1,
                    avatar: 1,
                    coverImage: 1,
                    createdAt: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: { $first: "$owner" },
            },
          },
          {
            $project: {
              _id: 1,
              owner: 1,
              videoFile: 1,
              thumbnail: 1,
              title: 1,
              description: 1,
              duration: 1,
              createdAt: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$watchHistory",
    },
    {
      $replaceRoot: {
        newRoot: "$watchHistory",
      },
    },
  ]);
  
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Watch History fetched successfully",
        watchHistory
      )
    );
});

const clearAllWatchHistory=asyncHandler(async(req,res)=>{
  // get the current user id
  // if user Id is no there then throw an error
   // find the user by id
   // clear the whole array watchHisory field
   // save it back to the database
   const userId=req.user._id;
   if(!userId){
     throw new ApiError(403,"User is not logged in")
   }

   const currUser=await User.findById(userId);
   if(!currUser){
    throw new ApiError(404,"User not found")
   }
   if(currUser.watchHistory.length===0){
    throw new ApiError(400,"No Watch History Found")
   }
   currUser.watchHistory=[];
   await currUser.save();
   res.status(200).json(new ApiResponse(200,"Watch History cleared successfully"))

})

const deleteAccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(403, "User is not logged in");
  }

  // get the user video ids
  const userVideos = await Video.find({ owner: userId }, { _id: 1 }).lean();
  const userVideosIds = userVideos.map((v) => v._id);

  // get all the comments written by the user
  const userComments = await Comment.find({ owner: userId }, { _id: 1 }).lean();
  const userCommentsIds = userComments.map((c) => c._id);

  // delete the everthing
  await Promise.all([
    Video.deleteMany({ owner: userId }),
    Comment.deleteMany({
      $or: [
        { owner: userId },
        {
          video: {
            $in: userVideosIds,
          },
        },
      ],
    }),
    Subscription.deleteMany({
      $or: [{ channel: userId }, { subscriber: userId }],
    }),
    PlayList.deleteMany({ owner: userId }),
    Like.deleteMany({
      $or: [
        { likedBy: userId },
        {
          video: {
            $in: userVideosIds,
          },
        },
        {
          comment: {
            $in: userCommentsIds,
          },
        },
      ],
    }),
  ]);

  // delete the user
  await User.deleteOne({ _id: userId });
  res
    .status(200)
    .clearCookie("refreshToken", cookieOptions)
    .clearCookie("accessToken", cookieOptions)
    .json(new ApiResponse(200, "Account deleted successfully"));
});

const updateWatchHistory = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(403, "User is not logged in");
  }
  const { videoId } = req.params;
  if (
    !videoId ||
    mongoose.Types.ObjectId.isValid(videoId) == false ||
    typeof videoId !== "string"
  ) {
    throw new ApiError(400, "Video Id is required");
  }
  const currUser = await User.findById(user._id);
  if (!currUser) {
    throw new ApiError(404, "User not found");
  }

  currUser.watchHistory = currUser.watchHistory.filter(
    (id) => id.toString() !== videoId.toString()
  );
  currUser.watchHistory.unshift(videoId);

  if (currUser.watchHistory.length > 50) {
    currUser.watchHistory = currUser.watchHistory.slice(0, 50);
  }
  currUser.save({ validateBeforeSave: false });
  res
    .status(200)
    .json(new ApiResponse(200, "Watch history updated successfully"));
});
export {
  signUpUser,
  logoutUser,
  logInUser,
  refreshAccessToken,
  getCurrentUser,
  changeCurrentPassword,
  updateUserAvatar,
  updateUserCoverImage,
  updateAccountDetails,
  getUserChannelProfile,
  getWatchHistory,
  deleteAccount,
  updateWatchHistory,
  clearAllWatchHistory
};
