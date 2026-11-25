/**
 * Illustrations for "How it works". Each shows the real moment of the step,
 * so people recognise what they'll do. Swap for real photos when available
 * (same 4:3 frame).
 */

const INK = "#1E1E2E";
const INDIGO = "#6563F1";
const HONEY = "#FFC329";
const WHITE = "#FFFFFF";
const font = { fontFamily: "var(--font-anek), sans-serif", fontWeight: 700 };

/** Step 1: a phone showing a contest, a parent and child joining together. */
export function JoinArt({ cta }: { cta: string }) {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      {/* phone */}
      <g transform="rotate(-6 120 130)">
        <rect x="62" y="28" width="116" height="200" rx="18" fill={INK} />
        <rect x="70" y="40" width="100" height="176" rx="11" fill={WHITE} />
        {/* contest poster on screen */}
        <rect x="78" y="50" width="84" height="58" rx="8" fill={HONEY} />
        <circle cx="120" cy="78" r="10" fill="none" stroke={INK} strokeWidth="3.5" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line key={a} x1="120" y1="61" x2="120" y2="57" stroke={INK} strokeWidth="3.5" strokeLinecap="round" transform={`rotate(${a} 120 78)`} />
        ))}
        <rect x="78" y="116" width="70" height="7" rx="3.5" fill="#D9D8EA" />
        <rect x="78" y="129" width="50" height="7" rx="3.5" fill="#D9D8EA" />
        <rect x="78" y="146" width="32" height="14" rx="7" fill="#FFF4D6" />
        {/* join button with a finger tap */}
        <rect x="78" y="176" width="84" height="26" rx="13" fill={INDIGO} />
        <text x="120" y="193.5" textAnchor="middle" fontSize="12" fill={WHITE} style={font}>
          {cta}
        </text>
        <circle cx="146" cy="194" r="13" fill={INDIGO} opacity="0.25" />
      </g>
      {/* parent */}
      <circle cx="226" cy="82" r="20" fill="#B9825A" />
      <path d="M208 74 Q226 52 246 74 Q240 62 226 62 Q212 62 208 74Z" fill={INK} />
      <path d="M196 218 V140 Q196 112 226 112 Q256 112 256 140 V218Z" fill={INDIGO} />
      {/* child */}
      <circle cx="284" cy="140" r="15" fill="#C99470" />
      <path d="M270 136 Q284 116 298 136 Q296 126 284 125 Q272 126 270 136Z" fill={INK} />
      <path d="M266 218 V180 Q266 160 284 160 Q302 160 302 180 V218Z" fill={HONEY} />
      {/* holding hands */}
      <path d="M254 170 Q262 184 270 180" stroke="#B9825A" strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* check badge */}
      <circle cx="196" cy="56" r="16" fill="#1F8A5B" />
      <path d="M188 56 l6 6 l10 -11" stroke={WHITE} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Step 2: a phone camera framing a child's drawing, ready to upload. */
export function SubmitArt({ done }: { done: string }) {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      {/* the drawing on the table */}
      <g transform="rotate(5 96 118)">
        <rect x="26" y="52" width="140" height="112" rx="4" fill={WHITE} stroke="#E3E2F0" strokeWidth="2" />
        <circle cx="140" cy="76" r="11" fill={HONEY} />
        <path d="M30 140 Q70 124 110 136 T162 132 V160 H30Z" fill="#7CC59A" />
        <path d="M58 136 V112 L76 96 L94 112 V136Z" fill="#C8133F" />
        <rect x="70" y="118" width="10" height="18" fill={INK} />
      </g>
      {/* crayons */}
      <rect x="40" y="186" width="70" height="10" rx="5" fill={INDIGO} transform="rotate(-8 75 191)" />
      <rect x="56" y="204" width="60" height="10" rx="5" fill={HONEY} transform="rotate(4 86 209)" />
      {/* phone with camera view */}
      <g transform="rotate(-4 228 128)">
        <rect x="170" y="30" width="116" height="200" rx="18" fill={INK} />
        <rect x="178" y="42" width="100" height="148" rx="10" fill="#F6F6FB" />
        {/* framed drawing */}
        <rect x="188" y="62" width="80" height="64" rx="3" fill={WHITE} />
        <circle cx="252" cy="76" r="7" fill={HONEY} />
        <path d="M190 112 Q212 102 236 110 T266 108 V124 H190Z" fill="#7CC59A" />
        <path d="M204 112 V98 L215 88 L226 98 V112Z" fill="#C8133F" />
        {/* viewfinder corners */}
        {[
          "M184 66 V56 H194",
          "M262 56 H272 V66",
          "M184 122 V132 H194",
          "M262 132 H272 V122",
        ].map((d) => (
          <path key={d} d={d} stroke={HONEY} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        ))}
        {/* upload done chip */}
        <rect x="184" y="146" width="88" height="24" rx="12" fill="#1F8A5B" />
        <text x="228" y="162.5" textAnchor="middle" fontSize="11.5" fill={WHITE} style={font}>
          ✓ {done}
        </text>
        {/* shutter */}
        <circle cx="228" cy="208" r="12" fill={WHITE} />
        <circle cx="228" cy="208" r="16" fill="none" stroke={WHITE} strokeWidth="2.5" opacity="0.5" />
      </g>
      {/* flash sparkle */}
      <path d="M292 46 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4z" fill={HONEY} />
    </svg>
  );
}

/** Step 3: a certificate with the child's name and a medal. */
export function CertificateArt({ name, title }: { name: string; title: string }) {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" aria-hidden>
      {/* confetti */}
      {[
        [34, 40, INDIGO],
        [62, 22, "#C8133F"],
        [282, 30, INDIGO],
        [300, 70, "#1F8A5B"],
        [24, 196, "#1F8A5B"],
        [292, 206, "#C8133F"],
      ].map(([x, y, c], n) => (
        <rect key={n} x={x as number} y={y as number} width="10" height="5" rx="2.5" fill={c as string} transform={`rotate(${n * 35} ${x} ${y})`} />
      ))}
      {/* certificate */}
      <g transform="rotate(-3 160 118)">
        <rect x="40" y="44" width="240" height="156" rx="6" fill={WHITE} />
        <rect x="50" y="54" width="220" height="136" rx="3" fill="none" stroke={HONEY} strokeWidth="3" />
        <text x="160" y="86" textAnchor="middle" fontSize="15" fill={INDIGO} style={font}>
          {title}
        </text>
        <rect x="104" y="96" width="112" height="5" rx="2.5" fill="#E3E2F0" />
        <text x="160" y="132" textAnchor="middle" fontSize="24" fill={INK} style={font}>
          {name}
        </text>
        <path d="M96 140 H224" stroke={INK} strokeWidth="1.5" opacity="0.3" />
        <rect x="88" y="152" width="144" height="5" rx="2.5" fill="#E3E2F0" />
        <path d="M76 176 q8 -10 16 0 q8 10 16 -2" stroke={INK} strokeWidth="2" fill="none" opacity="0.6" />
      </g>
      {/* medal */}
      <path d="M232 150 L218 206 L232 198 L242 212 L250 160Z" fill={INDIGO} />
      <path d="M262 150 L278 204 L264 197 L255 212 L246 160Z" fill="#4846D2" />
      <circle cx="248" cy="150" r="26" fill={HONEY} stroke="#E0A800" strokeWidth="3" />
      <path d="M248 136 l4.5 9.5 l10.5 1.3 l-7.7 7.2 l2 10.3 l-9.3 -5.1 l-9.3 5.1 l2 -10.3 l-7.7 -7.2 l10.5 -1.3z" fill={WHITE} />
    </svg>
  );
}
