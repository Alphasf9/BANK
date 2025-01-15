import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({

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
        unique: true
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

    photo: {
        type: String,
        required: true
    },

    userPassword: {
        type: String,
        required: true,
        select: false
    },

    otp: {
        type: String
    },

    otpExpiry: {
        type: Date
    },

    blocked: {
        type: Boolean,
        default: false
    },

    accountDetails: {
        accountNumber: {
            type: String,
            unique: true,
        },
        accountType: {
            type: String,
            enum: ["Saving", "Current"],
            required: true
        },
        branchDetails: {
            branchName: {
                type: String,
                required: true
            },
            branchCode: {
                type: String,
                required: true
            },
            ifscCode: {
                type: String,
                required: true
            }
        },
        balance: {
            type: Number,
            required: true,
            default: 0.0
        },
        nominee: {
            nomineeName: {
                type: String,
                required: true
            },
            nomineeRelation: {
                type: String,
                required: true
            },
            nomineeContact: {
                type: String,
                required: true
            }
        },
        accountPassword: {
            type: String,
            required: true,
            select:false
        }
    }

}, { timestamps: true });


tempUserSchema.index({otpExpiry:1}, {expireAfterSeconds: 60})

export const TempUser = mongoose.model("TempUserSchema", tempUserSchema);
