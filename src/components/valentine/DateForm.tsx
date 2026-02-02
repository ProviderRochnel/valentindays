import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DateFormProps {
  onSubmit: (date: string, message: string) => void;
}

const DateForm = ({ onSubmit }: DateFormProps) => {
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!date || !message) {
      alert("S'il te plaît, remplis tous les champs ! 💕");
      return;
    }
    onSubmit(date, message);
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 font-romantic">
        📅 Choisis notre premier rendez-vous 💕
      </h2>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-lg font-medium">
            Quelle date te conviendrait ? 🗓️
          </Label>
          <Input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-card/90 border-primary/30 focus:border-primary text-foreground text-lg py-6"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-lg font-medium">
            Un petit mot doux pour moi ? 💌
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écris quelque chose de gentil..."
            className="bg-card/90 border-primary/30 focus:border-primary text-foreground min-h-24 text-lg"
          />
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleSubmit}
            className="w-full py-6 text-lg font-bold gradient-love shadow-button hover:shadow-glow transition-shadow"
          >
            💕 Confirmer
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DateForm;
