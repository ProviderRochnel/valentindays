import { useEffect, useState } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { Icon } from "@/components/common/Icon";
import { Panel, PanelBody, PanelHeader, PanelTitle } from "@/components/common/Panel";
import { formatClock } from "@/domain/reporting";
import { useUssdSession } from "@/hooks/useUssdSession";
import { useI18n } from "@/i18n/useI18n";
import { cn } from "@/lib/utils";

const DIGIT_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

/**
 * Aperçu du menu USSD tel qu'il s'affiche sur un téléphone simple.
 * Il montre aux usagers — et aux agents en formation — que le service reste
 * accessible sans Internet et sans smartphone.
 */
export function UssdSimulator() {
  const { t } = useI18n();
  const { screen, screenId, buffer, error, press, dial } = useUssdSession();
  const [clock, setClock] = useState(() => formatClock());

  useEffect(() => {
    const timer = window.setInterval(() => setClock(formatClock()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          {t({
            fr: "Ce que vous verrez sur votre téléphone",
            en: "What you will see on your phone",
          })}
        </PanelTitle>
      </PanelHeader>

      <PanelBody className="flex flex-col gap-3">
        <div className="mx-auto w-full max-w-[262px] rounded-[34px] border border-[#2A3547] bg-[#1A2332] px-[17px] py-5 shadow-[0_14px_30px_rgba(10,18,32,.22)]">
          <div className="mx-auto mb-3.5 h-[5px] w-[52px] rounded-[3px] bg-[#39455A]" />

          <div
            aria-live="polite"
            className="font-mono-gov flex h-[206px] flex-col rounded-md bg-[#DCE6D6] px-2.5 py-2 text-[12.5px] leading-[1.45] text-[#12240F] shadow-[inset_0_0_0_2px_#B9C8B0]"
          >
            <div className="mb-1.5 flex justify-between border-b border-[#A9BA9F] pb-[3px] text-[10.5px]">
              <span>▮▮▮▯</span>
              <span>{clock}</span>
            </div>
            <pre className="m-0 flex-1 overflow-auto whitespace-pre-wrap font-[inherit]">
              {error ? <span className="text-[#8A2A1F]">{t(error)}{"\n"}</span> : null}
              {t(screen.text)}
            </pre>
            <div className="min-h-[22px] border-t border-[#A9BA9F] pt-1">
              {screenId === "end" ? "" : `> ${buffer}_`}
            </div>
          </div>

          <div className="mt-3.5 grid grid-cols-3 gap-[7px]">
            {DIGIT_KEYS.map((key) => (
              <UssdKeyButton key={key} onClick={() => press(key)}>
                {key}
              </UssdKeyButton>
            ))}
            <UssdKeyButton onClick={() => press("end")} className="bg-[#3A2F35] font-sans text-[13px] font-bold">
              ✕
            </UssdKeyButton>
            <UssdKeyButton
              onClick={() => press("del")}
              className="font-sans text-sm"
              label={t({ fr: "Effacer", en: "Delete" })}
            >
              ⌫
            </UssdKeyButton>
            <UssdKeyButton
              onClick={() => press("ok")}
              className="border-[#1A8A82] bg-[#146E68] font-sans text-[13px] font-bold"
            >
              OK
            </UssdKeyButton>
          </div>
        </div>

        <ActionButton variant="primary" onClick={dial}>
          <Icon name="phone" />
          {t({ fr: "Essayer le code court", en: "Try the short code" })}
        </ActionButton>

        <p className="text-center text-[13px] text-muted-ink">
          {t({
            fr: "Le menu porte un intitulé neutre pour ne pas attirer l’attention.",
            en: "The menu has a neutral title so as not to draw attention.",
          })}
        </p>
      </PanelBody>
    </Panel>
  );
}

function UssdKeyButton({
  children,
  onClick,
  className,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "font-mono-gov rounded-[10px] border border-[#3A475D] bg-[#2B3649] py-[7px] text-base text-[#E8EDF5] hover:bg-[#35425A]",
        className,
      )}
    >
      {children}
    </button>
  );
}
