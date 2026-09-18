import { toast } from "sonner";
import { ActionButton } from "@/components/common/ActionButton";
import { Icon } from "@/components/common/Icon";
import { Notice } from "@/components/common/Notice";
import { useI18n } from "@/i18n/useI18n";

interface ConfirmationStepProps {
  trackingCode: string;
}

export function ConfirmationStep({ trackingCode }: ConfirmationStepProps) {
  const { t } = useI18n();

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(trackingCode);
      toast.success(t({ fr: "Code copié", en: "Code copied" }));
    } catch {
      // Presse-papiers indisponible : le code est rappelé dans le message.
      toast(t({ fr: `Notez votre code : ${trackingCode}`, en: `Write down your code: ${trackingCode}` }));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Notice
        icon="check"
        title={t({
          fr: "Votre signalement a bien été reçu",
          en: "Your report has been received",
        })}
      >
        {t({
          fr: "Conservez votre code de suivi : il ne sera plus affiché.",
          en: "Keep your tracking code: it will not be shown again.",
        })}
      </Notice>

      <div className="flex flex-wrap items-center gap-2.5">
        <span className="font-mono-gov inline-block rounded-xl border-[1.5px] border-dashed border-teal-mark bg-teal-soft px-[22px] py-3 text-[32px] font-bold tracking-[0.14em] text-navy">
          {trackingCode}
        </span>
        <ActionButton size="sm" onClick={copyCode}>
          <Icon name="copy" className="size-4" />
          {t({ fr: "Copier", en: "Copy" })}
        </ActionButton>
      </div>

      <div>
        <span className="gov-label">{t({ fr: "Et maintenant ?", en: "What happens next?" })}</span>
        <ol className="flex list-none flex-col gap-2 p-0 text-sm [counter-reset:step]">
          {[
            t({
              fr: "Un agent examine votre signalement, en priorité si quelqu’un est en danger.",
              en: "An officer reviews your report, as a priority if someone is in danger.",
            }),
            t({
              fr: "Si nécessaire, vous êtes orienté(e) vers une structure d’aide proche.",
              en: "If needed, you are referred to a nearby support service.",
            }),
            t({
              fr: "Saisissez votre code dans « Suivre mon dossier » pour voir l’avancement.",
              en: "Enter your code in “Track my case” to see progress.",
            }),
          ].map((step) => (
            <li
              key={step}
              className="grid grid-cols-[26px_minmax(0,1fr)] items-start gap-2.5 [counter-increment:step] before:grid before:size-6 before:place-items-center before:rounded-full before:bg-blue-soft before:text-[12.5px] before:font-bold before:text-blue before:content-[counter(step)]"
            >
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
