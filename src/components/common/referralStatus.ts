import type { Bilingual, ReferralStatus } from "@/domain/types";
import type { StatusTone } from "./Badges";

/** Libellé et teinte associés à chaque statut d'orientation. */
export const REFERRAL_STATUS: Readonly<
  Record<ReferralStatus, { label: Bilingual; tone: StatusTone }>
> = {
  wait: { label: { fr: "En attente de réponse", en: "Awaiting reply" }, tone: "new" },
  ok: { label: { fr: "Prise en charge confirmée", en: "Support confirmed" }, tone: "ok" },
  more: { label: { fr: "Précision demandée", en: "Clarification requested" }, tone: "wait" },
  done: { label: { fr: "Accompagnement terminé", en: "Support completed" }, tone: "default" },
};
