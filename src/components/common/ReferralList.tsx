import { PriorityBadge, StatusPill } from "@/components/common/Badges";
import type { Referral } from "@/domain/types";
import { REFERRAL_STATUS } from "./referralStatus";
import { useI18n } from "@/i18n/useI18n";
import { cn } from "@/lib/utils";

interface ReferralListProps {
  referrals: readonly Referral[];
  selected: string | null;
  onSelect: (reference: string) => void;
  /** Contexte affiché en seconde ligne : destinataire ou date de réception. */
  secondary: (referral: Referral) => string;
}

export function ReferralList({ referrals, selected, onSelect, secondary }: ReferralListProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col">
      {referrals.map((referral) => {
        const status = REFERRAL_STATUS[referral.status];
        return (
          <button
            key={referral.reference}
            type="button"
            onClick={() => onSelect(referral.reference)}
            className={cn(
              "grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-2.5 gap-y-[5px] border-t border-line px-[18px] py-3.5 text-left first:rounded-t-xl first:border-t-0 last:rounded-b-xl hover:bg-blue-soft",
              referral.reference === selected &&
                "bg-blue-soft shadow-[inset_3px_0_hsl(var(--blue))]",
            )}
          >
            <b className="text-[14.5px] text-navy">{t(referral.need)}</b>
            <PriorityBadge priority={referral.priority} />
            <span className="col-span-2 text-[12.5px] text-muted-ink">{secondary(referral)}</span>
            <span className="col-span-2">
              <StatusPill tone={status.tone}>{t(status.label)}</StatusPill>
            </span>
          </button>
        );
      })}
    </div>
  );
}
