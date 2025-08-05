import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js'
const auth=asyncHandler(async(req,_,next)=>{
    // check for cookies if access and refresh token is there that means user is logged in
    // decode the accessToken and fint out the user from the userId
    // set req.user to the user found
    // call next()

    const cookies=req.cookies;
    
    if(!cookies || !cookies.accessToken || !cookies.refreshToken){
        throw new ApiError(401,"User is Not logged In!");
    }
    const payLoad=jwt.verify(cookies.accessToken,process.env.JWT_ACCESS_TOKEN_SECRET);
    const user =await User.findById(payLoad._id).select(
        "-password -refreshToken"
    )

    
    if(!user){
        throw new ApiError(403,"Invalid Token");
    }
    
    req.user=user;
    next()
    
});

export default auth;