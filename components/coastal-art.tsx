type CoastTone = "paper" | "ink" | "mist" | "lagoon";
type CoastVariant = "swell" | "shore" | "tide";

const waves: Record<CoastVariant, string> = {
  swell: "M0 64C180 120 340 5 555 40S880 116 1080 55 1310 26 1440 50V120H0Z",
  shore: "M0 40C260 122 360 92 600 42S1010 14 1180 55 1360 100 1440 72V120H0Z",
  tide: "M0 76C180 28 320 26 530 66S880 110 1100 46 1330 35 1440 55V120H0Z",
};

export function CoastalDivider({ from = "paper", to = "ink", variant = "swell" }: { from?: CoastTone; to?: CoastTone; variant?: CoastVariant }) {
  return <div className={`coastal-divider coast-from-${from} coast-to-${to} coastal-divider-${variant}`} aria-hidden="true">
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false"><path className="coastal-divider-foam" d="M0 32C240 100 420 8 700 34S1150 112 1440 25V120H0Z" /><path className="coastal-divider-fill" d={waves[variant]} /></svg>
  </div>;
}

export function CoastalPhotoEdge({ bottom = false }: { bottom?: boolean }) {
  return <svg className={`coastal-photo-edge ${bottom ? "coastal-photo-edge-bottom" : ""}`} viewBox="0 0 1440 95" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 0H1440V30C1200 90 1080 20 850 55S430 100 220 48 70 48 0 70Z" /></svg>;
}

export function CoastalSketch({ kind, className = "" }: { kind: "gulls" | "shell" | "sun" | "waves"; className?: string }) {
  return <svg className={`coastal-sketch coastal-sketch-${kind} ${className}`} viewBox="0 0 200 160" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {kind === "gulls" && <><path d="M20 58q24-16 43 5 16-29 43-26M107 95q18-12 34 3 9-20 29-22M119 33q13-9 25 2 8-15 22-13" /></>}
    {kind === "shell" && <><path d="M94 134C61 116 20 86 28 55 35 25 64 28 76 31 83 10 112 10 123 30 145 23 170 38 173 61 178 92 134 120 107 134Z" /><path d="M99 130 76 31M101 130l22-100M94 129 42 45M107 129l52-83M92 132 29 68M109 133l63-65M94 134q5-8 13 0l10 13H83Z" /></>}
    {kind === "sun" && <><circle cx="100" cy="75" r="32" />{Array.from({ length: 12 }, (_, i) => <path key={i} d="M100 22V10" transform={`rotate(${i * 30} 100 75)`} />)}<path d="M22 128q26-12 52 0t52 0 52 0M38 143q26-12 52 0t52 0" /></>}
    {kind === "waves" && <>{[0, 1, 2, 3].map(i => <path key={i} d={`M-20 ${35+i*28}Q20 ${5+i*28} 60 ${35+i*28}T140 ${35+i*28} 220 ${35+i*28}`} />)}</>}
  </svg>;
}
