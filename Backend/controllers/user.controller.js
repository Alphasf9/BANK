import { Account } from "../models/account.model.js";
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

// Register a new user and create an associated account
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
            accountType, // New field for account creation
            branchName,  // New field for account creation
            branchCode,  // New field for account creation
            ifscCode,     // New field for account creation
            nomineeName,    // New field for account creation
            nomineeRelation,    // New field for account creation
            nomineeContact     // New field for account creation
        } = req.body;

        
        if (!firstName || !lastName || !email || !phoneNo || !userPassword || !accountType || !branchName || !branchCode || !ifscCode) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }


        const existedUser = await User.findOne({ $or: [{ aadhar_id }, { email }] });
        if (existedUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        
        const photoLocalPath = req.file?.path;
        if (!photoLocalPath) {
            return res.status(400).json({ message: "Photo file is required." });
        }
        const photo = await uploadOnCloudinary(photoLocalPath);

        
        const user = await User.create({
            fullName: { firstName, lastName },
            email,
            phoneNo,
            dob,
            gender,
            aadhar_id,
            address: { street, city, state, zip, country: country || "INDIA" },
            maritalStatus,
            occupation,
            nationality,
            photo: photo.url,
            userPassword: hashedPassword,
        });

       
        const accountNumber = `ACC${Date.now()}`;

        
        const account = await Account.create({
            accountHolder: user._id,
            accountNumber,
            accountType,
            branchDetails: { branchName, branchCode, ifscCode },
            balance: 0.0,
            nominee: { nomineeName, nomineeRelation, nomineeContact },
        });

        const { accessToken, refreshToken } = await genrateAccessTokenRefreshToken(user._id);

        return res.status(201).json({
            message: "User and account created successfully",
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
            account: {
                accountNumber: account.accountNumber,
                accountType: account.accountType,
                branchDetails: account.branchDetails,
                balance: account.balance,
                nominee: account.nominee,
            },
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, aadhar_id, userPassword } = req.body;

        
        if (!email || !aadhar_id || !userPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

    
        const user = await User.findOne({ $or: [{ email }, { aadhar_id }] }).select("+userPassword");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        
        const isPasswordMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

       
        const { accessToken, refreshToken } = await genrateAccessTokenRefreshToken(user._id);

        
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        const account = await Account.findOne({ accountHolder: user._id });


        const options = { httpOnly: true, secure: true };
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "User logged in successfully.",
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
                account: account || { message: "No account found for this user." },
                accessToken,
                refreshToken,
            });
    } catch (error) {
        console.error("Error during login:", error);
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
    try {
        const userId = req.user._id; // Assuming user ID is available in the request
        const user = await User.findById(userId).select("-userPassword");
        const account = await Account.findOne({ accountHolder: userId });

        if (!user || !account) {
            return res.status(404).json({ message: "User or account not found" });
        }

        return res.status(200).json({
            user,
            account,
            message: "User and account details retrieved successfully",
        });
    } catch (error) {
        console.error("Error fetching user and account details:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    console.log(req.body);
    const user = await User.findById(req.user?._id).select("+userPassword");
    console.log(user);


    const isPasswordCorrect = await user.passwordCorrect(oldPassword);
    console.log(isPasswordCorrect);


    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Password not matched" })
    }

    const newhashedPassword = await bcrypt.hash(newPassword, 10);


    user.userPassword = newhashedPassword;
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

    try {

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                fullName: { firstName, lastName },
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
            },
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        return res.status(200).json({
            user,
            message: "User has been updated",
        });
    } catch (error) {

        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const updateAccountDetails = async (req, res) => {
    const { accountType, branchName, branchCode, ifscCode, nomineeName, nomineeRelation, nomineeContact } = req.body;

    if (!accountType || !branchName || !branchCode || !ifscCode) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const account = await Account.findOneAndUpdate(
            { accountHolder: req.user._id },
            {
                accountType,
                branchDetails: { branchName, branchCode, ifscCode },
                nominee: { nomineeName, nomineeRelation, nomineeContact },
            },
            { new: true, runValidators: true }
        );

        if (!account) {
            return res.status(404).json({ message: "Account not found." });
        }

        return res.status(200).json({ account, message: "Account updated successfully." });
    } catch (error) {
        console.error("Error updating account details:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


const updateUserPhoto = async (req, res) => {
    const photoLocalPath = req.file?.path;

    if (!photoLocalPath) {
        return res.status(401).json({ message: "Photo file required" })
    }

    const photo = await uploadOnCloudinary(photoLocalPath);

    if (!photo.url) {
        return res.status(401).json({ message: "Error while uploading on cloudinary" });
    }



    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                photo: photo.url
            }
        },
        {
            new: true
        }
    ).select("-password");

    return res.status(200).json({ user, message: "Photo Updated" });
}

export { registerUser, loginUser, logoutUser, getCurrentUser, changePassword, updatePersonalDetails, updateUserPhoto, updateAccountDetails }