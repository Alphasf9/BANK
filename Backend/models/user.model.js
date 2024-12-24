import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    fullname: {
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

    userPassword: {
        type: String,
        required: true,
        select: false
    }

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
