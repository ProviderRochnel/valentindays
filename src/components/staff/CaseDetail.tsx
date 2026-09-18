import { toast } from "sonner";
import { ActionButton } from "@/components/common/ActionButton";
import { PriorityBadge, StatusPill, Tag } from "@/components/common/Badges";
import { DetailActions, DetailHeader, DetailSection, KeyValueList } from "@/components/common/Detail";
import { Icon } from "@/components/common/Icon";
import { Panel } from "@/components/common/Panel";
import {
  CASE_ACTIONS,
  CASE_STAGES,
  CASE_STATUSES,
  INTAKE_CHANNELS,
  PRIORITIES,
  VIOLENCE_TYPES,
  findRegion,
} from "@/domain/referentials";
import type { CaseFile } from "@/domain/types";
import { useI18n } from "@/i18n/useI18n";
import { useService } from "@/state/useService";
import { cn } from "@/lib/utils";

/** Agent connecté à l'espace de démonstration. */
const CURRENT_OFFICER = "A. Mbarga";
const COLLEAGUE = "J. Ngo Bassa";

const PRIORITY_GAUGE_COLORS: Record<string, string> = {
  crit: "bg-danger",
  high: "bg-orange-mark",
  mod: "bg-blue",
  low: "bg-muted-ink",
};

interface CaseDetailProps {
  file: CaseFile | undefined;
}

/** Volet de traitement d'un dossier : parcours, danger, pièces, historique. */
export function CaseDetail({ file }: CaseDetailProps) {
  const { t } = useI18n();
  const { dispatchCase } = useService();

  if (!file) {
    return (
      <Panel>
        <div className="px-[22px] py-[22px] text-muted-ink">
          {t({ fr: "Sélectionnez un dossier dans la liste.", en: "Select a case from the list." })}
        </div>
      </Panel>
    );
  }

  const priority = PRIORITIES[file.priority];
  const statusTone = file.stage === 0 ? "new" : file.stage >= 4 ? "ok" : "default";

  const advance = () => {
    const closing = file.stage === 5;
    if (closing) {
      dispatchCase({
        type: "log",
        reference: file.reference,
        label: {
          fr: `Dossier clôturé par ${CURRENT_OFFICER}`,
          en: `Case closed by ${CURRENT_OFFICER}`,
        },
      });
    }
    dispatchCase({ type: "advance", reference: file.reference, officer: CURRENT_OFFICER });
    toast.success(
      closing
        ? t({
            fr: `Dossier ${file.reference} clôturé · historique conservé`,
            en: `Case ${file.reference} closed · history kept`,
          })
        : `${file.reference} · ${t(CASE_STATUSES[Math.min(file.stage + 1, 5)])}`,
    );
  };

  const requestMoreInformation = () => {
    dispatchCase({
      type: "log",
      reference: file.reference,
      label: {
        fr: "Demande de complément envoyée (message discret)",
        en: "Request for more information sent (discreet message)",
      },
    });
    toast.success(
      t({
        fr: "Demande envoyée, sans mention de la situation",
        en: "Request sent, without mentioning the situation",
      }),
    );
  };

  const assign = () => {
    dispatchCase({ type: "assign", reference: file.reference, officer: COLLEAGUE });
    toast.success(t({ fr: `Dossier confié à ${COLLEAGUE}`, en: `Case assigned to ${COLLEAGUE}` }));
  };

  const openAttachments = () => {
    dispatchCase({
      type: "log",
      reference: file.reference,
      label: {
        fr: `Pièces jointes ouvertes par ${CURRENT_OFFICER}`,
        en: `Attachments opened by ${CURRENT_OFFICER}`,
      },
    });
    toast.success(
      t({
        fr: "Ouverture enregistrée dans l’historique",
        en: "Opening recorded in the history",
      }),
    );
  };

  return (
    <Panel>
      <DetailHeader reference={file.reference} title={t(VIOLENCE_TYPES[file.violenceType])}>
        <PriorityBadge priority={file.priority} />
        <StatusPill tone={statusTone}>{t(CASE_STATUSES[file.stage])}</StatusPill>
        {file.childInvolved ? (
          <Tag icon="child">{t({ fr: "Enfant concerné", en: "Child involved" })}</Tag>
        ) : null}
        <Tag icon="map">{t(findRegion(file.region).label)}</Tag>
      </DetailHeader>

      <DetailSection>
        <div aria-hidden className="grid grid-cols-6 gap-1">
          {CASE_STAGES.map((stage, index) => (
            <i
              key={stage.fr}
              title={t(stage)}
              className={cn(
                "block h-[7px] rounded-[3px] bg-line",
                index < file.stage && "bg-teal-mark",
                index === file.stage && "bg-blue",
              )}
            />
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-2.5 text-[13px] text-ink-2">
          <span>
            {t({ fr: `Étape ${file.stage + 1} sur 6`, en: `Step ${file.stage + 1} of 6` })} :{" "}
            <b className="text-navy">{t(CASE_STAGES[file.stage])}</b>
          </span>
          <span className="text-muted-ink">
            {file.stage < 5
              ? `${t({ fr: "Ensuite : ", en: "Next: " })}${t(CASE_STAGES[file.stage + 1])}`
              : t({ fr: "Dernière étape", en: "Last step" })}
          </span>
        </div>

        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-[3px] rounded-[10px] border border-line-2 bg-zebra px-3.5 py-3">
          <Icon name="clock" className="row-span-3 mt-0.5 size-[22px] text-blue" />
          <span className="text-[11.5px] font-bold uppercase tracking-[0.07em] text-muted-ink">
            {t({ fr: "Prochaine action", en: "Next action" })}
          </span>
          <b className="text-[14.5px] text-navy">{t(file.nextAction.label)}</b>
          <span className="text-[13px] text-ink-2">
            {t({ fr: "Responsable", en: "Officer" })} :{" "}
            {file.owner ?? t({ fr: "à désigner", en: "to be assigned" })} ·{" "}
            {t({ fr: "Échéance", en: "Due" })} : {t(file.nextAction.due)}
          </span>
        </div>
      </DetailSection>

      <DetailSection title={t({ fr: "Niveau de danger", en: "Level of danger" })}>
        <div className="flex justify-between">
          <span className="text-[13px] text-muted-ink">
            {t({ fr: "Suggestion à confirmer", en: "Suggestion to confirm" })}
          </span>
          <b className="text-[13px]">{t(priority.label)}</b>
        </div>
        <div className="h-2 overflow-hidden rounded bg-gris">
          <i
            className={cn("block h-full rounded-r", PRIORITY_GAUGE_COLORS[file.priority])}
            style={{ width: `${priority.gauge}%` }}
          />
        </div>
        <ul className="flex list-none flex-col gap-1.5 p-0 text-[13.5px]">
          {file.riskFactors.map((factor) => (
            <li key={factor.fr} className="flex items-start gap-2">
              <Icon name="alert" className="mt-[3px] size-[15px] text-orange" />
              <span>{t(factor)}</span>
            </li>
          ))}
        </ul>
      </DetailSection>

      {file.attachments > 0 ? (
        <DetailSection title={t({ fr: "Pièces jointes protégées", en: "Protected attachments" })}>
          <div className="flex items-center gap-3 rounded-[9px] border border-line px-3 py-2.5">
            <Icon name="lock" className="text-blue" />
            <div className="flex-1">
              <b className="block text-[13.5px]">
                {file.attachments}{" "}
                {t(
                  file.attachments > 1
                    ? { fr: "fichiers", en: "files" }
                    : { fr: "fichier", en: "file" },
                )}
              </b>
              <span className="text-xs font-semibold text-teal">
                {t({
                  fr: "Accès réservé · chaque ouverture est enregistrée",
                  en: "Restricted access · every opening is recorded",
                })}
              </span>
            </div>
            <ActionButton size="sm" onClick={openAttachments}>
              {t({ fr: "Ouvrir", en: "Open" })}
            </ActionButton>
          </div>
        </DetailSection>
      ) : null}

      <DetailSection title={t({ fr: "Informations", en: "Details" })}>
        <KeyValueList
          entries={[
            { key: t({ fr: "Reçu par", en: "Received by" }), value: t(INTAKE_CHANNELS[file.channel]) },
            {
              key: t({ fr: "Heure", en: "Time" }),
              value: <span className="tabular">{file.receivedAt}</span>,
            },
            {
              key: t({ fr: "Déclarant", en: "Reporter" }),
              value:
                file.channel === "web_anon"
                  ? t({ fr: "Anonyme", en: "Anonymous" })
                  : file.channel === "web_third"
                    ? t({ fr: "Une autre personne (voisin)", en: "Someone else (neighbour)" })
                    : t({
                        fr: "Identifié · coordonnées protégées",
                        en: "Identified · contact details protected",
                      }),
            },
          ]}
        />
      </DetailSection>

      <DetailSection title={t({ fr: "Historique", en: "History" })} last>
        <ul className="flex list-none flex-col gap-[7px] p-0 text-[13.5px]">
          {[...file.history].reverse().map((event, index) => (
            <li key={`${event.time}-${index}`} className="grid grid-cols-[44px_minmax(0,1fr)] gap-2.5">
              <time className="tabular text-[12.5px] text-muted-ink">{event.time}</time>
              <span>{t(event.label)}</span>
            </li>
          ))}
        </ul>
      </DetailSection>

      <DetailActions>
        <ActionButton variant={file.stage === 5 ? "primary" : "blue"} onClick={advance}>
          {t(CASE_ACTIONS[file.stage])}
        </ActionButton>
        <ActionButton onClick={requestMoreInformation}>
          {t({ fr: "Demander un complément", en: "Ask for more information" })}
        </ActionButton>
        <ActionButton variant="ghost" onClick={assign}>
          {t({ fr: "Confier à un collègue", en: "Assign to a colleague" })}
        </ActionButton>
      </DetailActions>
    </Panel>
  );
}
