export default function HeroIllustration({ className = '' }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 600 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
        aria-label="Illustration of three students chatting while one searches for a hostel on a laptop"
      >
        {/* ground shadow */}
        <ellipse cx="300" cy="408" rx="220" ry="14" fill="#140f1f" opacity="0.1" />

        {/* bench */}
        <rect x="70" y="330" width="220" height="14" rx="7" fill="#261c42" />
        <rect x="90" y="344" width="14" height="28" rx="4" fill="#1c1530" />
        <rect x="246" y="344" width="14" height="28" rx="4" fill="#1c1530" />

        {/* potted plant, right */}
        <g>
          <rect x="520" y="300" width="40" height="34" rx="6" fill="#463a63" />
          <path
            d="M540 300c-6-18-26-24-38-18 2 16 20 26 38 18z"
            fill="#2dd4bf"
          />
          <path
            d="M540 300c10-14 30-16 40-6-4 14-24 20-40 6z"
            fill="#14b8a6"
          />
          <path d="M540 300c-2-20 6-36 6-36s10 14 6 34" fill="#9d5cf5" />
        </g>

        {/* seated student with laptop */}
        <g>
          <path d="M120 300c8 16 40 26 62 20 20-6 34-22 30-38-24 8-62 6-92 18z" fill="#261c42" />
          <path
            d="M122 206c-12 20-16 50-6 78 14 8 80 8 92-2 8-26 2-56-10-78-26-12-54-12-76 2z"
            fill="#9d5cf5"
          />
          <rect x="154" y="254" width="48" height="26" rx="9" fill="#ffffff" fillOpacity="0.14" />
          <path d="M128 240c-6 12-8 28-2 40 8 6 18 6 24-2 2-12-2-28-8-38z" fill="#7c3aed" />
          <path d="M212 240c6 12 8 28 2 40-8 6-18 6-24-2-2-12 2-28 8-38z" fill="#7c3aed" />
          <circle cx="138" cy="282" r="9" fill="#f3c9a1" />
          <circle cx="204" cy="282" r="9" fill="#f3c9a1" />
          <rect x="158" y="182" width="22" height="24" rx="9" fill="#f3c9a1" />
          <circle cx="170" cy="160" r="34" fill="#f3c9a1" />
          <path
            d="M137 156c-4-26 18-48 44-45 23 3 37 22 34 45-2-9-11-14-20-13-5-9-16-14-27-13-13 2-20 13-18 24-7-2-12 1-13 2z"
            fill="#1c1530"
          />
          <circle cx="160" cy="160" r="2.8" fill="#261c42" />
          <circle cx="180" cy="160" r="2.8" fill="#261c42" />
          <path d="M161 172c5 4 12 4 17 0" stroke="#261c42" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <rect x="124" y="276" width="86" height="9" rx="4" fill="#b4abc7" />
          <g transform="translate(124 240) rotate(-4)">
            <rect x="0" y="0" width="80" height="54" rx="6" fill="#f7f5fb" />
            <rect x="5" y="5" width="70" height="44" rx="3" fill="#1c1530" />
            <rect x="12" y="14" width="30" height="5" rx="2.5" fill="#9d5cf5" />
            <rect x="12" y="24" width="48" height="4" rx="2" fill="#463a63" />
            <rect x="12" y="32" width="38" height="4" rx="2" fill="#463a63" />
          </g>
        </g>

        {/* standing student, center, holding phone */}
        <g>
          <path d="M330 340v-10l-14 10z" fill="#261c42" opacity="0" />
          <rect x="316" y="300" width="20" height="40" rx="9" fill="#1c1530" />
          <rect x="344" y="300" width="20" height="40" rx="9" fill="#1c1530" />
          <path
            d="M304 196c-10 8-14 22-10 60l8 50c16 8 46 8 62 0l6-50c4-38 0-52-10-60-16-10-40-10-56 0z"
            fill="#5b21b6"
          />
          <path d="M296 214c-8 10-12 26-10 44 6 4 14 4 18-2 2-14 0-30-8-42z" fill="#5b21b6" />
          <path
            d="M372 214c8 10 10 26 6 42-6 6-16 6-20-2 0-14 4-28 14-40z"
            fill="#5b21b6"
          />
          <circle cx="292" cy="258" r="9" fill="#f3c9a1" />
          <g transform="translate(362 244) rotate(8)">
            <rect x="0" y="0" width="18" height="30" rx="4" fill="#1c1530" />
            <rect x="2.5" y="3" width="13" height="20" rx="1.5" fill="#9d5cf5" />
          </g>
          <rect x="324" y="176" width="22" height="24" rx="9" fill="#f3c9a1" />
          <circle cx="336" cy="154" r="33" fill="#f3c9a1" />
          <path
            d="M304 150c-4-25 17-46 42-43 22 2 36 21 33 43-2-8-10-13-19-12-5-9-16-13-26-12-13 2-19 12-17 23-6-2-11 0-13 1z"
            fill="#1c1530"
          />
          <circle cx="327" cy="154" r="2.6" fill="#261c42" />
          <circle cx="346" cy="154" r="2.6" fill="#261c42" />
          <path d="M328 166c5 4 11 4 16 0" stroke="#261c42" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* standing student, right, chatting */}
        <g>
          <rect x="418" y="296" width="18" height="40" rx="9" fill="#261c42" />
          <rect x="444" y="296" width="18" height="40" rx="9" fill="#261c42" />
          <path
            d="M412 198c-9 8-13 20-9 54l7 48c15 8 42 8 57 0l6-48c4-34-1-46-10-54-15-9-37-9-51 0z"
            fill="#fbbf24"
          />
          <path d="M404 214c-7 9-10 24-8 40 5 4 13 4 17-2 2-13 0-28-9-38z" fill="#f59e0b" />
          <path d="M470 214c7 9 10 24 8 40-5 4-13 4-17-2-2-13 0-28 9-38z" fill="#f59e0b" />
          <circle cx="400" cy="254" r="8" fill="#f3c9a1" />
          <circle cx="474" cy="254" r="8" fill="#f3c9a1" />
          <rect x="428" y="178" width="20" height="22" rx="8" fill="#f3c9a1" />
          <circle cx="438" cy="158" r="30" fill="#f3c9a1" />
          <path
            d="M411 152c0-21 15-38 35-37 19 1 32 17 29 37-8-10-20-7-25-2-10-9-27-7-32 3-4-1-7 0-7-1z"
            fill="#463a63"
          />
          <circle cx="430" cy="158" r="2.4" fill="#261c42" />
          <circle cx="447" cy="158" r="2.4" fill="#261c42" />
          <path d="M431 169c4 4 10 4 14 0" stroke="#261c42" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* sparkle accents */}
        <g fill="#fbbf24">
          <circle cx="90" cy="150" r="4" />
          <circle cx="500" cy="130" r="5" />
          <circle cx="250" cy="90" r="3.5" />
        </g>
        <g fill="#9d5cf5">
          <circle cx="560" cy="220" r="4" />
          <circle cx="60" cy="260" r="3.5" />
        </g>
      </svg>
    </div>
  )
}
