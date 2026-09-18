import { describe, expect, it } from "vitest";
import {
  caseRegistryReducer,
  countNewCases,
  initialCaseRegistryState,
  selectCase,
  type CaseRegistryState,
} from "./caseRegistry";

const OFFICER = "A. Mbarga";

function openCase(state: CaseRegistryState): CaseRegistryState {
  return caseRegistryReducer(state, {
    type: "open",
    trackingCode: "K4P-92Q",
    input: {
      priority: "crit",
      channel: "web_anon",
      violenceType: "phys",
      region: "centre",
      childInvolved: true,
    },
  });
}

describe("file des dossiers", () => {
  it("place un nouveau signalement en tête et le sélectionne", () => {
    const state = openCase(initialCaseRegistryState());

    expect(state.cases[0].reference).toBe("PC-2026-004822");
    expect(state.selectedReference).toBe("PC-2026-004822");
    expect(selectCase(state)?.priority).toBe("crit");
  });

  it("mémorise le code de suivi remis à l’usager", () => {
    expect(openCase(initialCaseRegistryState()).lastTrackingCode).toBe("K4P-92Q");
  });

  it("attribue une référence différente à chaque dossier", () => {
    const state = openCase(openCase(initialCaseRegistryState()));
    expect(state.cases[0].reference).toBe("PC-2026-004823");
    expect(state.cases[1].reference).toBe("PC-2026-004822");
  });

  it("compte les dossiers encore au stade « Nouveau »", () => {
    const initial = initialCaseRegistryState();
    expect(countNewCases(openCase(initial).cases)).toBe(countNewCases(initial.cases) + 1);
  });
});

describe("traitement d’un dossier", () => {
  it("avance d’une étape, désigne l’agent et trace l’action", () => {
    const opened = openCase(initialCaseRegistryState());
    const state = caseRegistryReducer(opened, {
      type: "advance",
      reference: "PC-2026-004822",
      officer: OFFICER,
    });

    const file = selectCase(state);
    expect(file?.stage).toBe(1);
    expect(file?.owner).toBe(OFFICER);
    expect(file?.history.at(-1)?.label.fr).toContain(OFFICER);
  });

  it("conserve le responsable initial lorsqu’un dossier est déjà confié", () => {
    const initial = initialCaseRegistryState();
    const owned = initial.cases.find((file) => file.owner !== null);
    const state = caseRegistryReducer(initial, {
      type: "advance",
      reference: owned!.reference,
      officer: OFFICER,
    });

    expect(state.cases.find((file) => file.reference === owned!.reference)?.owner).toBe(owned!.owner);
  });

  it("retire le dossier de la file à la clôture et sélectionne le suivant", () => {
    const initial = initialCaseRegistryState();
    const closable = initial.cases.find((file) => file.stage === 5)!;
    const state = caseRegistryReducer(
      { ...initial, selectedReference: closable.reference },
      { type: "advance", reference: closable.reference, officer: OFFICER },
    );

    expect(state.cases.some((file) => file.reference === closable.reference)).toBe(false);
    expect(state.selectedReference).toBe(state.cases[0].reference);
  });

  it("confie le dossier à un collègue et l’inscrit dans l’historique", () => {
    const initial = initialCaseRegistryState();
    const reference = initial.cases[0].reference;
    const state = caseRegistryReducer(initial, {
      type: "assign",
      reference,
      officer: "J. Ngo Bassa",
    });

    const file = state.cases.find((item) => item.reference === reference);
    expect(file?.owner).toBe("J. Ngo Bassa");
    expect(file?.history.at(-1)?.label.en).toBe("Assigned to J. Ngo Bassa");
  });

  it("ignore une action visant une référence inconnue", () => {
    const initial = initialCaseRegistryState();
    const state = caseRegistryReducer(initial, {
      type: "advance",
      reference: "PC-2026-000000",
      officer: OFFICER,
    });

    expect(state).toBe(initial);
  });
});
