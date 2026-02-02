import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ValentineQuestion from "@/components/valentine/ValentineQuestion";
import PackScreen from "@/components/valentine/PackScreen";

type Screen = "question" | "pack";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("question");

  const handleYes = () => {
    setScreen("pack");
  };

  const handleRestart = () => {
    setScreen("question");
  };

  return (
    <div className="min-h-screen gradient-sunset flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <ValentineQuestion onYes={handleYes} />
          </motion.div>
        )}

        {screen === "pack" && (
          <motion.div
            key="pack"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <PackScreen onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
