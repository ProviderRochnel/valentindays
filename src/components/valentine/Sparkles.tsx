import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface SparklesProps {
  trigger?: boolean;
  centerX?: number;
  centerY?: number;
  count?: number;
}

const Sparkles = ({ trigger = false, centerX = 50, centerY = 50, count = 20 }: SparklesProps) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (trigger) {
      const newSparkles: Sparkle[] = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        x: centerX + (Math.random() * 100 - 50),
        y: centerY + (Math.random() * 100 - 50),
        size: Math.random() * 30 + 20,
      }));

      newSparkles.forEach((sparkle, i) => {
        setTimeout(() => {
          setSparkles((prev) => [...prev, sparkle]);
        }, i * 50);
      });

      const timer = setTimeout(() => setSparkles([]), 1500);
      return () => clearTimeout(timer);
    }
  }, [trigger, centerX, centerY, count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            fontSize: sparkle.size,
          }}
          initial={{ scale: 0, rotate: 0, opacity: 1 }}
          animate={{ scale: 2, rotate: 180, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

export default Sparkles;
