import { motion } from "framer-motion"

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-2xl `}
      style={{ top, left }}
      animate = {{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360]
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay // comming from props
      }}
      aria-hidden="true" // This element is purely decorative, so we hide it from assistive technologies, best practice
    />
  )
}

export default FloatingShape