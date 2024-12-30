import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: "dze34ir17",
    api_key: "139221924157995",
    api_secret: "qvpbIInVy44i946k6AcX2WAmil0"
});

const uploadOnCloudinary = async (localFilePath) => {
    
    
    try {
        if (!localFilePath) return null;

        const file = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" 
        });


        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting local file:", err);
            }
        });

        return file;

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);

        
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting local file:", err);
            }
        });
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting local file:", err);
            }
        });

        return null;
    }
};

export { uploadOnCloudinary };
