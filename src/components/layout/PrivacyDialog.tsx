import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ActionButton } from "@/components/common/ActionButton";
import { useI18n } from "@/i18n/useI18n";
import { GREEN_LINE } from "@/domain/referentials";

interface PrivacyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyDialog({ open, onOpenChange }: PrivacyDialogProps) {
  const { t } = useI18n();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px]">
        <DialogHeader>
          <DialogTitle>{t({ fr: "Confidentialité", en: "Privacy" })}</DialogTitle>
          <DialogDescription className="sr-only">
            {t({
              fr: "Règles de traitement des informations transmises au Ministère.",
              en: "How the information sent to the Ministry is handled.",
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3.5 text-[14.5px] text-ink-2">
          <p>
            {t({
              fr: "Les informations que vous transmettez servent uniquement à protéger et accompagner les personnes concernées. Elles sont traitées par les agents habilités du MINPROFF.",
              en: "The information you share is used only to protect and support the people concerned. It is handled by authorised MINPROFF officers.",
            })}
          </p>
          <p>
            {t({
              fr: "Les structures partenaires ne reçoivent que ce dont elles ont besoin pour aider. Chaque consultation est enregistrée et les informations ne sont conservées que le temps nécessaire.",
              en: "Partner organisations only receive what they need to help. Every consultation is recorded, and information is kept only as long as necessary.",
            })}
          </p>
          <p>
            {t({
              fr: `Les statistiques publiées sont anonymes et regroupées par région. Pour toute question sur vos informations, appelez la ligne verte ${GREEN_LINE}.`,
              en: `Published statistics are anonymous and grouped by region. To ask a question about your information, call the ${GREEN_LINE} green line.`,
            })}
          </p>
        </div>

        <DialogFooter>
          <ActionButton variant="blue" onClick={() => onOpenChange(false)}>
            {t({ fr: "Fermer", en: "Close" })}
          </ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
