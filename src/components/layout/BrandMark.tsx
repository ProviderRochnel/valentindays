/** Armoiries simplifiées du service : un bouclier abritant une onde d'écoute. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <path
        d="M16 3l10 4v7.5c0 6.5-4.3 11.6-10 14.5C10.3 26.1 6 21 6 14.5V7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 16a5.5 5.5 0 0 1 11 0"
        fill="none"
        stroke="hsl(var(--teal-light))"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13.3 16a2.7 2.7 0 0 1 5.4 0"
        fill="none"
        stroke="hsl(var(--teal-light))"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="19.5" r="1.8" fill="hsl(var(--teal-light))" />
    </svg>
  );
}
