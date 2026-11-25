/**
 * One drawn icon set (24px grid, 2px round stroke) instead of emoji,
 * which render differently on every budget Android font.
 */
import type { Format } from "@/lib/content";

type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const QuizIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7" />
    <path d="M12 17h.01" />
  </svg>
);
export const CameraIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);
export const FilmIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="M16 10l5-3v10l-5-3" />
  </svg>
);
export const MicIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);
export const TeamIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5M15 14.2c3 0 5.5 1.4 5.5 4.3" />
  </svg>
);
export const GalleryIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="9.5" r="1.5" />
    <path d="M21 16l-5-5-8 9" />
  </svg>
);
export const TrophyIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8M9.5 17h5" />
  </svg>
);
export const ScorecardIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h3M8 12h8M8 16h5" />
    <circle cx="16" cy="8" r="1" />
  </svg>
);
export const ClockIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const BookIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7" />
  </svg>
);
export const HeadphonesIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <path d="M4 17v-4a8 8 0 0 1 16 0v4" />
    <rect x="3" y="14" width="4" height="6" rx="1.5" />
    <rect x="17" y="14" width="4" height="6" rx="1.5" />
  </svg>
);
export const PlayIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <path d="M8 5l11 7-11 7z" fill="currentColor" />
  </svg>
);
export const HandshakeIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <path d="M3 11l4-4 4 2 3-2 7 4M3 11l6 6a1.5 1.5 0 0 0 2-2M9 15l2 2a1.5 1.5 0 0 0 2-2l-1-1M13 16a1.5 1.5 0 0 0 2-2l-2-2M21 11l-4 4" />
  </svg>
);
export const LockIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);
export const CheckIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className} strokeWidth={3}>
    <path d="M5 12l4 4 10-10" />
  </svg>
);
export const DocIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h4" />
  </svg>
);

export function FormatIcon({ format, className }: { format: Format; className?: string }) {
  const I = { quiz: QuizIcon, photo: CameraIcon, video: FilmIcon, audio: MicIcon, debate: TeamIcon }[format];
  return <I className={className} />;
}
