import { useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Check, Compass, MapPin, Pencil, Route } from 'lucide-react';
import type { StreetFoodSpot, TimeVibe } from '../data/streetFoodData';

export type FilterMode = 'All' | TimeVibe | 'Saved';

interface CityMapProps {
  cityName: string;
  spots: StreetFoodSpot[];
  visibleSpots: StreetFoodSpot[];
  selectedSpotId: number;
  savedIds: number[];
  showRoute: boolean;
  onSelectSpot: (id: number) => void;
  onToggleRoute: () => void;
  onToggleSaved: (id: number) => void;
  onJumpToSpot: (id: number) => void;
  onEditSpot: (id: number) => void;
  filter: FilterMode;
  onFilterChange: (filter: FilterMode) => void;
}

const FILTER_OPTIONS: { value: FilterMode; label: string }[] = [
  { value: 'All', label: 'All 10' },
  { value: 'Morning', label: 'Morning' },
  { value: 'Midday', label: 'Midday' },
  { value: 'Late Night', label: 'Late Night' },
  { value: 'Saved', label: 'My Crawl' },
];

export function CityMap({
  cityName,
  spots,
  visibleSpots,
  selectedSpotId,
  savedIds,
  showRoute,
  onSelectSpot,
  onToggleRoute,
  onToggleSaved,
  onJumpToSpot,
  onEditSpot,
  filter,
  onFilterChange,
}: CityMapProps) {
  const activeSpot =
    spots.find((s) => s.id === selectedSpotId) ?? visibleSpots[0] ?? spots[0];

  const visibleIdSet = useMemo(
    () => new Set(visibleSpots.map((s) => s.id)),
    [visibleSpots]
  );

  // Build SVG polyline path for the walking/eating crawl route
  const routePoints = useMemo(() => {
    const ordered = visibleSpots.length >= 2 ? visibleSpots : spots;
    return ordered.map((s) => `${s.mapX * 8},${s.mapY * 5.6}`).join(' ');
  }, [visibleSpots, spots]);

  const isSaved = activeSpot ? savedIds.includes(activeSpot.id) : false;

  return (
    <div className="space-y-5">
      {/* Filter Controls & Route Toggle Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0"
          role="tablist"
          aria-label="Filter street-food spots by time of day"
        >
          {FILTER_OPTIONS.map((opt) => {
            const isActive = filter === opt.value;
            const count =
              opt.value === 'Saved' ? savedIds.length : undefined;
            return (
              <button
                key={opt.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onFilterChange(opt.value)}
                className={`min-h-[44px] px-4 py-2 text-sm font-semibold border-2 border-neutral-950 whitespace-nowrap shrink-0 cursor-pointer transition-all duration-150 ${
                  isActive
                    ? 'bg-[#E8FF00] text-neutral-950 shadow-[3px_3px_0px_#0A0A0A] -translate-x-0.5 -translate-y-0.5'
                    : 'bg-white text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                {opt.label}
                {count !== undefined && (
                  <span className="ml-1.5 font-mono text-xs tabular-nums">
                    ({count})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onToggleRoute}
          aria-pressed={showRoute}
          className={`min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold border-2 border-neutral-950 whitespace-nowrap shrink-0 cursor-pointer transition-all duration-150 ${
            showRoute
              ? 'bg-neutral-950 text-[#E8FF00] shadow-[3px_3px_0px_#FF3B1F]'
              : 'bg-white text-neutral-950 hover:bg-[#E8FF00]'
          }`}
        >
          <Route className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{showRoute ? 'Hide Crawl Path' : 'Trace Crawl Path'}</span>
        </button>
      </div>

      {/* Balanced 2-Column Map + Active Spot Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Stylized High-Contrast Black & White Interactive Vector City Map */}
        <div className="lg:col-span-7 xl:col-span-8 relative bg-neutral-950 text-white border-2 border-neutral-950 shadow-[8px_8px_0px_#0A0A0A] overflow-hidden flex flex-col">
          {/* Top Map Frame Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/15 bg-neutral-950 text-xs font-mono tracking-tight text-neutral-300">
            <span className="truncate font-semibold text-white">
              {cityName} · Street Grid
            </span>
            <span className="flex items-center gap-2 whitespace-nowrap shrink-0 tabular-nums">
              <Compass className="w-3.5 h-3.5 text-[#E8FF00]" aria-hidden="true" />
              {visibleSpots.length} / {spots.length} pins active
            </span>
          </div>

          {/* Interactive SVG Map Canvas */}
          <div className="relative flex-1 min-h-[340px] sm:min-h-[440px] lg:min-h-[500px] map-grid-bg select-none">
            <svg
              viewBox="0 0 800 560"
              className="w-full h-full block"
              role="img"
              aria-label={`Interactive street-food map of ${cityName} with 10 numbered pins`}
            >
              {/* Urban District Blocks (Subtle Monochrome Geometry) */}
              <g stroke="rgba(255,255,255,0.09)" strokeWidth="1" fill="none">
                <line x1="0" y1="90" x2="800" y2="90" />
                <line x1="0" y1="185" x2="800" y2="185" />
                <line x1="0" y1="280" x2="800" y2="280" />
                <line x1="0" y1="375" x2="800" y2="375" />
                <line x1="0" y1="470" x2="800" y2="470" />
                <line x1="120" y1="0" x2="120" y2="560" />
                <line x1="250" y1="0" x2="250" y2="560" />
                <line x1="380" y1="0" x2="380" y2="560" />
                <line x1="510" y1="0" x2="510" y2="560" />
                <line x1="640" y1="0" x2="640" y2="560" />
              </g>

              {/* Major Boulevards & Avenues */}
              <g stroke="rgba(255,255,255,0.24)" fill="none" strokeLinecap="round">
                {/* Diagonal Reforma-style Grand Avenue */}
                <path d="M 40 320 L 340 195 L 580 120 L 770 40" strokeWidth="5" />
                {/* Insurgentes North-South Spine */}
                <path d="M 445 15 L 405 245 L 365 415 L 345 545" strokeWidth="4.5" />
                {/* East-West Cross Crosstown Arterial */}
                <path d="M 20 265 L 295 275 L 535 255 L 785 268" strokeWidth="3" />
                {/* Southern Boulevard */}
                <path d="M 95 455 L 430 435 L 740 460" strokeWidth="3" />
                {/* Historic Center Grid Accent */}
                <path d="M 495 155 L 685 155" strokeWidth="2.5" />
                <path d="M 555 55 L 555 315" strokeWidth="2.5" />
              </g>

              {/* Park Silhouettes (High-Contrast Hatched/Outlined Monochrome) */}
              <g>
                {/* Parque Mexico Oval */}
                <ellipse
                  cx="235"
                  cy="290"
                  rx="42"
                  ry="26"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                {/* Alameda / Central Plaza */}
                <rect
                  x="500"
                  y="102"
                  width="66"
                  height="34"
                  rx="4"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="1.5"
                />
                {/* Southern Plaza */}
                <circle
                  cx="388"
                  cy="486"
                  r="24"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
              </g>

              {/* Subtle District Typography Labels */}
              <g
                fill="rgba(255,255,255,0.34)"
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
                letterSpacing="1.6"
              >
                <text x="530" y="88">CENTRO HISTÓRICO</text>
                <text x="275" y="96">SAN RAFAEL</text>
                <text x="330" y="168">JUÁREZ</text>
                <text x="145" y="255">CONDESA</text>
                <text x="295" y="346">ROMA</text>
                <text x="488" y="302">DOCTORES</text>
                <text x="448" y="425">NARVARTE</text>
                <text x="335" y="532">COYOACÁN</text>
              </g>

              {/* Animated Crawl Path Connecting Visible Spots */}
              {showRoute && visibleSpots.length >= 2 && (
                <motion.polyline
                  key={routePoints}
                  points={routePoints}
                  fill="none"
                  stroke="#E8FF00"
                  strokeWidth="3"
                  strokeDasharray="8 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </svg>

            {/* Interactive HTML Pin Overlay (Accessible, Crisp Touch Hitboxes >= 44px) */}
            <div className="absolute inset-0 pointer-events-none">
              {spots.map((spot) => {
                const isSelected = activeSpot?.id === spot.id;
                const isVisible = visibleIdSet.has(spot.id);
                const spotSaved = savedIds.includes(spot.id);

                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => onSelectSpot(spot.id)}
                    style={{
                      left: `${spot.mapX}%`,
                      top: `${spot.mapY}%`,
                    }}
                    aria-label={`Spot ${spot.id}: ${spot.name} in ${spot.neighborhood}`}
                    aria-pressed={isSelected}
                    className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center group cursor-pointer focus-visible:z-30 transition-opacity duration-200 ${
                      isSelected ? 'z-20' : 'z-10'
                    } ${isVisible ? 'opacity-100' : 'opacity-25 hover:opacity-75'}`}
                  >
                    <span
                      className={`relative flex items-center justify-center w-9 h-9 rounded-full border-2 font-mono text-xs font-bold tabular-nums transition-transform duration-150 ${
                        isSelected
                          ? 'bg-[#E8FF00] text-neutral-950 border-neutral-950 scale-120 shadow-[3px_3px_0px_#FF3B1F]'
                          : spotSaved
                            ? 'bg-[#FF3B1F] text-white border-white group-hover:scale-115 group-hover:bg-[#E8FF00] group-hover:text-neutral-950 group-hover:border-neutral-950'
                            : 'bg-white text-neutral-950 border-neutral-950 group-hover:scale-115 group-hover:bg-[#E8FF00]'
                      }`}
                    >
                      {String(spot.id).padStart(2, '0')}
                    </span>

                    {/* Hover Tooltip Label on Desktop */}
                    <span className="hidden sm:block pointer-events-none absolute left-1/2 -translate-x-1/2 -top-9 px-2.5 py-1 bg-white text-neutral-950 border-2 border-neutral-950 text-xs font-bold whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 shadow-[3px_3px_0px_#E8FF00]">
                      {spot.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quiet Legend Bar */}
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2.5 border-t border-white/15 bg-neutral-950 text-xs text-neutral-300">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#E8FF00] border border-neutral-950 inline-block" aria-hidden="true" />
                Selected
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF3B1F] border border-white inline-block" aria-hidden="true" />
                Saved to Crawl
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-white inline-block" aria-hidden="true" />
                Open Spot
              </span>
            </div>
            <span className="text-neutral-400">Tap any pin to inspect</span>
          </div>
        </div>

        {/* Selected Spot Live Inspector Panel */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
          {visibleSpots.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-neutral-950 bg-neutral-50">
              <MapPin className="w-8 h-8 text-neutral-950 mb-3" aria-hidden="true" />
              <h3 className="text-xl font-bold text-neutral-950">
                No spots in your crawl yet
              </h3>
              <p className="mt-2 text-sm text-neutral-600 max-w-xs">
                Tap "Save to Crawl" on any spot below to build your personal route across town.
              </p>
              <button
                type="button"
                onClick={() => onFilterChange('All')}
                className="mt-5 min-h-[44px] px-5 py-2.5 text-sm font-bold bg-neutral-950 text-white hover:bg-[#E8FF00] hover:text-neutral-950 border-2 border-neutral-950 cursor-pointer transition-colors"
              >
                Show All 10 Spots
              </button>
            </div>
          ) : (
            activeSpot && (
              <motion.div
                key={activeSpot.id}
                initial={{ opacity: 0.6, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex flex-col justify-between border-2 border-neutral-950 bg-white p-6 shadow-[8px_8px_0px_#0A0A0A]"
              >
                <div>
                  {/* Index + Unboxed Metadata Line */}
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-[#E8FF00] text-neutral-950 border-2 border-neutral-950 font-mono text-lg font-bold tabular-nums shadow-[3px_3px_0px_#0A0A0A]">
                      {String(activeSpot.id).padStart(2, '0')}
                    </span>

                    <button
                      type="button"
                      onClick={() => onEditSpot(activeSpot.id)}
                      className="min-h-[40px] min-w-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 border border-neutral-300 cursor-pointer transition-colors"
                      aria-label={`Edit ${activeSpot.name}`}
                    >
                      <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-neutral-600">
                    <span className="font-semibold text-neutral-950">
                      {activeSpot.neighborhood}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeSpot.vibe}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      {activeSpot.priceRange}
                    </span>
                  </div>

                  <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 leading-tight">
                    {activeSpot.name}
                  </h3>

                  <p className="mt-1.5 text-sm text-neutral-600">
                    {activeSpot.address} ·{' '}
                    <span className="font-mono text-xs tabular-nums">
                      {activeSpot.hours}
                    </span>
                  </p>

                  {/* Signature What To Order Box */}
                  <div className="mt-5 p-4 bg-neutral-950 text-white border-2 border-neutral-950">
                    <p className="text-xs font-mono font-bold tracking-wide text-[#E8FF00]">
                      What to order
                    </p>
                    <p className="mt-1.5 text-base font-bold leading-snug text-white">
                      {activeSpot.whatToOrder}
                    </p>
                    <p className="mt-2 pt-2 border-t border-white/15 text-xs text-neutral-300">
                      Pair with: <span className="text-white font-medium">{activeSpot.pairWith}</span>
                    </p>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-neutral-700">
                    {activeSpot.story}
                  </p>
                </div>

                {/* Action Row */}
                <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onToggleSaved(activeSpot.id)}
                    className={`flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold border-2 border-neutral-950 cursor-pointer whitespace-nowrap brutal-lift ${
                      isSaved
                        ? 'bg-[#FF3B1F] text-white'
                        : 'bg-[#E8FF00] text-neutral-950'
                    }`}
                  >
                    <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{isSaved ? 'On Your Crawl' : 'Save to Crawl'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onJumpToSpot(activeSpot.id)}
                    className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-bold bg-white text-neutral-950 border-2 border-neutral-950 hover:bg-neutral-950 hover:text-white cursor-pointer whitespace-nowrap transition-colors"
                  >
                    <span>Full Note</span>
                    <ArrowDownRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
