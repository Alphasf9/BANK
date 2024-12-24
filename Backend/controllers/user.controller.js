import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcrypt"


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, phoneNo, dob, gender, aadhar_id, address, maritalStatus, occupation, nationality, photo, userPassword } = req.body;

    if (!fullName || !email || !phoneNo || !dob || !gender || !aadhar_id || !address || !maritalStatus || !occupation || !nationality || !photo || !userPassword) {
        throw new ApiError(400, "All fields are required.");
    }

    const existedUser = await User.findOne({ aadhar_id });
    if (existedUser) {
        throw new ApiError(409, "User with this Aadhar is already exists")
    }

    const photoLocalPath = req.files?.photo[0]?.path;
    if (!photoLocalPath) {
        throw new ApiError(400, "Photo file is Required")
    }

    const photoUser = await uploadOnCloudinary(photoLocalPath);
    if (!photoUser) {
        throw new ApiError(400, "Photo is required")
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const user = await User.create({
        fullName: { firstName, lastName },
        email,
        phoneNo,
        dob,
        gender,
        aadhar_id,
        address,
        maritalStatus,
        occupation,
        nationality,
        photo : photoUser.url,
        userPassword: hashedPassword
    })
    await user.save();

    const createdUser = await User.findById(user._id).select("-userPassword");
    if(!createdUser) {
        throw new ApiError(500, "Somthing went worng while requesting user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Register Successfully")
    )

})

export { registerUser }