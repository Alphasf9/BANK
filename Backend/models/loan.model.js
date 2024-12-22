import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
    accountNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },

    loanAmount: {
        type: Number,
        required: true,
        min: [0, "Loan amount must be greater than 0"]
    },

    loanType: {
        type: String,
        enum: ["Personal", "Home", "Car", "Business", "Education"],
        required: true
    },

    interestRate: {
        type: Number,
        required: true,
        min: [0, "Interest rate must be positive"]
    },

    loanTerm: {
        type: Number,
        required: true,
        min: [1, "Loan term must be at least 1 month"]
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    monthlyInstallment: {
        type: Number,
        required: true
    },

    monthlyPaidAmount: {
        type: [Boolean], // This defines an array of Boolean values
        default:0,
        required:true
    },

    outstandingBalance: {
        type: Number,
        default: function () {
            return this.loanAmount;
        }
    },

    totalPaid: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["Active", "Paid", "Defaulted", "Closed"],
        default: "Active",
        required: true
    },

    loanRepayments: [
        {
            paymentDate: { type: Date, required: true },
            amountPaid: { type: Number, required: true },
            outstandingBalanceAfterPayment: { type: Number, required: true }
        }
    ],
}, { timestamps: true });

export const Loan = mongoose.model("Loan", loanSchema);
