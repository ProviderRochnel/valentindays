import { Panel } from "@/components/common/Panel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ROLLOUT_PHASES } from "@/data/network";
import { useI18n } from "@/i18n/useI18n";

/** Jalons de mise en service, du cadrage à l'élargissement du réseau. */
export function RolloutTimeline() {
  const { t } = useI18n();

  return (
    <div className="mt-11">
      <SectionTitle
        title={t({ fr: "Les étapes de la mise en service", en: "Roll-out stages" })}
        description={t({
          fr: "Le dispositif grandit étape par étape, chacune s’appuyant sur la précédente.",
          en: "The service grows step by step, each stage building on the previous one.",
        })}
      />

      <Panel className="px-[22px] py-[22px]">
        <div className="grid gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-0">
          {ROLLOUT_PHASES.map((phase, index) => (
            <div key={phase.title.fr} className="flex flex-col gap-1.5 pr-3.5">
              <div
                className="relative -mr-3.5 h-2 last:mr-0 first:rounded-l-[4px] xl:[&:last-child]:rounded-r-[4px]"
                style={{ background: phase.color, color: phase.color }}
              >
                <span className="absolute left-0 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full border-2 border-current bg-white text-[11.5px] font-extrabold text-navy">
                  {index + 1}
                </span>
              </div>
              <h4 className="mt-3 text-[15px]">{t(phase.title)}</h4>
              {phase.publicLaunch ? (
                <span className="self-start rounded border border-teal-mark px-1.5 py-px text-[11px] font-bold uppercase tracking-[0.05em] text-teal">
                  {t({ fr: "Service ouvert au public", en: "Open to the public" })}
                </span>
              ) : null}
              <p className="text-[13px] text-ink-2">{t(phase.description)}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
