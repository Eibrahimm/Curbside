import type { DishIconType } from '../data/streetFoodData';

interface DishStampProps {
  type: DishIconType;
  className?: string;
}

/**
 * Bold monochrome editorial line-art stamps for typographic cards
 * and resilient image fallbacks.
 */
export function DishStamp({ type, className = 'w-10 h-10' }: DishStampProps) {
  switch (type) {
    case 'taco':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path
            d="M6 31C6 19.5 14 11 24 11C34 11 42 19.5 42 31C42 34 39.5 36 36.5 36H11.5C8.5 36 6 34 6 31Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M12 29C16 25 20 27 24 23C28 27 32 25 36 29" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="18" cy="21" r="1.8" fill="currentColor" />
          <circle cx="25" cy="18" r="1.8" fill="currentColor" />
          <circle cx="31" cy="21" r="1.8" fill="currentColor" />
        </svg>
      );
    case 'tostada':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <ellipse cx="24" cy="33" rx="18" ry="5" stroke="currentColor" strokeWidth="2.5" />
          <path d="M12 31C14 23 19 18 24 18C29 18 34 23 36 31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M19 18L24 10L29 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="26" r="1.8" fill="currentColor" />
          <circle cx="28" cy="26" r="1.8" fill="currentColor" />
        </svg>
      );
    case 'tamale':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="11" y="15" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="2.5" />
          <path d="M11 20L5 17V31L11 28" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M37 20L43 17V31L37 28" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M24 15V33" stroke="currentColor" strokeWidth="2.2" />
          <path d="M19 11L24 15L29 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'elote':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path d="M16 36L11 41" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <rect
            x="19"
            y="10"
            width="14"
            height="27"
            rx="7"
            transform="rotate(35 26 23)"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <path d="M22 18L30 24M18 24L26 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'churro':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path d="M12 36L28 10" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M20 38L36 12" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M28 38L40 19" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="14" cy="14" r="1.6" fill="currentColor" />
          <circle cx="38" cy="34" r="1.6" fill="currentColor" />
        </svg>
      );
    case 'quesadilla':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path
            d="M8 34C8 20 15.5 12 24 12C32.5 12 40 20 40 34H8Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M14 28H34" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
          <path d="M18 22H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'torta':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path d="M8 23C8 15 15 11 24 11C33 11 40 15 40 23H8Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M7 28C11 25.5 15 30.5 19 28C23 25.5 27 30.5 31 28C35 25.5 38 29 41 28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M9 32H39V34C39 36.2 37.2 38 35 38H13C10.8 38 9 36.2 9 34V32Z" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    case 'birria':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path d="M9 24H39C39 32.5 32.5 38 24 38C15.5 38 9 32.5 9 24Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M17 18C17 15 19 14 19 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M24 18C24 15 26 14 26 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M31 18C31 15 33 14 33 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
  }
}
