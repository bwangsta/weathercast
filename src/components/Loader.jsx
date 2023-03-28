import { motion } from "framer-motion"

function Loader() {
  return (
    <div className="loader">
      <motion.i
        animate={{ transform: "rotate(360deg)" }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="bi bi-sun"
      ></motion.i>
      <p>Loading...</p>
    </div>
  )
}

export default Loader
