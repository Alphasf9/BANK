import { v2 as cloudinary } from "cloudinary"
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        
        if(!localFilePath) return null;

        const file = cloudinary.uploader.upload(localFilePath, {resource_type: "auto"});
        console.log("File uploaded successfully", file.url);

        fs.unlinkSync(localFilePath);
        return file;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export { uploadOnCloudinary }