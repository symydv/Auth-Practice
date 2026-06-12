import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({success: false, message: "Unauthorized"})
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded || !decoded.id){
      return res.status(401).json({success: false, message: "Unauthorized"})
    }
    req.userId = decoded.id; //we can access this userId in the next middleware or route handler using req.userId
    next()
  }catch (error) {
    return res.status(500).json({success: false, message: "server error"})
  }
}
