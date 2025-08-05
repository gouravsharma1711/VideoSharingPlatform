import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema=new mongoose.Schema({
    watchHistory:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }],
        default: []
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    avatar:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
    },
    refreshToken:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

userSchema.pre("save",async function(next){

    try {
        if(!this.isModified("password")){
            return next();
        }
        this.password=await bcrypt.hash(this.password,10);
        return next();
    } catch (error) {
        console.log(error.message);
        return next(error);
    }
})

userSchema.methods.isPasswordCorrect=async function(currPassword){
    return await bcrypt.compare(currPassword,this.password);
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            userName:this.userName,
            email:this.email,
            fullName:this.fullName,
        },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.JWT_REFRESH_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRY
        }
    )
}


export const User=mongoose.model("User",userSchema);