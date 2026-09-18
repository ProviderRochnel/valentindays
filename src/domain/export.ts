import type { Bilingual } from "./types";

/** Marque d'ordre des octets, attendue par les tableurs pour lire l'UTF-8. */
const UTF8_BOM = "\uFEFF";

/**
 * Construit un fichier CSV à partir de lignes déjà anonymisées.
 * Le séparateur point-virgule et le BOM UTF-8 assurent une ouverture correcte
 * dans les tableurs utilisés par les services.
 */
export function buildCsv(rows: readonly (readonly (string | number)[])[]): string {
  return `${UTF8_BOM}${rows.map((row) => row.join(";")).join("\n")}`;
}

export const EXPORT_NOTICE: Bilingual = {
  fr: "Rapport téléchargé : il ne contient que des chiffres regroupés par région.",
  en: "Report downloaded: it only contains figures grouped by region.",
};

/** Déclenche le téléchargement d'un fichier texte depuis le navigateur. */
export function downloadTextFile(filename: string, content: string, mimeType: string): void {
  const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
