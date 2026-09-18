import { describe, expect, it } from "vitest";
import {
  buildCaseReference,
  channelForReporterMode,
  createCaseFile,
  generateTrackingCode,
  isValidTrackingCode,
  nextStage,
  normalizeTrackingCode,
  suggestPriority,
} from "./reporting";

describe("code de suivi", () => {
  it("génère un code au format XXX-XXX", () => {
    expect(generateTrackingCode(() => 0)).toMatch(/^[A-Z0-9]{3}-[A-Z0-9]{3}$/);
  });

  it("n’utilise pas de caractères ambigus à l’oral ou à l’écrit", () => {
    const codes = Array.from({ length: 200 }, () => generateTrackingCode()).join("");
    expect(codes).not.toMatch(/[OIL0125S8BZ]/);
  });

  it("accepte une saisie sans tiret, en minuscules ou avec des espaces", () => {
    expect(normalizeTrackingCode("k4p92q")).toBe("K4P-92Q");
    expect(normalizeTrackingCode("  K4P-92Q ")).toBe("K4P-92Q");
    expect(normalizeTrackingCode("K4P 92Q")).toBe("K4P-92Q");
  });

  it("refuse un code de longueur incorrecte ou contenant un symbole", () => {
    expect(normalizeTrackingCode("K4P-92")).toBeNull();
    expect(normalizeTrackingCode("K4P-92QQ")).toBeNull();
    expect(normalizeTrackingCode("K4P-9_Q")).toBeNull();
    expect(isValidTrackingCode("")).toBe(false);
  });

  it("valide un code qu’il vient de générer", () => {
    expect(isValidTrackingCode(generateTrackingCode())).toBe(true);
  });
});

describe("priorité suggérée", () => {
  it("place en critique toute situation de danger immédiat", () => {
    expect(suggestPriority({ dangerNow: "yes", childInvolved: "no" })).toBe("crit");
    expect(suggestPriority({ dangerNow: "yes", childInvolved: "yes" })).toBe("crit");
  });

  it("élève la priorité dès qu’un enfant est concerné", () => {
    expect(suggestPriority({ dangerNow: "no", childInvolved: "yes" })).toBe("high");
  });

  it("élève la priorité lorsque le danger est incertain", () => {
    expect(suggestPriority({ dangerNow: "unknown", childInvolved: "no" })).toBe("high");
  });

  it("retient une priorité modérée en l’absence de signal", () => {
    expect(suggestPriority({ dangerNow: "no", childInvolved: "no" })).toBe("mod");
    expect(suggestPriority({ dangerNow: "no", childInvolved: "unknown" })).toBe("mod");
  });
});

describe("canal de réception", () => {
  it("distingue les trois modes du formulaire public", () => {
    expect(channelForReporterMode("anon")).toBe("web_anon");
    expect(channelForReporterMode("third")).toBe("web_third");
    expect(channelForReporterMode("conf")).toBe("web_id");
  });
});

describe("référence de dossier", () => {
  it("complète la séquence sur six chiffres", () => {
    expect(buildCaseReference(2026, 4822)).toBe("PC-2026-004822");
    expect(buildCaseReference(2026, 1)).toBe("PC-2026-000001");
  });
});

describe("création d’un dossier", () => {
  const input = {
    priority: "high",
    channel: "web_anon",
    violenceType: "phys",
    region: "centre",
    childInvolved: true,
  } as const;

  it("ouvre le dossier à la première étape, sans responsable", () => {
    const file = createCaseFile(input, { reference: "PC-2026-004822" });
    expect(file.stage).toBe(0);
    expect(file.owner).toBeNull();
    expect(file.receivedMinutesAgo).toBe(0);
  });

  it("retient « enfant concerné » comme motif par défaut", () => {
    const file = createCaseFile(input, { reference: "PC-2026-004822" });
    expect(file.riskFactors).toEqual([{ fr: "Enfant concerné", en: "Child involved" }]);
  });

  it("horodate la réception à partir de l’heure fournie", () => {
    const file = createCaseFile(input, {
      reference: "PC-2026-004822",
      now: new Date(2026, 8, 17, 9, 5),
    });
    expect(file.receivedAt).toBe("09:05");
  });
});

describe("progression d’un dossier", () => {
  it("avance d’une étape sans dépasser la clôture", () => {
    expect(nextStage(0)).toBe(1);
    expect(nextStage(4)).toBe(5);
    expect(nextStage(5)).toBe(5);
  });
});
