import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
    expiresIn: "7d"
  })

  res.cookie("token", token, {
    httpOnly: true, //xss protection
    secure: process.env.NODE_ENV === "production", //set secure flag in production
    sameSite: "strict", // use "strict" in production for csrf protection
    maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expires in 7 days  
  })

  return token;
}