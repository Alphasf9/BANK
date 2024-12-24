import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    console.log(123);
    
    try {
        if (!localFilePath) return null;

        // Upload file to Cloudinary
        const file = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Automatically determine the resource type
        });

        console.log("File uploaded successfully:", file.url);

        // Delete the local file after upload
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting local file:", err);
            }
        });

        return file;

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);

        // Attempt to delete the local file in case of an error
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting local file:", err);
            }
        });

        return null;
    }
};

export { uploadOnCloudinary };
