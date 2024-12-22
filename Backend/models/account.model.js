import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    accountHolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    accountNumber: {
        type: String,
        unique: true,
        required: true
    },

    accountType: {
        type: String,
        enum: ["Saving", "Current"],
        required: true
    },

    branchDetails: {
        branchName: {
            type: String,
            required: true,
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
        name: {
            type: String
        },
        relation: {
            type: String
        },
        contact: {
            type: String
        }
    },

    accountPassword :{
        type:String,
        required : true,
        select:false
    }
}, { timestamps: true });

export const Account = mongoose.model("Account", accountSchema);
