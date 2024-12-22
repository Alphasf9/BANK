import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        unique: true,
        required: true
    },

    accountNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    

    type: {
        type: String,
        enum: ["Credit", "Debit"],
        required: true
    },

    amount: {
        type: Number,
        required: true,
        // validate: {
        //     validator: function (value) {
        //         return value > 0;
        //     },
        //     message: "Amount must be greater than zero."
        // }
    },

    transactionDate: {
        type: Date,
        default: Date.now,
        required: true
    },

    //   description: {
    //     type: String,
    //     required: true // E.g., "ATM Withdrawal", "Online Transfer"
    //   },


    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
        required: true
    }
}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", transactionSchema);
