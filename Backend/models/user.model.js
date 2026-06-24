import mongoose from "mongoose"

const userschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: { 
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true, 
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  }, 
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  verificationToken: String,
  verificationTokenExpires:{
    type: Date,
    index:{
        expireAfterSeconds: 0
    }
  }
}, {timestamps: true} )

export const User = mongoose.model("User", userschema)