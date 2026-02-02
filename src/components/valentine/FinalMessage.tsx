import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FinalMessageProps {
  date: string;
  message: string;
  onRestart: () => void;
}

const FinalMessage = ({ date, message, onRestart }: FinalMessageProps) => {
  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      className="text-center max-w-lg mx-auto px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-3xl md:text-5xl font-bold mb-6 font-romantic"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        💖 C'est parfait ! 💖
      </motion.h1>

      <motion.div
        className="text-xl md:text-2xl text-secondary font-bold mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        📅 Rendez-vous le : {formattedDate}
      </motion.div>

      <motion.div
        className="bg-primary/20 backdrop-blur-sm rounded-2xl p-6 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-lg font-bold mb-3">💌 Ton message :</h3>
        <p className="text-lg leading-relaxed">{message}</p>
      </motion.div>

      <motion.h2
        className="text-xl md:text-2xl font-bold mb-8 font-romantic"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        🎊 J'ai tellement hâte ! 🎊
      </motion.h2>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onRestart}
          className="px-8 py-6 text-lg font-bold gradient-love shadow-button hover:shadow-glow transition-shadow"
        >
          🔄 Veux-tu refaire le choix ?
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default FinalMessage;
