import { useCallback, useState } from "react";
import { SHORT_CODE_PATTERN, USSD_SCREENS, type UssdScreenId } from "@/data/ussd";
import type { Bilingual } from "@/domain/types";

const MAX_INPUT_LENGTH = 12;
const END_SCREEN_DELAY_MS = 1600;

const UNKNOWN_CODE: Bilingual = { fr: "Code non reconnu", en: "Unknown code" };
const INVALID_CHOICE: Bilingual = { fr: "Choix non valide", en: "Invalid choice" };

export type UssdKey = string;

/**
 * Machine à états du menu USSD. Elle reproduit fidèlement le comportement
 * d'un téléphone sans Internet : saisie, validation, retour, raccrochage.
 */
export function useUssdSession() {
  const [screenId, setScreenId] = useState<UssdScreenId>("idle");
  const [buffer, setBuffer] = useState("");
  const [error, setError] = useState<Bilingual | null>(null);

  const goTo = useCallback((next: UssdScreenId) => {
    setScreenId(next);
    setError(null);
    if (next === "end") {
      window.setTimeout(() => setScreenId("idle"), END_SCREEN_DELAY_MS);
    }
  }, []);

  const press = useCallback(
    (key: UssdKey) => {
      if (key === "del") {
        setBuffer((current) => current.slice(0, -1));
        return;
      }

      if (key === "end") {
        if (screenId !== "idle") goTo("end");
        setBuffer("");
        return;
      }

      if (key === "ok") {
        if (screenId === "idle") {
          if (SHORT_CODE_PATTERN.test(buffer)) goTo("home");
          else setError(UNKNOWN_CODE);
        } else if (screenId !== "end") {
          const next = USSD_SCREENS[screenId].next?.[buffer];
          if (next) goTo(next);
          else setError(INVALID_CHOICE);
        }
        setBuffer("");
        return;
      }

      setBuffer((current) => (current.length < MAX_INPUT_LENGTH ? current + key : current));
    },
    [buffer, goTo, screenId],
  );

  /** Ouvre directement le menu, comme si le code court venait d'être composé. */
  const dial = useCallback(() => {
    setBuffer("");
    goTo("home");
  }, [goTo]);

  return {
    screen: USSD_SCREENS[screenId],
    screenId,
    buffer,
    error,
    press,
    dial,
  };
}
