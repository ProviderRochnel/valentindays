import { motion } from "framer-motion";

const rewards = [
  { emoji: "💘", text: "Un Date Romantique" },
  { emoji: "🍫", text: "Des Chocolats Délicieux" },
  { emoji: "🌹", text: "Des Fleurs Magnifiques" },
  { emoji: "💫", text: "Moi pour la vie 😌" },
];

interface RewardsListProps {
  minimized?: boolean;
}

const RewardsList = ({ minimized = false }: RewardsListProps) => {
  return (
    <motion.div
      className={`text-center ${minimized ? "mb-4" : "mb-8"}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {!minimized && (
        <>
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-4 font-romantic"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            🎉 Félicitations 🎉
          </motion.h1>
          <h2 className="text-xl md:text-2xl mb-6 opacity-90">Tu as débloqué :</h2>
        </>
      )}

      {minimized && (
        <h1 className="text-2xl md:text-3xl font-bold mb-4 font-romantic">
          🎉 Tes récompenses 🎉
        </h1>
      )}

      <div className={`flex flex-wrap justify-center gap-3 ${minimized ? "" : "flex-col items-center"}`}>
        {rewards.map((reward, index) => (
          <motion.div
            key={index}
            className={`bg-primary/20 backdrop-blur-sm rounded-2xl px-5 py-3 font-medium ${
              minimized ? "text-sm" : "text-lg md:text-xl"
            }`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
          >
            {reward.emoji} {reward.text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RewardsList;
