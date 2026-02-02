import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Heart {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

interface FloatingHeartsProps {
  count?: number;
  trigger?: boolean;
}

const HEART_EMOJIS = ["💖", "💕", "💗", "💝", "💘", "❤️"];

const FloatingHearts = ({ count = 20, trigger = false }: FloatingHeartsProps) => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (trigger) {
      const newHearts: Heart[] = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
        left: Math.random() * 100,
        size: Math.random() * 40 + 20,
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 0.5,
      }));
      setHearts(newHearts);

      const timer = setTimeout(() => setHearts([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [trigger, count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.left}%`,
            top: "50%",
            fontSize: heart.size,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{ y: -500, opacity: 0, rotate: 360 }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
