import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import TeddyBear from "./TeddyBear";
import { Button } from "@/components/ui/button";

interface ValentineQuestionProps {
  onYes: () => void;
}

const ValentineQuestion = ({ onYes }: ValentineQuestionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!noButtonRef.current || !containerRef.current) return;

      const noRect = noButtonRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const noCenterX = noRect.left + noRect.width / 2;
      const noCenterY = noRect.top + noRect.height / 2;
      const distance = Math.hypot(e.clientX - noCenterX, e.clientY - noCenterY);

      // Flee from cursor when close
      if (distance < 120) {
        const maxX = containerRect.width - noRect.width - 20;
        const maxY = 60;

        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        setNoPosition({ x: newX, y: newY });
      }

      // Grow YES button when cursor is near
      const yesBtn = document.getElementById("yes-btn");
      if (yesBtn) {
        const yesRect = yesBtn.getBoundingClientRect();
        const yesCenterX = yesRect.left + yesRect.width / 2;
        const yesCenterY = yesRect.top + yesRect.height / 2;
        const yesDistance = Math.hypot(e.clientX - yesCenterX, e.clientY - yesCenterY);

        if (yesDistance < 150) {
          const scale = 1 + ((150 - yesDistance) / 150) * 0.5;
          setYesScale(scale);
        } else {
          setYesScale(1);
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="bg-card/95 backdrop-blur-md rounded-3xl shadow-card p-8 md:p-14 max-w-2xl w-full mx-4 text-center relative overflow-hidden"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.8 }}
    >
      {/* Background decorative hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20 + i * 2, repeat: Infinity, ease: "linear" }}
          >
            💕
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        <TeddyBear />

        <motion.h1
          className="text-2xl md:text-4xl lg:text-5xl font-bold mt-6 mb-10 text-gradient font-romantic"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          💖 Veux-tu être ma Valentine ? 💖
        </motion.h1>

        <div className="relative h-20 mt-8">
          {/* YES Button */}
          <motion.div
            id="yes-btn"
            className="absolute left-[10%] md:left-[20%]"
            style={{ scale: yesScale }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onYes}
              className="px-8 py-6 text-lg md:text-xl font-bold gradient-success shadow-button hover:shadow-glow transition-all"
            >
              OUI 💘
            </Button>
          </motion.div>

          {/* NO Button - Runs away */}
          <motion.button
            ref={noButtonRef}
            className="absolute px-8 py-4 text-lg md:text-xl font-bold rounded-full bg-destructive text-destructive-foreground shadow-button transition-colors"
            style={{
              left: noPosition.x || "auto",
              right: noPosition.x ? "auto" : "10%",
              top: noPosition.y,
            }}
            animate={{
              left: noPosition.x || undefined,
              top: noPosition.y,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            NON ❌
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ValentineQuestion;
