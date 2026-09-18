import { useCallback, useEffect, useState } from "react";
import { SERVICE_CONFIG } from "@/domain/config";

const NEUTRAL_TITLE = "Météo";
const SERVICE_TITLE = "PROTECT-CAMEROUN";

function hasOpenDialog(): boolean {
  return document.querySelector('[role="dialog"][data-state="open"], dialog[open]') !== null;
}

/**
 * Sortie rapide : remplace immédiatement la page par un contenu neutre et
 * quitte le site. C'est une mesure de sécurité pour les personnes dont le
 * téléphone ou l'ordinateur est surveillé.
 *
 * @param enabled n'active le raccourci Échap que sur les pages publiques.
 */
export function useQuickExit(enabled: boolean) {
  const [neutralScreenVisible, setNeutralScreenVisible] = useState(false);

  const triggerQuickExit = useCallback(() => {
    setNeutralScreenVisible(true);
    document.title = NEUTRAL_TITLE;

    try {
      // Efface la page du dispositif de l'historique de navigation.
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    } catch {
      // Certains navigateurs restreignent `replaceState` : l'écran neutre suffit.
    }

    if (window.top === window.self) {
      try {
        window.location.replace(SERVICE_CONFIG.quickExitUrl);
      } catch {
        // La redirection peut être bloquée : l'écran neutre reste affiché.
      }
    }
  }, []);

  const dismissNeutralScreen = useCallback(() => {
    setNeutralScreenVisible(false);
    document.title = SERVICE_TITLE;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || hasOpenDialog() || neutralScreenVisible) return;
      triggerQuickExit();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, neutralScreenVisible, triggerQuickExit]);

  return { neutralScreenVisible, triggerQuickExit, dismissNeutralScreen };
}
