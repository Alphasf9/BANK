import mongoose from "mongoose";
import bcrypt from "bcrypt"

const cardSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true
  },

  email: {
    type: String
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
    req: true,
    select: false
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

cardSchema.statics.hashPassword = async function (pin) {
    return await bcrypt.hash(pin, 10);
}


cardSchema.methods.passwordCorrect = async function (pin) {
    return await bcrypt.compare(pin, this.pin)// comparing password
}

export const Card = mongoose.model("Card", cardSchema);
