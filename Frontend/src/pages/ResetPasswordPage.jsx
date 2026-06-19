import { motion } from "framer-motion"
import Input from "../components/Input"
import { Lock, Loader } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "../store/authStore"
import { useParams, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confermPassword, setConfermPassword] = useState("")
  const {error, isLoading, resetPassword, message} = useAuthStore();

  const {token} = useParams();
  const navigate = useNavigate();
  const handleResetPassword = async(e) => {
    e.preventDefault();
    if(password !== confermPassword) return alert("passwords do not match");
    try {
      await resetPassword(token, password)
      navigate("/login")
      toast.success("Password reset successfully")
    } catch (error) {
      console.log(error)
      toast.error(error.message || "Error reseting password")
    }
  }
  return (
    <motion.div
      initial= {{ opacity: 0, y: 20 }}
      animate= {{ opacity: 1, y: 0 }}
      transition = {{ duration: 0.5}}
      className="max-w-md mx-auto w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className = "text-3xl font-bold mb-6 text-center bg-linear-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
          Enter new password
        </h2>
        {error && <p className="text-red-500 text-sm mb4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb4">{message}</p>}

        <form onSubmit={handleResetPassword}>
          <Input
            icon={Lock}
            type='password'
            placeholder = "password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            className = ""
          />

          <Input
            icon={Lock}
            type='password'
            placeholder = "Conferm Password"
            value = {confermPassword}
            onChange = {(e) => setConfermPassword(e.target.value)}
            className = ""
          />
          {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
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
              "Set new Password"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}
