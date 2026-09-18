import { CURRENT_CASE_YEAR, NEXT_CASE_SEQUENCE, loadInitialCases } from "@/data/cases";
import { CASE_ACTIONS } from "@/domain/referentials";
import { buildCaseReference, createCaseFile, formatClock, nextStage } from "@/domain/reporting";
import type { Bilingual, CaseFile, NewCaseInput } from "@/domain/types";

export interface CaseRegistryState {
  cases: CaseFile[];
  /** Prochain numéro de séquence à attribuer. */
  sequence: number;
  /** Référence du dossier affiché dans le volet de détail. */
  selectedReference: string | null;
  /** Dernier code de suivi remis sur le portail public, pour « Suivre mon dossier ». */
  lastTrackingCode: string | null;
}

export type CaseRegistryAction =
  | { type: "open"; input: NewCaseInput; trackingCode?: string; now?: Date }
  | { type: "select"; reference: string }
  | { type: "advance"; reference: string; officer: string; now?: Date }
  | { type: "assign"; reference: string; officer: string; now?: Date }
  | { type: "log"; reference: string; label: Bilingual; now?: Date };

export function initialCaseRegistryState(): CaseRegistryState {
  const cases = loadInitialCases();
  return {
    cases,
    sequence: NEXT_CASE_SEQUENCE,
    selectedReference: cases[0]?.reference ?? null,
    lastTrackingCode: null,
  };
}

function appendEvent(file: CaseFile, label: Bilingual, now?: Date): CaseFile {
  return { ...file, history: [...file.history, { time: formatClock(now), label }] };
}

function mapCase(
  state: CaseRegistryState,
  reference: string,
  update: (file: CaseFile) => CaseFile,
): CaseFile[] {
  return state.cases.map((file) => (file.reference === reference ? update(file) : file));
}

export function caseRegistryReducer(
  state: CaseRegistryState,
  action: CaseRegistryAction,
): CaseRegistryState {
  switch (action.type) {
    case "open": {
      const reference = buildCaseReference(CURRENT_CASE_YEAR, state.sequence);
      const file = createCaseFile(action.input, { reference, now: action.now });
      const opened = action.input.owner
        ? appendEvent(
            file,
            {
              fr: `Dossier ouvert par ${action.input.owner}`,
              en: `Case opened by ${action.input.owner}`,
            },
            action.now,
          )
        : file;

      return {
        ...state,
        cases: [opened, ...state.cases],
        sequence: state.sequence + 1,
        selectedReference: reference,
        lastTrackingCode: action.trackingCode ?? state.lastTrackingCode,
      };
    }

    case "select":
      return { ...state, selectedReference: action.reference };

    case "advance": {
      const target = state.cases.find((file) => file.reference === action.reference);
      if (!target) return state;

      // Dernière étape : le dossier quitte la file, son historique est conservé.
      if (target.stage === 5) {
        const remaining = state.cases.filter((file) => file.reference !== action.reference);
        return {
          ...state,
          cases: remaining,
          selectedReference: remaining[0]?.reference ?? null,
        };
      }

      const label = CASE_ACTIONS[target.stage];
      return {
        ...state,
        cases: mapCase(state, action.reference, (file) =>
          appendEvent(
            {
              ...file,
              stage: nextStage(file.stage),
              owner: file.owner ?? action.officer,
              receivedMinutesAgo: 0,
            },
            {
              fr: `${label.fr} · ${action.officer}`,
              en: `${label.en} · ${action.officer}`,
            },
            action.now,
          ),
        ),
      };
    }

    case "assign":
      return {
        ...state,
        cases: mapCase(state, action.reference, (file) =>
          appendEvent(
            { ...file, owner: action.officer },
            { fr: `Confié à ${action.officer}`, en: `Assigned to ${action.officer}` },
            action.now,
          ),
        ),
      };

    case "log":
      return {
        ...state,
        cases: mapCase(state, action.reference, (file) =>
          appendEvent(file, action.label, action.now),
        ),
      };

    default:
      return state;
  }
}

export function selectCase(state: CaseRegistryState): CaseFile | undefined {
  return state.cases.find((file) => file.reference === state.selectedReference);
}

/** Nombre de dossiers encore au stade « Nouveau ». */
export function countNewCases(cases: readonly CaseFile[]): number {
  return cases.filter((file) => file.stage === 0).length;
}
