import mongoose from "mongoose";

const bankStatementSchema = new mongoose.Schema({
    accountNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },

    statementDate: {
        type: Date,
        default: Date.now,
        required: true
    },

    period: {
        startDate: { 
            type: Date, 
            required: true 
        },
        endDate: { 
            type: Date, 
            required: true 
        }  
    },

    transactions: [
        {
            transactionId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
            date: { type: Date, required: true },
            description: { type: String, required: true }, 
            type: { type: String, enum: ["Credit", "Debit"], required: true },
            amount: { type: Number, required: true },
            balanceAfterTransaction: { type: Number, required: true }
        }
    ],

    openingBalance: {
        type: Number,
        required: true
    },

    closingBalance: {
        type: Number,
        required: true
    },

    totalCredits: {
        type: Number,
        default: 0.0
    },

    totalDebits: {
        type: Number,
        default: 0.0
    },

    statementStatus: {
        type: String,
        enum: ["Generated", "Pending", "Failed"],
        default: "Generated",
        required: true
    }
}, { timestamps: true });

export const BankStatement = mongoose.model("BankStaement", bankStatementSchema);