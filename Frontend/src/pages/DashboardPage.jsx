import { motion } from "framer-motion"
import {useAuthStore} from "../store/authStore"
import { formateDate } from "../utils/date.js";
function DashboardPage() {
  const {user, logout} = useAuthStore();
  const handleLogout = async() => {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.div
      initial= {{ opacity: 0, scale: 0.9}}
      animate= {{ opacity: 1, scale: 1}}
      exit = {{opacity: 0, scale: 0.9}}
      transition = {{ duration: 0.5}}
      className="max-w-md mx-auto w-full mt-10 p-8 bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
        Dashboard
      </h2>

      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-800 opacity-50 rounded-lg border border-gray-700"
          initial = {{ opacity: 0, y:20}}
          animate= {{ opacity: 1, y:0}}
          transition = {{ duration: 0.2}}
        >
          <h3 className="text-xl font-semibold mb-3 text-green-400">Profile information</h3>
          <p className="text-gray-300">name: {user.name} </p>
          <p className="text-gray-300">Email: {user.email} </p>
        </motion.div>
        <motion.div
          className="p-4 bg-gray-800 opacity-50 rounded-lg border border-gray-700"
          initial = {{ opacity: 0, y:20}}
          animate= {{ opacity: 1, y:0}}
          transition = {{ duration: 0.4}}
        >
          <h3 className="text-xl font-semibold mb-3 text-green-400">Account activity</h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined: </span>
            {formateDate(user.createdAt)}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Last Login: </span>
            {formateDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial = {{ opacity: 0, y:20}}
        animate= {{ opacity: 1, y:0}}
        transition = {{ duration: 0.6}}
        className="mt-4"
        onClick={handleLogout}
      >
        <motion.button
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white font-bold  transition duration-300 cursor-pointer focus:ring-2 focus-ring-green-500 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default DashboardPage