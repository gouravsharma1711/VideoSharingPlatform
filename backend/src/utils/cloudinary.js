import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import ApiError from '../utils/ApiError.js';
import { log } from 'console';
cloudinary.config({
    cloud_name:process.env.cloudinary_Cloud_Name,
    api_key:process.env.cloudinary_Api_Key,
    api_secret:process.env.cloudinary_Api_Secret
})

const uplordOnCloudinary=async(localPath,folderName)=>{
    try{
        if(!localPath){
            return null;
        }
        const response = await cloudinary.uploader.upload(localPath,{
            resource_type:folderName?.includes("Video") ? "video" : "image",
            folder: folderName || "default"
        })
        console.log("File is successfully uploaded to Cloudinary and local file deleted.");
        if (fs.existsSync(localPath)) {
            fs.unlinkSync(localPath);
        }
        return response;
        
    }catch(error){
        console.log("Error uploading to Cloudinary: ", error);
        if (fs.existsSync(localPath)) {
            fs.unlinkSync(localPath);
        }
        throw new ApiError(500, "Failed to upload file to Cloudinary");
    }
}


const generatePublicIdFromUrl=(url)=>{
    if(!url){
        return null;
    }
    let parts=url.split('/');
    let fileNameWithExtension=parts.pop();
    let FileName=fileNameWithExtension.split('.')[0];
    let folder=parts.pop();
    return `${folder}/${FileName}`;
}
const deleteFromCloudinary=async(Url)=>{
    try {
        if(!Url){
            throw new ApiError(400," Url is required");
        }
        
        const publicId=generatePublicIdFromUrl(Url);
        
        if(!publicId){
            throw new ApiError(400,"Invalid Image Url");
        }
        
        console.log("Public Id :-",publicId);
        let resouceType="image";
        
        if(publicId.includes("VSW_Videos")){
            resouceType="video";
        }
        const response =await cloudinary.uploader.destroy(publicId,{
            resource_type: resouceType,
        });
        console.log("Random4");

        console.log("File deleted from Cloudinary successfully. Response from Cloudinary: ", response);

    } catch (error) {
        console.error("Error deleting image from Cloudinary: ", error);
        throw new ApiError(500, "Failed to delete image from Cloudinary", error.stack);
    }
    


}
export  {uplordOnCloudinary,deleteFromCloudinary};