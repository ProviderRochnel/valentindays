import { motion } from "framer-motion";

interface GiftBoxProps {
  onOpen: () => void;
  isOpening: boolean;
}

const GiftBox = ({ onOpen, isOpening }: GiftBoxProps) => {
  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onOpen}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isOpening
          ? {
              scale: [1, 1.2, 1.3, 1.5, 2],
              rotateY: [0, 0, 180, 360, 720],
              opacity: [1, 1, 1, 1, 0],
            }
          : {
              rotate: [0, 5, 0, -5, 0],
            }
      }
      transition={
        isOpening
          ? { duration: 1.5, ease: "easeOut" }
          : { duration: 0.8, repeat: Infinity }
      }
    >
      <div className="w-40 h-40 md:w-56 md:h-56 gradient-gold rounded-2xl shadow-card flex items-center justify-center text-6xl md:text-7xl">
        🎁
      </div>
    </motion.div>
  );
};

export default GiftBox;
