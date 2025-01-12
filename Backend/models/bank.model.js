import mongoose from "mongoose";

const bankSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
      required: true,
      unique: true,
    },

    bankLogo: {
      // from cloudinary
      type: String,
      required: true,
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: " ",
      required: true,
    },

    branchDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    accounts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    cards: {
      type: mongoose.Schema.Schema.Types.ObjectId,
      ref: "Card",
    },

    transactions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    bankStatements: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BankStatement",
      // reuired: true
    },
    loans: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
    },
    netBalance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    service: {
      type: String,
      enum: ["Savings", "Current"],
    },

    atmInstalled: {
      location: {
        type: String,
        required: true,
      },
      // noOfATM: {
      //     type: Number,
      //     required: true
      // },
      status: {
        type: String,
        enum: ["Active", "Inactive"],
        required: true,
      },
      cashAvailable: {
        type: Number,
        default: 0,
      },
    },

    workingHours: {
      weekDays: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      weekends: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      holidays: [String],
    },

    establishedDate: {
      type: Date,
      required: true,
    },

    location: {
      type: "Point",
    },
  },
  { timestamps: true }
);

export const Bank = mongoose.model("Bank", bankSchema);
