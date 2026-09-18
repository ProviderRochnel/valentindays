import { loadInitialAppointments, loadInitialReferrals } from "@/data/referrals";
import type {
  Appointment,
  AppointmentStatus,
  Bilingual,
  Referral,
  ReferralStatus,
} from "@/domain/types";

export interface ReferralRegistryState {
  referrals: Referral[];
  appointments: Appointment[];
  /** Orientation sélectionnée côté MINPROFF. */
  staffSelection: string | null;
  /** Orientation sélectionnée côté structure partenaire. */
  partnerSelection: string | null;
}

export interface ReferralReportInput {
  reference: string;
  author: Bilingual;
  message: Bilingual;
  /** Nouveau statut, lorsque le compte rendu en fait changer. */
  status?: ReferralStatus;
  at: Bilingual;
}

export type ReferralRegistryAction =
  | { type: "selectStaff"; reference: string }
  | { type: "selectPartner"; reference: string }
  | { type: "report"; input: ReferralReportInput }
  | { type: "setAppointmentStatus"; id: string; status: AppointmentStatus };

export function initialReferralRegistryState(): ReferralRegistryState {
  const referrals = loadInitialReferrals();
  return {
    referrals,
    appointments: loadInitialAppointments(),
    staffSelection: referrals[0]?.reference ?? null,
    partnerSelection: null,
  };
}

export function referralRegistryReducer(
  state: ReferralRegistryState,
  action: ReferralRegistryAction,
): ReferralRegistryState {
  switch (action.type) {
    case "selectStaff":
      return { ...state, staffSelection: action.reference };

    case "selectPartner":
      return { ...state, partnerSelection: action.reference };

    case "report":
      return {
        ...state,
        referrals: state.referrals.map((referral) =>
          referral.reference === action.input.reference
            ? {
                ...referral,
                status: action.input.status ?? referral.status,
                reports: [
                  ...referral.reports,
                  {
                    at: action.input.at,
                    author: action.input.author,
                    message: action.input.message,
                  },
                ],
              }
            : referral,
        ),
      };

    case "setAppointmentStatus":
      return {
        ...state,
        appointments: state.appointments.map((appointment) =>
          appointment.id === action.id ? { ...appointment, status: action.status } : appointment,
        ),
      };

    default:
      return state;
  }
}

/** Orientations confiées à la structure partenaire connectée. */
export function selectPartnerReferrals(
  state: ReferralRegistryState,
  partnerKind: Referral["partnerKind"],
): Referral[] {
  return state.referrals.filter((referral) => referral.partnerKind === partnerKind);
}

export function countAwaitingReply(referrals: readonly Referral[]): number {
  return referrals.filter((referral) => referral.status === "wait").length;
}
