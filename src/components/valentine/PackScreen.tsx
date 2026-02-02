import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import GiftBox from "./GiftBox";
import RewardsList from "./RewardsList";
import DateForm from "./DateForm";
import FinalMessage from "./FinalMessage";
import FloatingHearts from "./FloatingHearts";
import Confetti from "./Confetti";
import Sparkles from "./Sparkles";

interface PackScreenProps {
  onRestart: () => void;
}

type Phase = "pack" | "rewards" | "form" | "final";

const PackScreen = ({ onRestart }: PackScreenProps) => {
  const [phase, setPhase] = useState<Phase>("pack");
  const [isOpening, setIsOpening] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  const [finalData, setFinalData] = useState({ date: "", message: "" });

  const handleOpenPack = () => {
    if (isOpening) return;
    setIsOpening(true);
    setShowEffects(true);

    setTimeout(() => {
      setPhase("rewards");
      setTimeout(() => setShowEffects(false), 2000);
    }, 1500);

    setTimeout(() => {
      setPhase("form");
    }, 4500);
  };

  const handleFormSubmit = (date: string, message: string) => {
    setFinalData({ date, message });

    // Create WhatsApp message
    const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const whatsappMessage = `💖 OUI, je veux être ta Valentine ! 💖

📅 Date choisie : ${formattedDate}

💌 Mon message :
${message}

🎁 J'ai hâte de profiter de :
💘 Notre Date Romantique
🍫 Les Chocolats Délicieux
🌹 Les Fleurs Magnifiques
💫 Et d'être avec toi pour toujours 😌`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = "237674414338";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    setShowEffects(true);
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setPhase("final");
      setTimeout(() => setShowEffects(false), 2000);
    }, 1000);
  };

  return (
    <motion.div
      className="fixed inset-0 gradient-pack flex flex-col items-center justify-center p-6 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FloatingHearts trigger={showEffects} count={40} />
      <Confetti trigger={showEffects} count={100} />
      <Sparkles trigger={isOpening} />

      <AnimatePresence mode="wait">
        {phase === "pack" && (
          <motion.div
            key="pack"
            className="flex flex-col items-center"
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.h1
              className="text-2xl md:text-4xl font-bold mb-6 text-center font-romantic drop-shadow-lg"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              🎁 Ouverture du Love Pack 🎁
            </motion.h1>
            <p className="text-lg mb-8 opacity-90">Clique sur le pack pour l'ouvrir !</p>
            <GiftBox onOpen={handleOpenPack} isOpening={isOpening} />
          </motion.div>
        )}

        {phase === "rewards" && (
          <motion.div key="rewards" exit={{ opacity: 0 }}>
            <RewardsList />
          </motion.div>
        )}

        {phase === "form" && (
          <motion.div
            key="form"
            className="w-full max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <RewardsList minimized />
            <DateForm onSubmit={handleFormSubmit} />
          </motion.div>
        )}

        {phase === "final" && (
          <motion.div key="final">
            <FinalMessage
              date={finalData.date}
              message={finalData.message}
              onRestart={onRestart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PackScreen;
