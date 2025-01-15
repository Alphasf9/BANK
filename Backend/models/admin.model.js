import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      }
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
      required: true,
    },

    adminPassword: {
      type: String,
      required: true,
      select: false,
    },

    photo: {
      // from cloudinary
      type: String,
    },

    lastLogin: {
      type: Date,
    },

    socketId: {
      type: String,
    },

  },
  { timestamps: true }
);

adminSchema.statics.hashPassword = async function (adminPassword) {
  return await bcrypt.hash(adminPassword, 10);
};

adminSchema.methods.passwordCorrect = async function (adminPassword) {
  return await bcrypt.compare(adminPassword, this.adminPassword);
};

adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      // role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

adminSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Admin = mongoose.model("Admin", adminSchema);
