import { toast } from "sonner";
import { ActionButton } from "@/components/common/ActionButton";
import { StatusPill } from "@/components/common/Badges";
import type { AppointmentStatus } from "@/domain/types";
import { useI18n } from "@/i18n/useI18n";
import { useService } from "@/state/useService";

const STATUS_LABELS: Record<
  AppointmentStatus,
  { label: { fr: string; en: string }; tone: "ok" | "new" | "wait" }
> = {
  ok: { label: { fr: "Confirmé", en: "Confirmed" }, tone: "ok" },
  wait: { label: { fr: "À confirmer", en: "To confirm" }, tone: "new" },
  moved: { label: { fr: "Reporté", en: "Postponed" }, tone: "wait" },
};

/** Rendez-vous planifiés par la structure avec les personnes accompagnées. */
export function PartnerAppointments() {
  const { t } = useI18n();
  const { referralState, dispatchReferral } = useService();

  const setStatus = (id: string, status: AppointmentStatus) => {
    dispatchReferral({ type: "setAppointmentStatus", id, status });
    toast.success(
      status === "ok"
        ? t({
            fr: "Rendez-vous confirmé · rappel discret programmé",
            en: "Appointment confirmed · discreet reminder scheduled",
          })
        : t({
            fr: "Rendez-vous reporté · le Ministère proposera une autre date",
            en: "Appointment postponed · the Ministry will offer another date",
          }),
    );
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-panel">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">
            {t({ fr: "Rendez-vous de la semaine", en: "Appointments this week" })}
          </caption>
          <thead>
            <tr>
              {[
                t({ fr: "Date", en: "Date" }),
                t({ fr: "Personne", en: "Person" }),
                t({ fr: "Objet", en: "Purpose" }),
                t({ fr: "Avec", en: "With" }),
                t({ fr: "Statut", en: "Status" }),
                "",
              ].map((label, index) => (
                <th
                  key={label || `actions-${index}`}
                  scope="col"
                  className="whitespace-nowrap bg-navy px-3 py-[11px] text-left text-[13px] font-semibold text-white"
                >
                  {label || <span className="sr-only">{t({ fr: "Actions", en: "Actions" })}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {referralState.appointments.map((appointment) => {
              const status = STATUS_LABELS[appointment.status];
              return (
                <tr key={appointment.id} className="even:bg-zebra">
                  <td className="whitespace-nowrap border-b border-line px-3 py-[11px]">
                    <b>{t(appointment.when)}</b>
                  </td>
                  <td className="border-b border-line px-3 py-[11px]">{t(appointment.person)}</td>
                  <td className="border-b border-line px-3 py-[11px]">{t(appointment.purpose)}</td>
                  <td className="whitespace-nowrap border-b border-line px-3 py-[11px]">
                    {appointment.staff}
                  </td>
                  <td className="border-b border-line px-3 py-[11px]">
                    <StatusPill tone={status.tone}>{t(status.label)}</StatusPill>
                  </td>
                  <td className="whitespace-nowrap border-b border-line px-3 py-[11px]">
                    <div className="flex gap-2">
                      {appointment.status === "wait" ? (
                        <ActionButton
                          variant="primary"
                          size="sm"
                          onClick={() => setStatus(appointment.id, "ok")}
                        >
                          {t({ fr: "Confirmer", en: "Confirm" })}
                        </ActionButton>
                      ) : null}
                      {appointment.status !== "moved" ? (
                        <ActionButton
                          variant="ghost"
                          size="sm"
                          onClick={() => setStatus(appointment.id, "moved")}
                        >
                          {t({ fr: "Reporter", en: "Postpone" })}
                        </ActionButton>
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-[13px] text-muted-ink">
        {t({
          fr: "Les rappels envoyés aux personnes ne mentionnent jamais l’objet du rendez-vous.",
          en: "Reminders sent to people never mention the reason for the appointment.",
        })}
      </p>
    </div>
  );
}
