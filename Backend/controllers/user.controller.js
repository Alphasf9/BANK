import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";

const genrateAccessTokenRefreshToken = async (userId) => {
    const user = await User.findById(userId);
    const accessToken = user.genrateAccessToken();
    const refreshToken = user.genrateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

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
            userPassword,
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
            return res.status(400).json({ message: "Photo upload failed." });
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


        const { accessToken, refreshToken } = await genrateAccessTokenRefreshToken(user._id);


        return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNo: user.phoneNo,
                dob: user.dob,
                gender: user.gender,
                aadhar_id: user.aadhar_id,
                address: user.address,
                maritalStatus: user.maritalStatus,
                occupation: user.occupation,
                nationality: user.nationality,
                photo: user.photo,
            },
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error("Error during logged in user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


const loginUser = async (req, res, next) => {
    try {
        const { email, aadhar_id, userPassword } = req.body;



        if (!email || !aadhar_id) {
            return res.status(400).json({ message: "email and aadhar are required" });
        }

        const user = await User.findOne({
            $or: [{ email }, { aadhar_id }]
        }).select("+userPassword");

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordMatch = await user.passwordCorrect(userPassword);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Password is invalid" });
        }


        const { accessToken, refreshToken } = await genrateAccessTokenRefreshToken(user._id);


        const loggedInUser = await User.findById(user._id).select("-userPassword -refreshToken");

        const options = {
            httpOnly: true,
            secure: true,
        };


        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                user: loggedInUser,
                accessToken,
                refreshToken,
                message: "User Logged In Successfully"
            });

    } catch (error) {
        console.error("Error during logged in user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


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
    const { accessToken, refreshToken } = await genrateAccessTokenRefreshToken(req.user._id);

    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("accessToken", accessToken, option).clearCookie("refreshToken", refreshToken, option)
        .json({ user: {}, message: "User LoggedOut Successfully" })

}

const getCurrentUser = async (req, res) => {
    return res.status(200).json({ user: req.user, message: "Current user fetch Successfully" });
}

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.passwordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Password not matched" })
    }

    user.userPassword = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({ message: "Password changed" });
}

const updatePersonalDetails = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNo,
        dob,
        gender,
        houseNumber,
        street,
        city,
        state,
        zip,
        maritalStatus,
        occupation,
    } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phoneNo ||
        !dob ||
        !gender ||
        !street ||
        !city ||
        !state ||
        !zip ||
        !maritalStatus ||
        !occupation
    ) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const user = User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                firstName,
                lastName,
                email,
                phoneNo,
                dob,
                gender,
                houseNumber,
                street,
                city,
                state,
                zip,
                maritalStatus,
                occupation,
            }
        },
        {
            new: true
        }
    ).select("-password");

    return res.status(200).json({message: "Personal Details Updated"});
}

const updateUserPhoto = async (req, res) => {
    const photoLocalPath = req.file?.path
    if(!photoLocalPath) {
        return res.status(401).json({message:"Photo file required"})
    }

    const photo = await uploadOnCloudinary(photoLocalPath);

    if(!photo.url) {
        return res.status(401).json({message: "Error while uploading on cloudinary"});
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                photo: photo.url
            }
        },
        {
            new: true
        }
    ).select("-password");

    return res.status(200).json({message: "Photo Updated"});
}

export { registerUser, loginUser, logoutUser, getCurrentUser, changePassword, updatePersonalDetails, updateUserPhoto }