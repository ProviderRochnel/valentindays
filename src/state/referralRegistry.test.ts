import { describe, expect, it } from "vitest";
import {
  countAwaitingReply,
  initialReferralRegistryState,
  referralRegistryReducer,
  selectPartnerReferrals,
} from "./referralRegistry";

const PARTNER = { fr: "Centre d’accueil", en: "Shelter" };
const NOW = { fr: "17 sept., 12:00", en: "17 Sept, 12:00" };

describe("orientations", () => {
  it("ne présente à une structure que les orientations qui la concernent", () => {
    const state = initialReferralRegistryState();
    const shelters = selectPartnerReferrals(state, "shelter");

    expect(shelters.length).toBeGreaterThan(0);
    expect(shelters.every((referral) => referral.partnerKind === "shelter")).toBe(true);
  });

  it("confirme la prise en charge et conserve la trace du compte rendu", () => {
    const initial = initialReferralRegistryState();
    const target = initial.referrals.find((referral) => referral.status === "wait")!;
    const previousReports = target.reports.length;

    const state = referralRegistryReducer(initial, {
      type: "report",
      input: {
        reference: target.reference,
        author: PARTNER,
        message: { fr: "Prise en charge confirmée", en: "Support confirmed" },
        status: "ok",
        at: NOW,
      },
    });

    const updated = state.referrals.find((referral) => referral.reference === target.reference)!;
    expect(updated.status).toBe("ok");
    expect(updated.reports).toHaveLength(previousReports + 1);
    expect(updated.reports.at(-1)?.author).toEqual(PARTNER);
  });

  it("laisse le statut inchangé lorsque le compte rendu n’en propose pas", () => {
    const initial = initialReferralRegistryState();
    const target = initial.referrals[0];

    const state = referralRegistryReducer(initial, {
      type: "report",
      input: {
        reference: target.reference,
        author: PARTNER,
        message: { fr: "Note interne", en: "Internal note" },
        at: NOW,
      },
    });

    expect(state.referrals[0].status).toBe(target.status);
  });

  it("décompte les orientations en attente de réponse", () => {
    const state = initialReferralRegistryState();
    expect(countAwaitingReply(state.referrals)).toBe(
      state.referrals.filter((referral) => referral.status === "wait").length,
    );
  });
});

describe("rendez-vous", () => {
  it("met à jour le statut du seul rendez-vous visé", () => {
    const initial = initialReferralRegistryState();
    const target = initial.appointments.find((appointment) => appointment.status === "wait")!;

    const state = referralRegistryReducer(initial, {
      type: "setAppointmentStatus",
      id: target.id,
      status: "ok",
    });

    expect(state.appointments.find((appointment) => appointment.id === target.id)?.status).toBe("ok");
    expect(state.appointments.filter((appointment) => appointment.status === "ok")).toHaveLength(
      initial.appointments.filter((appointment) => appointment.status === "ok").length + 1,
    );
  });
});
