import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync, writeFileSync } from "fs";

/**
 * Chemin racine du site publié. GitHub Pages sert le projet sous
 * `/<dépôt>/` ; `BASE_PATH` permet de viser un domaine propre
 * (`minproff.cm/protect`, par exemple) sans toucher au code.
 */
const BASE_PATH = process.env.BASE_PATH ?? "/valentindays/";

/**
 * GitHub Pages ne sait pas réécrire les URL vers `index.html`. Dupliquer la
 * page en `404.html` permet à l'application de démarrer sur n'importe quelle
 * adresse (`/dispositif`, `/espace-minproff`…) ; le routeur prend ensuite le
 * relais. Le `.nojekyll` empêche Jekyll d'ignorer les fichiers techniques.
 */
function staticHostingFallback(): Plugin {
  return {
    name: "protect-cameroun:static-hosting-fallback",
    apply: "build",
    closeBundle() {
      copyFileSync("dist/index.html", "dist/404.html");
      writeFileSync("dist/.nojekyll", "");
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? BASE_PATH : "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    staticHostingFallback(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
