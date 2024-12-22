import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  accountNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true
  },
  
  cardNumber: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: function(value) {
    //     // Basic validation for card number length (e.g., Visa/MC - 16 digits)
    //     return /^\d{16}$/.test(value);
    //   },
    //   message: "Invalid card number."
    // }
  },

  cardType: {
    type: String,
    enum: ["Debit Card", "Credit Card", "Virtual Card"],
    required: true
  },

  cardHolderName: {
    type: String,
    required: true
  },

  expiryDate: {
    type: Date,
    required: true,
    // validate: {
    //   validator: function(value) {
    //     return value > Date.now();
    //   },
    //   message: "Card expiry date cannot be in the past."
    // }
  },

  cvv: {
    type: String,
    required: true,
    // validate: {
    //   validator: function(value) {
    //     // Validating CVV length (e.g., 3 digits for most cards, 4 for AMEX)
    //     return /^[0-9]{3,4}$/.test(value);
    //   },
    //   message: "Invalid CVV."
    // }
  },

  pin: {
    type: String,
    required: true,
    // validate: {
    //   validator: function(value) {
    //     return /^\d{4}$/.test(value); // Basic PIN validation (4 digits)
    //   },
    //   message: "Invalid PIN."
    // }
  },

  cardStatus: {
    type: String,
    enum: ["Active", "Inactive", "Blocked", "Expired"],
    default: "Active",
    required: true
  },

  issuingBank: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Account",
    required: true
  },

}, { timestamps: true });

export const Card = mongoose.model("Card", cardSchema);
