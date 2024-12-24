import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcrypt"


const registerUser = async (req, res) => {
    try {

        const { fullName, email, phoneNo, dob, gender, aadhar_id, address, maritalStatus, occupation, nationality, userPassword } = req.body;

        console.log(req.body)
        console.log("***");
        
        console.log(address);
        

        if (
            !fullName ||
            !email ||
            !phoneNo ||
            !address ||
            !userPassword
        ) {
            // return res.status(400).json({ message: "All fields are required." });
        }


        const existedUser = await User.findOne({ aadhar_id });
        if (existedUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const photoLocalPath = req.file?.path;
        console.log("photo path", photoLocalPath);
        
        if (!photoLocalPath) {
            return res.status(400).json({ message: "Photo file is required." });
        }

        const photo = await uploadOnCloudinary(photoLocalPath);
        if (!photo) {
            return res.status(400).json({ message: "Photo is required" })
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);


        const user = await User.create({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            phoneNo,
            dob,
            gender,
            aadhar_id,
            street: address.street,
            state: address.state,
            city: address.city,
            zip: address.zip,
            country: address.country,
            maritalStatus,
            occupation,
            nationality,
            photo: photo.url,
            userPassword: hashedPassword
        })
        console.log(user);
        
        // await user.save();

        const createdUser = await User.findById(user._id).select("-userPassword");
        if (!createdUser) {
            return res.status(500).json({ message: "Somthing went worng while requesting user" })
        }

        return res.status(201).json(
            {
                message: "User Register Successfully",
                user: createdUser
            }
        )

    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Internal server error." });
    }

}

export { registerUser }