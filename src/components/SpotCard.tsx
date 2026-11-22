import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, MapPin, Pencil } from 'lucide-react';
import type { StreetFoodSpot } from '../data/streetFoodData';
import { DishStamp } from './DishStamp';

interface SpotCardProps {
  spot: StreetFoodSpot;
  isSelected: boolean;
  isSaved: boolean;
  onPinOnMap: (id: number) => void;
  onToggleSaved: (id: number) => void;
  onEdit: (id: number) => void;
}

export function SpotCard({
  spot,
  isSelected,
  isSaved,
  onPinOnMap,
  onToggleSaved,
  onEdit,
}: SpotCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasPhoto = Boolean(spot.imageUrl) && !imageError;

  return (
    <motion.article
      id={`spot-${spot.id}`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative border-2 border-neutral-950 bg-white transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#0A0A0A] ${
        isSelected
          ? 'shadow-[8px_8px_0px_#E8FF00] ring-2 ring-[#E8FF00]'
          : 'shadow-[4px_4px_0px_#0A0A0A]'
      }`}
    >
      <div
        className={`grid grid-cols-1 ${
          hasPhoto ? 'lg:grid-cols-12 items-stretch' : ''
        }`}
      >
        {/* Main Editorial Content */}
        <div
          className={`p-5 sm:p-7 flex flex-col justify-between ${
            hasPhoto ? 'lg:col-span-7' : ''
          }`}
        >
          <div>
            {/* Top Row: Giant Number + Unboxed Metadata + Dish Stamp */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-neutral-950 text-white group-hover:bg-[#E8FF00] group-hover:text-neutral-950 border-2 border-neutral-950 font-mono text-2xl sm:text-3xl font-bold tabular-nums shrink-0 transition-colors duration-150">
                  {String(spot.id).padStart(2, '0')}
                </span>

                <div>
                  {/* Clean Unboxed Metadata — Zero Pills */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm font-medium text-neutral-600">
                    <span className="font-bold text-neutral-950">
                      {spot.neighborhood}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{spot.vibe}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums text-neutral-950">
                      {spot.priceRange}
                    </span>
                  </div>

                  <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 leading-tight">
                    {spot.name}
                  </h3>
                </div>
              </div>

              {!hasPhoto && (
                <div className="hidden sm:flex items-center justify-center w-14 h-14 border-2 border-neutral-950 bg-neutral-50 text-neutral-950 group-hover:bg-[#E8FF00] group-hover:rotate-6 transition-transform duration-150 shrink-0">
                  <DishStamp type={spot.stamp} className="w-9 h-9" />
                </div>
              )}
            </div>

            {/* Address & Opening Hours */}
            <p className="mt-3 text-sm text-neutral-600">
              {spot.address}
              <span className="mx-2 text-neutral-400" aria-hidden="true">
                /
              </span>
              <span className="font-mono text-xs text-neutral-800 tabular-nums">
                {spot.hours}
              </span>
            </p>

            {/* What to Order Highlight Block (No border-l-4; crisp solid frame) */}
            <div className="mt-5 p-4 sm:p-5 bg-[#E8FF00] border-2 border-neutral-950 text-neutral-950 transition-transform duration-150 group-hover:translate-x-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-xs font-mono font-bold tracking-wide text-neutral-950">
                  What to order
                </span>
                <span className="text-xs font-medium text-neutral-800">
                  Pair with: {spot.pairWith}
                </span>
              </div>
              <p className="mt-1.5 text-lg sm:text-xl font-extrabold tracking-tight leading-snug text-neutral-950">
                {spot.whatToOrder}
              </p>
            </div>

            {/* Story & Local Pro Tip */}
            <p className="mt-4 text-base leading-relaxed text-neutral-800 max-w-2xl">
              {spot.story}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-neutral-600 max-w-2xl">
              <span className="font-bold text-neutral-950">Local tip: </span>
              {spot.proTip}
            </p>
          </div>

          {/* Interactive Actions Row (All >= 44px touch targets) */}
          <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onToggleSaved(spot.id)}
              aria-pressed={isSaved}
              className={`min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold border-2 border-neutral-950 cursor-pointer whitespace-nowrap transition-all duration-150 ${
                isSaved
                  ? 'bg-[#FF3B1F] text-white shadow-[3px_3px_0px_#0A0A0A]'
                  : 'bg-neutral-950 text-white hover:bg-[#E8FF00] hover:text-neutral-950'
              }`}
            >
              <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{isSaved ? 'Saved to Crawl' : 'Add to Crawl'}</span>
            </button>

            <button
              type="button"
              onClick={() => onPinOnMap(spot.id)}
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold bg-white text-neutral-950 border-2 border-neutral-950 hover:bg-neutral-100 cursor-pointer whitespace-nowrap transition-colors"
            >
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Show on Map</span>
            </button>

            <button
              type="button"
              onClick={() => onEdit(spot.id)}
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 border border-neutral-300 cursor-pointer whitespace-nowrap ml-auto transition-colors"
              aria-label={`Edit text for ${spot.name}`}
            >
              <Pencil className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Optional High-Contrast Monochrome Editorial Photo Spotlight */}
        {spot.imageUrl && (
          <div className="lg:col-span-5 border-t-2 lg:border-t-0 lg:border-l-2 border-neutral-950 bg-neutral-950 overflow-hidden relative min-h-[230px] sm:min-h-[280px] lg:min-h-full">
            {hasPhoto ? (
              <>
                <img
                  src={spot.imageUrl}
                  alt={spot.imageAlt ?? `${spot.name} signature street food dish`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover grayscale contrast-115 transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4">
                  <p className="font-mono text-xs text-white/90">
                    Stop {String(spot.id).padStart(2, '0')} · {spot.neighborhood}
                  </p>
                </div>
              </>
            ) : (
              <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center gap-3 p-6 bg-neutral-950 text-white">
                <DishStamp type={spot.stamp} className="w-14 h-14 text-[#E8FF00]" />
                <span className="font-mono text-xs text-neutral-300">
                  {spot.name}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
