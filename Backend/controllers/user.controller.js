import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcrypt"


const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNo,
            dob,
            gender,
            aadhar_id,
            street,
            city,
            state,
            zip,
            country,
            maritalStatus,
            occupation,
            nationality,
            userPassword
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !phoneNo ||
            !street ||
            !city ||
            !state ||
            !zip ||
            !userPassword
        ) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existedUser = await User.findOne({
            $or: [{ aadhar_id }, { email }]
        });
        if (existedUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const photoLocalPath = req.file?.path;

        if (!photoLocalPath) {
            return res.status(400).json({ message: "Photo file is required." });
        }

        const photo = await uploadOnCloudinary(photoLocalPath);
        if (!photo) {
            return res.status(400).json({ message: "Photo is required." });
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const user = await User.create({
            fullName: { firstName, lastName },
            email,
            phoneNo,
            dob,
            gender,
            aadhar_id,
            address: {
                street,
                city,
                state,
                zip,
                country: country || "INDIA",
            },
            maritalStatus,
            occupation,
            nationality,
            photo: photo.url,
            userPassword: hashedPassword,
        });

        const createdUser = await User.findById(user._id).select("-userPassword");
        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong while requesting the user." });
        }

        return res.status(201).json({
            message: "User registered successfully",
            user: createdUser,
        });

    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const genrateAccessTokenRefreshToken = async (userId) => {
    const user = await User.findById(userId)
    const accessToken = user.genrateAccessToken()
    const refreshToken = user.genrateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken };
}

const loginUser = async (req, res) => {
    try {
        const { email, aadhar_id, userPassword } = req.body

        if (!email || !aadhar_id) {
            return res.status(400).json({ message: "email and aadhar is required" });
        }

        const user = await User.findOne({
            $or: [{ email }, { aadhar_id }]
        }).select("+userPassword");

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        console.log("Stored password:", user.userPassword);
        console.log("Input password:", userPassword);

        const isPasswordMatch = await user.passwordCorrect(userPassword);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }



        const { accessToken, refreshToken } = await genrateAccessTokenRefreshToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-userPassword -refreshToken");

        const option = {
            httpOnly: true,
            secure: true
        }

        return res.status(200).cookie("accessToken", accessToken, option).cookie("refreshToken", refreshToken, option)
            .json({ user: loggedInUser, accessToken, refreshToken, message: "User LoggedIn Successfully" })

    } catch (error) {
        console.error("Login Error: ", error);
        return res.status(500).json({ message: "An unexpected error occurred" });
    }
}

const logoutUser = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("accessToken", accessToken, option).clearCookie("refreshToken", refreshToken, option)
        .json({ user: {}, message: "User LoggedOut Successfully" })

}

export { registerUser, loginUser, logoutUser }