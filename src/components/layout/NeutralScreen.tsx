interface NeutralScreenProps {
  onReturn: () => void;
}

/**
 * Page de substitution affichée par la sortie rapide. Son contenu est
 * volontairement banal : rien n'y évoque le Ministère ni les violences.
 */
export function NeutralScreen({ onReturn }: NeutralScreenProps) {
  return (
    <div className="fixed inset-0 z-[300] overflow-auto bg-[#F7F7F4] px-6 py-10 font-serif text-[#222]">
      <div className="mx-auto max-w-[640px]">
        <p className="m-0 text-[13px] text-[#777]">Météo · Cameroun</p>
        <h1 className="text-[30px] text-[#222]">Yaoundé : averses éparses cet après-midi</h1>
        <p className="mt-3 text-[17px] leading-[1.6]">
          Températures comprises entre 21 et 27 °C. Le ciel restera nuageux en soirée avec un risque
          d’orage modéré. Les prévisions pour le week-end annoncent un temps plus sec.
        </p>
        <p className="mt-3 text-[17px] leading-[1.6]">
          Pensez à vous munir d’un parapluie pour vos déplacements de fin de journée.
        </p>
        <button
          type="button"
          onClick={onReturn}
          aria-label="Revenir"
          className="mt-10 border-0 bg-transparent p-0 font-sans text-xs text-[#999]"
        >
          ·
        </button>
      </div>
    </div>
  );
}
