import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true
  },
  
  cardNumber: {
    type: String,
    required: true,
    unique: true,
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
  },

  cvv: {
    type: String,
    required: true,
  },

  pin: {
    type: String,
    required: true,
  },

  cardStatus: {
    type: String,
    enum: ["Active", "Inactive", "Blocked", "Expired"],
    default: "Inactive",
    required: true
  },

  // issuingBank: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref:"Account",
  //   required: true
  // },

}, { timestamps: true });

export const Card = mongoose.model("Card", cardSchema);
