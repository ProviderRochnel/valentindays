import { PriorityBadge, StatusPill } from "@/components/common/Badges";
import { CASE_STATUSES, INTAKE_CHANNELS, VIOLENCE_TYPES, findRegion } from "@/domain/referentials";
import type { CaseFile } from "@/domain/types";
import { useI18n } from "@/i18n/useI18n";
import { cn } from "@/lib/utils";

const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1440;

interface CaseTableProps {
  cases: readonly CaseFile[];
  selectedReference: string | null;
  onSelect: (reference: string) => void;
}

export function CaseTable({ cases, selectedReference, onSelect }: CaseTableProps) {
  const { t } = useI18n();

  const relativeTime = (minutes: number): string => {
    if (minutes === 0) return t({ fr: "à l’instant", en: "just now" });
    if (minutes < MINUTES_PER_HOUR) return t({ fr: `il y a ${minutes} min`, en: `${minutes} min ago` });
    if (minutes < MINUTES_PER_DAY) {
      const hours = Math.floor(minutes / MINUTES_PER_HOUR);
      return t({ fr: `il y a ${hours} h`, en: `${hours} h ago` });
    }
    return t({ fr: "hier", en: "yesterday" });
  };

  const statusTone = (stage: number) => (stage === 0 ? "new" : stage >= 4 ? "ok" : "default");

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-panel">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">{t({ fr: "Dossiers à traiter", en: "Cases to handle" })}</caption>
        <thead>
          <tr>
            {[
              t({ fr: "Réf.", en: "Ref." }),
              t({ fr: "Priorité", en: "Priority" }),
              t({ fr: "Situation", en: "Situation" }),
              t({ fr: "Reçu", en: "Received" }),
              t({ fr: "Statut", en: "Status" }),
            ].map((label) => (
              <th
                key={label}
                scope="col"
                className="whitespace-nowrap bg-navy px-3 py-[11px] text-left text-[13px] font-semibold text-white"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cases.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-3 py-[11px] text-muted-ink">
                {t({
                  fr: "Aucun dossier ne correspond à ces filtres.",
                  en: "No case matches these filters.",
                })}
              </td>
            </tr>
          ) : (
            cases.map((file) => (
              <tr
                key={file.reference}
                tabIndex={0}
                onClick={() => onSelect(file.reference)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") onSelect(file.reference);
                }}
                className={cn(
                  "cursor-pointer even:bg-zebra hover:bg-blue-soft",
                  file.reference === selectedReference &&
                    "bg-blue-soft [&>td:first-child]:shadow-[inset_3px_0_hsl(var(--blue))]",
                )}
              >
                <td className="whitespace-nowrap border-b border-line px-3 py-[11px]">
                  <span className="font-mono-gov text-[12.5px] text-ink-2">
                    {file.reference.slice(-6)}
                  </span>
                </td>
                <td className="border-b border-line px-3 py-[11px]">
                  <PriorityBadge priority={file.priority} />
                </td>
                <td className="min-w-[170px] border-b border-line px-3 py-[11px]">
                  <b className="block text-sm">{t(VIOLENCE_TYPES[file.violenceType])}</b>
                  <span className="text-[12.5px] text-muted-ink">
                    {t(findRegion(file.region).label)} · {t(INTAKE_CHANNELS[file.channel])}
                    {file.childInvolved
                      ? ` · ${t({ fr: "enfant concerné", en: "child involved" })}`
                      : ""}
                  </span>
                </td>
                <td className="whitespace-nowrap border-b border-line px-3 py-[11px] text-[13px] text-muted-ink">
                  {relativeTime(file.receivedMinutesAgo)}
                </td>
                <td className="border-b border-line px-3 py-[11px]">
                  <StatusPill tone={statusTone(file.stage)}>{t(CASE_STATUSES[file.stage])}</StatusPill>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
