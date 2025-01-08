import mongoose from "mongoose";
import bcrypt from "bcrypt"; 

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
        nomineeName: {
            type: String
        },
        nomineeRelation: {
            type: String
        },
        nomineeContact: {
            type: String
        }
    },

    accountPassword :{
        type:String,
        required : true,
    }
}, { timestamps: true });

accountSchema.statics.hashAccPassword = async function (accountPassword) {
    return await bcrypt.hash(accountPassword, 10);
}


accountSchema.methods.hashPasswordCorrect = async function (accountPassword) {
    return await bcrypt.compare(accountPassword, this.userPassword)// comparing password
}

export const Account = mongoose.model("Account", accountSchema);
