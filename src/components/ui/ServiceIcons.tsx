// Custom 3D-style SVG illustrations for service cards — built from scratch to match
// the lime (#D9FF00) on black brand identity. Each icon uses layered shapes, soft
// gradients, and a drop shadow to read as a small dimensional object rather than a
// flat line icon, while staying crisp and lightweight as inline SVG (no image requests).

function IconShell({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-9 w-9"
    >
      {children}
    </svg>
  );
}

export function BrandIcon() {
  return (
    <IconShell>
      <defs>
        <linearGradient id="brandFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D9FF00" />
          <stop offset="100%" stopColor="#A8C700" />
        </linearGradient>
        <linearGradient id="brandSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C9300" />
          <stop offset="100%" stopColor="#5A6B00" />
        </linearGradient>
      </defs>
      {/* Isometric monogram badge — top face */}
      <path d="M32 6 L54 18 L32 30 L10 18 Z" fill="url(#brandFace)" />
      {/* Right side, gives the badge depth */}
      <path d="M54 18 L54 38 L32 50 L32 30 Z" fill="url(#brandSide)" />
      {/* Left side, darker for shadow */}
      <path d="M10 18 L10 38 L32 50 L32 30 Z" fill="#3D4700" />
      {/* Engraved mark on the top face */}
      <path
        d="M24 17.5 L32 13 L40 17.5 L32 22 Z"
        fill="#050505"
        opacity="0.85"
      />
      <circle cx="32" cy="17.5" r="2.4" fill="#D9FF00" />
    </IconShell>
  );
}

export function ContentIcon() {
  return (
    <IconShell>
      <defs>
        <linearGradient id="contentBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>
      {/* Camera body, isometric block */}
      <rect x="10" y="22" width="34" height="26" rx="4" fill="url(#contentBody)" stroke="#D9FF00" strokeOpacity="0.25" />
      {/* Top accent strip */}
      <rect x="10" y="22" width="34" height="6" rx="3" fill="#D9FF00" opacity="0.15" />
      {/* Lens — layered circles for depth */}
      <circle cx="27" cy="35" r="10" fill="#050505" stroke="#2A2A2A" strokeWidth="1.5" />
      <circle cx="27" cy="35" r="6.5" fill="#111" stroke="#D9FF00" strokeWidth="1.5" />
      <circle cx="27" cy="35" r="3" fill="#D9FF00" />
      {/* Flash / viewfinder block */}
      <rect x="36" y="14" width="12" height="9" rx="2" fill="url(#contentBody)" />
      {/* Play triangle, signals video content specifically */}
      <path d="M48 31 L58 37 L48 43 Z" fill="#D9FF00" />
    </IconShell>
  );
}

export function EcommerceIcon() {
  return (
    <IconShell>
      <defs>
        <linearGradient id="bagFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9FF00" />
          <stop offset="100%" stopColor="#8FAE00" />
        </linearGradient>
      </defs>
      {/* Shopping bag — isometric 3D block */}
      <path d="M16 24 L48 24 L45 52 L19 52 Z" fill="url(#bagFront)" />
      <path d="M48 24 L54 28 L50 54 L45 52 Z" fill="#5A6B00" />
      <path d="M16 24 L10 28 L14 54 L19 52 Z" fill="#3D4700" />
      {/* Handle */}
      <path
        d="M24 24 C24 16 40 16 40 24"
        stroke="#050505"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Price tag accent */}
      <rect x="26" y="34" width="12" height="8" rx="1.5" fill="#050505" opacity="0.8" />
      <circle cx="29" cy="38" r="1.4" fill="#D9FF00" />
    </IconShell>
  );
}

export function MarketingIcon() {
  return (
    <IconShell>
      <defs>
        <linearGradient id="growthBar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9FF00" />
          <stop offset="100%" stopColor="#7C9300" />
        </linearGradient>
      </defs>
      {/* Base platform, isometric */}
      <path d="M8 46 L32 36 L56 46 L32 56 Z" fill="#161616" stroke="#2A2A2A" />
      {/* Ascending bars — 3D blocks of increasing height */}
      <g>
        <path d="M18 44 L24 41.5 L24 30 L18 32.5 Z" fill="url(#growthBar)" />
        <path d="M24 41.5 L29 39.5 L29 30 L24 30 Z" fill="#7C9300" opacity="0.7" />

        <path d="M28 41.5 L34 39 L34 22 L28 24.5 Z" fill="url(#growthBar)" />
        <path d="M34 39 L39 37 L39 22 L34 22 Z" fill="#7C9300" opacity="0.7" />

        <path d="M38 39 L44 36.5 L44 14 L38 16.5 Z" fill="url(#growthBar)" />
        <path d="M44 36.5 L48 34.5 L48 14 L44 14 Z" fill="#7C9300" opacity="0.7" />
      </g>
      {/* Arrow accent showing upward trajectory */}
      <path
        d="M16 28 L30 20 L44 10"
        stroke="#D9FF00"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <path d="M38 10 L44 10 L44 16" stroke="#D9FF00" strokeWidth="2" strokeLinecap="round" fill="none" />
    </IconShell>
  );
}

export function SocialIcon() {
  return (
    <IconShell>
      <defs>
        <linearGradient id="phoneBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>
      {/* Phone, isometric block */}
      <rect x="20" y="6" width="24" height="52" rx="5" fill="url(#phoneBody)" stroke="#D9FF00" strokeOpacity="0.25" />
      <rect x="23" y="11" width="18" height="36" rx="1.5" fill="#050505" />
      {/* App grid inside screen */}
      <rect x="25.5" y="13.5" width="6" height="6" rx="1.5" fill="#D9FF00" />
      <rect x="32.5" y="13.5" width="6" height="6" rx="1.5" fill="#3A3A3A" />
      <rect x="25.5" y="20.5" width="6" height="6" rx="1.5" fill="#3A3A3A" />
      <rect x="32.5" y="20.5" width="6" height="6" rx="1.5" fill="#7C9300" />
      <circle cx="32" cy="53" r="2" fill="#2A2A2A" />
      {/* Floating reaction bubbles, evokes engagement/social */}
      <circle cx="50" cy="16" r="7" fill="#D9FF00" />
      <path d="M47.5 16 L49.3 17.8 L52.8 14.2" stroke="#050505" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="40" r="5.5" fill="#161616" stroke="#D9FF00" strokeOpacity="0.4" />
      <path d="M9.5 40 L14.5 40 M12 37.5 L12 42.5" stroke="#D9FF00" strokeWidth="1.4" strokeLinecap="round" />
    </IconShell>
  );
}

export function ConsultationIcon() {
  return (
    <IconShell>
      <defs>
        <linearGradient id="pieceLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5F5F5" />
          <stop offset="100%" stopColor="#C2C2C2" />
        </linearGradient>
      </defs>
      {/* Chessboard-style base, evokes strategy */}
      <path d="M6 50 L32 40 L58 50 L32 60 Z" fill="#161616" stroke="#2A2A2A" />
      {/* King piece — primary strategic figure */}
      <path d="M30 14 L34 14 L34 19 L38 19 L38 23 L34 23 L34 28 L30 28 L30 23 L26 23 L26 19 L30 19 Z" fill="#D9FF00" />
      <path d="M24 44 L40 44 L37 30 L27 30 Z" fill="url(#pieceLight)" />
      <ellipse cx="32" cy="44" rx="9" ry="2.4" fill="#E0E0E0" />
      {/* Pawn piece, secondary — supporting strategy */}
      <circle cx="48" cy="30" r="4" fill="#3A3A3A" />
      <path d="M43.5 42 L52.5 42 L50.5 32 L45.5 32 Z" fill="#2A2A2A" />
      <ellipse cx="48" cy="42" rx="5" ry="1.6" fill="#3A3A3A" />
    </IconShell>
  );
}
