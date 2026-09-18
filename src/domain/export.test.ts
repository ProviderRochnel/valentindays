import { describe, expect, it } from "vitest";
import { buildCsv } from "./export";

describe("export CSV", () => {
  it("préfixe le fichier d’un BOM UTF-8 pour les tableurs", () => {
    expect(buildCsv([["Région"]]).charCodeAt(0)).toBe(0xfeff);
  });

  it("sépare les colonnes par un point-virgule et les lignes par un saut", () => {
    const csv = buildCsv([
      ["Région", "Signalements"],
      ["Centre", 295],
    ]);
    expect(csv.slice(1)).toBe("Région;Signalements\nCentre;295");
  });
});
