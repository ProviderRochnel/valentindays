import { motion } from "framer-motion";

const TeddyBear = () => {
  return (
    <motion.div
      className="text-7xl md:text-8xl lg:text-9xl inline-block"
      animate={{
        y: [0, -20, 0],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      🧸
    </motion.div>
  );
};

export default TeddyBear;
