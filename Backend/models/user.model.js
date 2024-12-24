import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    
    fullName: {
        firstName: {
            type: String,
            required: true
        },
    
        lastName: {
            type: String,
            required: true
        },
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    phoneNo: {
        type: Number,
        required: true
    },

    dob: {
        type: Date,
        required: true
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },

    aadhar_id: {
        type: String,
        required: true,
        unique: true  // By KK
    },

    address: {
        houseNumber: {
            type: String,
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
            default: "INDIA"
        }
    },

    maritalStatus: {
        type: String,
        enum: ["Single", "Married", "Divorced", "Widow/Widower"],
        required: true
    },

    occupation: {
        type: String,
        required: true
    },

    nationality: {
        type: String,
        required: true
    },

    photo: { // from cloudinary
        type: String,
        required: true
    },
    
    userPassword :{
        type:String,
        required : true,
        select:false
    }

}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("userPassword")) {
        this.userPassword = await bcrypt.hash(this.userPassword, 10);
    }
    next();
});

    /**
     * Compares given userPassword with hashed password stored in the db.
     * @param {string} userPassword - The password to compare.
     * @returns {Promise<boolean>} - true if the password matches, false otherwise.
     */
userSchema.methods.passowrdCorrect = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.userPassword)// comparing password
}


userSchema.methods.genrateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.genrateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
