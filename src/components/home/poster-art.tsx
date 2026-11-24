import type { Contest } from "@/lib/content";

/** Simple, bold motif per contest, drawn like a school-notice poster. */
export function PosterArt({ shape, ink }: Pick<Contest["poster"], "shape" | "ink">) {
  const common = { fill: "none", stroke: ink, strokeWidth: 5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (shape) {
    case "sun":
      return (
        <svg viewBox="0 0 120 80" aria-hidden className="h-full w-full">
          <circle cx="60" cy="44" r="16" {...common} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="60" y1="20" x2="60" y2="12" {...common} transform={`rotate(${a} 60 44)`} />
          ))}
          <path d="M8 76 Q34 60 60 72 T112 70" {...common} />
        </svg>
      );
    case "mic":
      return (
        <svg viewBox="0 0 120 80" aria-hidden className="h-full w-full">
          <rect x="48" y="10" width="24" height="38" rx="12" {...common} />
          <path d="M38 38 Q38 60 60 60 Q82 60 82 38 M60 60 V72 M46 72 H74" {...common} />
          <path d="M18 30 Q12 40 18 50 M100 30 Q106 40 100 50" {...common} />
        </svg>
      );
    case "atom":
      return (
        <svg viewBox="0 0 120 80" aria-hidden className="h-full w-full">
          <ellipse cx="60" cy="40" rx="40" ry="13" {...common} />
          <ellipse cx="60" cy="40" rx="40" ry="13" {...common} transform="rotate(60 60 40)" />
          <ellipse cx="60" cy="40" rx="40" ry="13" {...common} transform="rotate(-60 60 40)" />
          <circle cx="60" cy="40" r="4" fill={ink} />
        </svg>
      );
    case "pen":
      return (
        <svg viewBox="0 0 120 80" aria-hidden className="h-full w-full">
          <path d="M30 66 L78 18 L90 30 L42 78 L26 80 Z" {...common} />
          <path d="M70 26 L82 38" {...common} />
          <path d="M14 60 Q22 52 30 58" {...common} />
        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 120 80" aria-hidden className="h-full w-full">
          <path d="M10 62 L36 40 L56 52 L84 22 L110 30" {...common} />
          <path d="M98 18 L110 30 L96 38" {...common} />
          <circle cx="36" cy="40" r="3" fill={ink} />
          <circle cx="56" cy="52" r="3" fill={ink} />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 120 80" aria-hidden className="h-full w-full">
          <path d="M30 70 Q30 20 90 12 Q88 66 30 70 Z" {...common} />
          <path d="M30 70 Q56 46 78 26" {...common} />
          <path d="M96 56 q6 -6 12 0 q-6 6 -12 0" {...common} />
        </svg>
      );
    case "ball":
      return (
        <svg viewBox="0 0 120 80" aria-hidden className="h-full w-full">
          <path d="M44 72 H76 M48 72 Q46 58 54 50 Q44 44 50 30 Q60 22 70 30 Q76 44 66 50 Q74 58 72 72" {...common} />
          <circle cx="60" cy="18" r="6" {...common} />
        </svg>
      );
  }
}
