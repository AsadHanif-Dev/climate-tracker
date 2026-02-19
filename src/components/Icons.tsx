'use client';

/**
 * Icon system — stroke-based, 24x24 viewBox, strokeWidth 1.5
 * All icons use fill="none" stroke="currentColor" for monochrome flexibility.
 * Size is controlled via className (default: w-[18px] h-[18px]).
 */

type IconProps = { className?: string };

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true as const,
};

/* Travel */
export const CarIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M5 17H3v-5l2.5-6h11L19 12v5h-2" />
    <circle cx="7.5" cy="17.5" r="1.5" />
    <circle cx="16.5" cy="17.5" r="1.5" />
    <path d="M5 12h14" />
  </svg>
);

export const BusIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <rect x="4" y="3" width="16" height="14" rx="2" />
    <path d="M4 11h16M8 3v8M16 3v8" />
    <circle cx="8" cy="19" r="1.5" />
    <circle cx="16" cy="19" r="1.5" />
    <path d="M8 17.5V17m8 .5V17" />
  </svg>
);

export const PlaneIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M21 12.89l-3.5 2.5-5.5-1.5L3.5 19 2 17.5l6-5L5.5 8 7 7l4 1.5L16.5 5 21 5.5l.5 4.5-1 2.89z" />
  </svg>
);

/* Energy */
export const LightningIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M13 2L4.5 13.5H11L10 22l8.5-12H13L13 2z" />
  </svg>
);

export const FlameIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M12 2c0 4-4 6-4 10a4 4 0 008 0c0-2-1-3.5-2-5-1 1.5-2 2-2 5" />
    <path d="M12 12c0 1.5-1 2.5-1 4a1 1 0 002 0c0-1.5-1-2.5-1-4z" />
  </svg>
);

/* Food */
export const MeatIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <circle cx="12" cy="12" r="8" />
    <path d="M9 9.5c.5-1 1.5-1.5 3-1.5s2.5.5 3 1.5" />
    <path d="M8 13.5c.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5" />
    <path d="M12 8v8" />
  </svg>
);

export const CheeseIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M3 14h18v5a1 1 0 01-1 1H4a1 1 0 01-1-1v-5z" />
    <path d="M3 14L12 4l9 10" />
    <circle cx="10" cy="15.5" r="1" />
    <circle cx="15" cy="16.5" r="0.75" />
  </svg>
);

export const VegetableIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M12 22V12" />
    <path d="M12 12C12 7 7 4 4 5c1 3 3 6 8 7z" />
    <path d="M12 12c0-5 5-8 8-7-1 3-3 6-8 7z" />
    <path d="M12 17c-3 0-5-2-6-4 1.5-.5 4 0 6 4z" />
  </svg>
);

/* UI / Stats */
export const CalendarIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </svg>
);

export const ChartBarIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M3 20h18" />
    <rect x="5" y="12" width="3" height="8" rx="0.5" />
    <rect x="10.5" y="7" width="3" height="13" rx="0.5" />
    <rect x="16" y="3" width="3" height="17" rx="0.5" />
  </svg>
);

export const TrendingUpIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M3 17l5-5 4 4 9-10" />
    <path d="M14 6h7v7" />
  </svg>
);

export const TrendingDownIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M3 7l5 5 4-4 9 10" />
    <path d="M14 18h7v-7" />
  </svg>
);

export const ListIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const GlobeIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.6 9h16.8M3.6 15h16.8" />
    <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9" />
    <path d="M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" />
  </svg>
);

export const LeafIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M20 4C12 4 5 9 5 18c3-3 6-4 8-4 0-5 3-8 7-10z" />
    <path d="M5 18c2-3 5-5 8-4" />
  </svg>
);

export const PlusIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const XIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const SunIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

export const MoonIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

export const TrashIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
    <path d="M10 11v5M14 11v5" />
  </svg>
);

export const InfoIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8h.01M12 11v5" />
  </svg>
);

export const ChevronDownIcon = ({ className = 'w-[18px] h-[18px]' }: IconProps) => (
  <svg className={className} {...base}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
