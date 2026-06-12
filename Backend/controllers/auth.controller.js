import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js";
import { sendEmail } from "../mail/sendEmail.js";
import { PASSWORD_RESET_TEMPLATE, verificationTemplate } from "../mail/emailTemplets.js";


export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }


    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email"
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();


    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpires: Date.now() + 3600000
    });


    // jwt
    generateTokenAndSetCookie(res, user._id);

    await sendEmail(user.email, "verify your email", verificationTemplate(verificationToken));

    return res.status(201).json({
      success: true,
      message:
        "User registered successfully. Please check your email for verification code",

      user: {
        ...user._doc,
        password: undefined
      }
    });


  } catch (err) {

    return res.status(400).json({
      success:false,
      message: err.message
    });

  }
};

export const verifyEmail = async (req, res) => {
  const {code} = req.body; //dont just use verification code here because what if the you accidently put a code which is unfortunatly the code of other person at the same time you will log into that account then. fatal error

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpires: {$gt: Date.now()} //expiry date greater than current time.
    })

    if(!user){
      return res.status(400).json({success: false, message: "Invalid or exprired verification code"})
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email: email.toLowerCase()})
    if(!user){
      return res.status(400).json({success:false, message:"Invalid credentials"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
      return res.status(400).json({success:false, message:"Invalid credentials"})
    }
    if(!user.isVerified){
      return res.status(400).json({success:false, message:"Email not verified yet"})
    }
    generateTokenAndSetCookie(res, user._id)
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({success: true, message: "logged in successfully", user: {
      ...user._doc,
      password: undefined
    }})
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}

export const logout = async (req, res) => {
  res.clearCookie("token")
  res.status(200).json({success:true, message:"logged out successFully"})
}

export const forgotPassword = async (req, res) => {
  const {email} = req.body;

  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({success: false, message: 'user not found'})
    }

    //generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex")
    const resetTokenExpiresAt = Date.now() + 1*60*60*1000; //1hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiresAt;

    await user.save();

    //send mail

    await sendEmail(user.email, "Reset password", PASSWORD_RESET_TEMPLATE(`${process.env.CLIENT_URL}/reset-password/${resetToken}`)); //reset url
    res.status(200).json({success: true, message: "Password reset link sent to your email"})
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}

export const resetPassword = async(req, res)=>{
  try {
    const {token} = req.params;
    const {password} = req.body;
    const user = await User.findOne({
      resetPasswordToken: token, //for better security we can store the hash of the token in the database and then compare the hash of the token from the url with the hash stored in the database. but for simplicity we are storing the token directly in the database.
      resetPasswordExpires: {$gt: Date.now()}
    })

    if(!user){
      return res.status(400).json({
        success: false,
        message: "invalid or expired reset token"
      })
    }

    // upadate password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}

export const checkAuth = async (req, res) => {
  try{
    const user = await User.findById(req.userId).select("-password") //to exclude password from the result;
    if(!user){
      return res.status(404).json({success: false, message: "User not found"})
    }

    res.status(200).json({
      success: true,
      user: user
    })
  }catch (error) {  
    res.status(500).json({success: false, message: error.message})
  }
}