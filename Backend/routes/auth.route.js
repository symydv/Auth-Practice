import express from "express"
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth} from "../controllers/auth.controller.js"
import {verifyToken} from "../middleware/verifyToken.js"
const router = express.Router()

router.get("/checkAuth", verifyToken, checkAuth) //this route is used to check if the user is authenticated or not. we can use this route in frontend to check if the user is logged in or not and then show the appropriate UI.

router.post("/signup", signup);

router.post("/login", login)

router.post ("/logout", logout)

router.post("/verify-email", verifyEmail)

router.post("/forgot-password", forgotPassword)

router.post("/reset-password/:token", resetPassword)
export default router


