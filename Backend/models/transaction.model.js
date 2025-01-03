import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        unique: true,
        required: true,
    },

    fromAccount: {
        type: String,
    },

    toAccount: {
        type: String,
    },

    type: {
        type: String,
        enum: ["Credit", "Debit", "Transfer"],
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    transactionDate: {
        type: Date,
        default: Date.now,
        required: true,
    },

    description: {
        type: String,
        default: "",
    },

    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
        required: true,
    },
}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", transactionSchema);
