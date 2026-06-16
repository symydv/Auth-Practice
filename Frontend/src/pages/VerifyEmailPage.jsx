import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]) ;
  const inputRef = useRef([])
  const isLoading = false;
  const navigate = useNavigate();

  const handleChange = (e) =>{
    e.preventDefault()
  }
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      inputRef.current[index].value = "";
      inputRef.current[index - 1].focus();
    } else if (e.key === "ArrowLeft") {
      inputRef.current[index].value = "";
      inputRef.current[index - 1].focus();
    } else if (e.key === "ArrowRight") {
      inputRef.current[index].value = "";
      inputRef.current[index + 1].focus();
    } else if(e.key === "numberKey"){
      inputRef.current[index].value = e.key;
      inputRef.current[index + 1].focus();
    }
  };
  return (
    <div className='max-w-md mx-auto w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <motion.div
        initial = {{ opacity: 0, y: 20 }}
        animate = {{ opacity: 1, y: 0 }}
        transition = {{ duration: 0.5}}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className = "text-3xl font-bold mb-6 text-center bg-linear-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
          Verify your email
        </h2>
        <p className="text-center text-gray-300 mb-6">Enter the 6 digit code sent to your email address.</p>
        <form className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key = {index}
                ref ={(el) => (inputRef.current[index] = el)}
                type = "text"
                maxLength = {6}
                value = {digit}
                onChange = {(e) => handleChange(index, e.target.value)}
                onKeyDown = {(e) => handleKeyDown(index, e)}
                className = "w-12 h-12 text-center bg-gray-700 border-2 border-gray-50 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-lg shadow-xl text-white font-bold text-2xl focus:outline-none focus:border-green-500"
              />
            ))}
          </div>
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
              "Verify"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default VerifyEmailPage