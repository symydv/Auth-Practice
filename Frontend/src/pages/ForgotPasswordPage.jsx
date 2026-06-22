import { motion } from "framer-motion"
import {useState} from 'react'
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader } from "lucide-react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {isLoading, forgotPassword} = useAuthStore();

  const handleSubmit = async(e) => {
    e.preventDefault();
    await forgotPassword(email)
    setIsSubmitted(true);
  }
  return (
    <motion.div
      initial={{opacity:0, y:20}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.5}}
      className="max-w-md mx-auto w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Forgot password
        </h2>
        {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <p className="text-gray-300 mb-6 text-center">Enter your email address and we will send you a link to reset password</p>
              <Input
                icon = {Mail}
                type =  "email"
                placeholder = 'Email address'
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                required
              />
              <motion.button
                className="mt-5 w-full py-3 px-4 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 cursor-pointer"
                whileHover={{scale:1.02}}
                whileTap={{scale:0.98}}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin mx-auto" />
                ) : (
                  "Send reset link"
                )}
              </motion.button>
            </form>
        ):(
          <div className="text-center">
            <motion.div
              initial = {{scale: 0}}
              animate = {{scale: 1}}
              transition={{type: "spring", stiffness:500, damping:30}}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto"
            >
              <Mail className="w-8 h-8 text-white" />
            </motion.div>
            <p className="text-gray-300 mb-6">
              If an account exists for {email}, you will receive a password reset link shortly.
            </p>
          </div>
        )}
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <Link to="/login" className="text-sm text-green-400 hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to login
        </Link>
      </div>

    </motion.div>
  )
}
