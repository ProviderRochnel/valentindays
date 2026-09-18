import { useRef } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { Field } from "@/components/common/Field";
import { Icon } from "@/components/common/Icon";
import { Notice } from "@/components/common/Notice";
import { SERVICE_CONFIG } from "@/domain/config";
import { useI18n } from "@/i18n/useI18n";
import type { AttachmentDraft } from "@/hooks/useReportForm";

const BYTES_PER_MEGABYTE = 1_048_576;

interface AttachmentsStepProps {
  attachments: readonly AttachmentDraft[];
  onAdd: (files: FileList) => void;
  onRemove: (id: string) => void;
}

export function AttachmentsStep({ attachments, onAdd, onRemove }: AttachmentsStepProps) {
  const { t, locale, formatDecimal } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-4">
      <Field
        label={t({ fr: "Pièces jointes", en: "Attachments" })}
        optional={t({ fr: "(facultatif)", en: "(optional)" })}
      >
        <label
          htmlFor="report-files"
          className="block cursor-pointer rounded-[10px] border-[1.5px] border-dashed border-line-2 bg-zebra p-[22px] text-center text-sm text-muted-ink hover:border-teal hover:text-teal-ink"
        >
          <Icon name="upload" className="mx-auto mb-1.5 block size-[26px] text-teal" />
          {t({
            fr: "Ajoutez une photo, un message vocal, une vidéo ou un document",
            en: "Add a photo, a voice message, a video or a document",
          })}
          <br />
          <span className="text-[13px]">
            {t({
              fr: `${SERVICE_CONFIG.maxAttachmentMegabytes} Mo maximum par fichier`,
              en: `Up to ${SERVICE_CONFIG.maxAttachmentMegabytes} MB per file`,
            })}
          </span>
        </label>
        <input
          ref={inputRef}
          id="report-files"
          type="file"
          multiple
          hidden
          accept="image/*,audio/*,video/*,.pdf"
          onChange={(event) => {
            if (event.target.files?.length) onAdd(event.target.files);
            event.target.value = "";
          }}
        />
      </Field>

      {attachments.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {attachments.map((file) => (
            <li
              key={file.id}
              className="flex items-center gap-2.5 rounded-[9px] border border-line px-3 py-2.5 text-[13.5px]"
            >
              <Icon name="doc" className="text-blue" />
              <span className="min-w-0 flex-1">
                <b className="[overflow-wrap:anywhere]">{file.name}</b>{" "}
                <span className="text-[13px] text-muted-ink">
                  {formatDecimal(file.size / BYTES_PER_MEGABYTE)} {locale === "en" ? "MB" : "Mo"}
                </span>
                {file.isImage ? (
                  <span className="block text-xs font-semibold text-teal">
                    {t({
                      fr: "Position retirée de la photo",
                      en: "Location removed from the photo",
                    })}
                  </span>
                ) : null}
              </span>
              <ActionButton variant="ghost" size="sm" onClick={() => onRemove(file.id)}>
                {t({ fr: "Retirer", en: "Remove" })}
              </ActionButton>
            </li>
          ))}
        </ul>
      ) : null}

      <Notice
        icon="lock"
        tone="navy"
        title={t({ fr: "Vos fichiers sont protégés", en: "Your files are protected" })}
      >
        {t({
          fr: "Seuls les agents habilités peuvent les ouvrir. La position enregistrée dans vos photos est retirée automatiquement.",
          en: "Only authorised officers can open them. The location recorded in your photos is removed automatically.",
        })}
      </Notice>
    </div>
  );
}
