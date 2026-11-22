import { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import {
  ArrowDown,
  ArrowUp,
  Check,
  MapPin,
  Pencil,
  RotateCcw,
} from 'lucide-react';
import {
  DEFAULT_GUIDE_DATA,
  HERO_IMAGE_URL,
  type SiteCopy,
  type StreetFoodGuideData,
  type StreetFoodSpot,
} from './data/streetFoodData';
import { CityMap, type FilterMode } from './components/CityMap';
import { SpotCard } from './components/SpotCard';
import { EditGuideDrawer } from './components/EditGuideDrawer';
import { DishStamp } from './components/DishStamp';

const STORAGE_DATA_KEY = 'curbside_street_food_data_v1';
const STORAGE_SAVED_KEY = 'curbside_street_food_saved_v1';

function loadGuideData(): StreetFoodGuideData {
  try {
    const raw = localStorage.getItem(STORAGE_DATA_KEY);
    if (!raw) return DEFAULT_GUIDE_DATA;
    const parsed = JSON.parse(raw) as StreetFoodGuideData;
    if (
      parsed &&
      parsed.site &&
      Array.isArray(parsed.spots) &&
      parsed.spots.length === 10
    ) {
      return parsed;
    }
    return DEFAULT_GUIDE_DATA;
  } catch {
    return DEFAULT_GUIDE_DATA;
  }
}

function loadSavedIds(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_SAVED_KEY);
    if (!raw) return [1, 3];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id): id is number => typeof id === 'number')
      : [1, 3];
  } catch {
    return [1, 3];
  }
}

export default function App() {
  const [guideData, setGuideData] = useState<StreetFoodGuideData>(loadGuideData);
  const [savedIds, setSavedIds] = useState<number[]>(loadSavedIds);
  const [selectedSpotId, setSelectedSpotId] = useState<number>(1);
  const [filter, setFilter] = useState<FilterMode>('All');
  const [showRoute, setShowRoute] = useState<boolean>(true);
  const [heroImageError, setHeroImageError] = useState<boolean>(false);

  // Live text editor state
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [editorTargetSpotId, setEditorTargetSpotId] = useState<number | null>(
    null
  );

  // Smooth scroll progress indicator (compositor-only scaleX)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(guideData));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [guideData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(savedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedIds]);

  const visibleSpots = useMemo(() => {
    if (filter === 'All') return guideData.spots;
    if (filter === 'Saved') {
      return guideData.spots.filter((s) => savedIds.includes(s.id));
    }
    return guideData.spots.filter((s) => s.vibe === filter);
  }, [guideData.spots, filter, savedIds]);

  const uniqueNeighborhoodCount = useMemo(
    () => new Set(guideData.spots.map((s) => s.neighborhood.trim())).size,
    [guideData.spots]
  );

  const handleToggleSaved = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (nextFilter: FilterMode) => {
    setFilter(nextFilter);
    const matching =
      nextFilter === 'All'
        ? guideData.spots
        : nextFilter === 'Saved'
          ? guideData.spots.filter((s) => savedIds.includes(s.id))
          : guideData.spots.filter((s) => s.vibe === nextFilter);
    if (matching.length > 0 && !matching.some((s) => s.id === selectedSpotId)) {
      setSelectedSpotId(matching[0].id);
    }
  };

  const handleJumpToSpot = (id: number) => {
    setSelectedSpotId(id);
    if (filter !== 'All' && !visibleSpots.some((s) => s.id === id)) {
      setFilter('All');
    }
    requestAnimationFrame(() => {
      const el = document.getElementById(`spot-${id}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handlePinOnMap = (id: number) => {
    setSelectedSpotId(id);
    const mapSection = document.getElementById('map');
    mapSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOpenEditor = (spotId: number | null = null) => {
    setEditorTargetSpotId(spotId);
    setEditorOpen(true);
  };

  const handleUpdateSite = (patch: Partial<SiteCopy>) => {
    setGuideData((prev) => ({
      ...prev,
      site: { ...prev.site, ...patch },
    }));
  };

  const handleUpdateSpot = (id: number, patch: Partial<StreetFoodSpot>) => {
    setGuideData((prev) => ({
      ...prev,
      spots: prev.spots.map((spot) =>
        spot.id === id ? { ...spot, ...patch } : spot
      ),
    }));
  };

  const handleResetDefaults = () => {
    setGuideData(DEFAULT_GUIDE_DATA);
    try {
      localStorage.removeItem(STORAGE_DATA_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 flex flex-col">
      {/* Sticky Single-Row 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b-2 border-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-950 whitespace-nowrap shrink-0 hover:bg-[#E8FF00] px-1 -mx-1 transition-colors"
          >
            {guideData.site.brandName}
          </a>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-neutral-700"
          >
            <a
              href="#map"
              className="py-1 hover:text-neutral-950 underline-offset-4 hover:underline decoration-2 whitespace-nowrap shrink-0 transition-colors"
            >
              Map
            </a>
            <a
              href="#top-10"
              className="py-1 hover:text-neutral-950 underline-offset-4 hover:underline decoration-2 whitespace-nowrap shrink-0 transition-colors"
            >
              Top 10
            </a>
            <a
              href="#quick-guide"
              className="py-1 hover:text-neutral-950 underline-offset-4 hover:underline decoration-2 whitespace-nowrap shrink-0 transition-colors"
            >
              Order Sheet
            </a>
            <a
              href="#crawl-note"
              className="py-1 hover:text-neutral-950 underline-offset-4 hover:underline decoration-2 whitespace-nowrap shrink-0 transition-colors"
            >
              About
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action Button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => handleOpenEditor(null)}
              className="min-h-[40px] sm:min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold bg-neutral-950 text-white border-2 border-neutral-950 hover:bg-[#E8FF00] hover:text-neutral-950 whitespace-nowrap shrink-0 cursor-pointer brutal-lift"
            >
              <Pencil className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Edit Text</span>
            </button>
          </div>
        </div>

        {/* Scroll Depth Progress Accent Bar */}
        <motion.div
          style={{ scaleX }}
          className="h-[3px] bg-[#E8FF00] origin-left"
          aria-hidden="true"
        />
      </header>

      <main id="top" className="flex-1">
        {/* HERO SECTION — Balanced 2-Column Editorial Split */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Hero Text Column */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-between"
            >
              <div>
                <p className="font-mono text-xs sm:text-sm font-bold text-neutral-600">
                  {guideData.site.editionLine}
                </p>

                <h1 className="mt-4 font-display text-[clamp(2.75rem,6.4vw,5.25rem)] font-extrabold leading-[0.96] tracking-tight text-neutral-950 [text-wrap:balance]">
                  {guideData.site.heroHeadline}
                </h1>

                <p className="mt-5 text-base sm:text-lg leading-relaxed text-neutral-700 max-w-xl">
                  {guideData.site.heroSubheadline}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#map"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-extrabold bg-[#E8FF00] text-neutral-950 border-2 border-neutral-950 shadow-[4px_4px_0px_#0A0A0A] whitespace-nowrap brutal-lift"
                >
                  <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Explore the Map</span>
                </a>

                <a
                  href="#top-10"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-bold bg-white text-neutral-950 border-2 border-neutral-950 hover:bg-neutral-950 hover:text-white whitespace-nowrap transition-colors"
                >
                  <span>Jump to Top 10</span>
                  <ArrowDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            {/* Hero Photographic Focal Anchor */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 group relative border-2 border-neutral-950 bg-neutral-950 shadow-[8px_8px_0px_#0A0A0A] overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[400px]"
            >
              {!heroImageError ? (
                <>
                  <img
                    src={HERO_IMAGE_URL}
                    alt={`Bustling night street taco stand in ${guideData.site.cityName} with glowing al pastor trompo`}
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImageError(true)}
                    className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500 ease-out"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 sm:p-5">
                    <p className="font-mono text-xs text-white/95">
                      {guideData.site.heroPhotoCaption}
                    </p>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-8 text-white">
                  <DishStamp type="taco" className="w-16 h-16 text-[#E8FF00]" />
                  <p className="font-display text-xl font-bold">
                    {guideData.site.cityName} Street-Food Map
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Full-Width 4-Column City Guide Summary Strip */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 border-2 border-neutral-950 divide-y-2 lg:divide-y-0 divide-x-2 divide-neutral-950 bg-white">
            <div className="p-4 sm:p-5">
              <p className="text-xs font-medium text-neutral-600">Curated Stops</p>
              <p className="mt-1 font-mono text-2xl sm:text-3xl font-bold tabular-nums text-neutral-950">
                10
              </p>
            </div>
            <div className="p-4 sm:p-5">
              <p className="text-xs font-medium text-neutral-600">Neighborhoods</p>
              <p className="mt-1 font-mono text-2xl sm:text-3xl font-bold tabular-nums text-neutral-950">
                {String(uniqueNeighborhoodCount).padStart(2, '0')}
              </p>
            </div>
            <div className="p-4 sm:p-5">
              <p className="text-xs font-medium text-neutral-600">Street Budget</p>
              <p className="mt-1 font-mono text-2xl sm:text-3xl font-bold tabular-nums text-neutral-950">
                $2–$11
              </p>
            </div>
            <div className="p-4 sm:p-5 bg-[#E8FF00]">
              <p className="text-xs font-bold text-neutral-950">Your Crawl List</p>
              <p className="mt-1 font-mono text-2xl sm:text-3xl font-bold tabular-nums text-neutral-950">
                {savedIds.length} / 10
              </p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE BLACK & WHITE STREET-FOOD MAP SECTION */}
        <section
          id="map"
          className="border-t-2 border-neutral-950 bg-neutral-50 py-14 sm:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
            >
              <div>
                <p className="font-mono text-xs font-bold text-neutral-600">
                  01. Interactive City Grid
                </p>
                <h2 className="mt-1 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 [text-wrap:balance]">
                  {guideData.site.mapHeading}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-neutral-700 max-w-md leading-relaxed">
                {guideData.site.mapSubheading}
              </p>
            </motion.div>

            <CityMap
              cityName={guideData.site.cityName}
              spots={guideData.spots}
              visibleSpots={visibleSpots}
              selectedSpotId={selectedSpotId}
              savedIds={savedIds}
              showRoute={showRoute}
              onSelectSpot={setSelectedSpotId}
              onToggleRoute={() => setShowRoute((prev) => !prev)}
              onToggleSaved={handleToggleSaved}
              onJumpToSpot={handleJumpToSpot}
              onEditSpot={(id) => handleOpenEditor(id)}
              filter={filter}
              onFilterChange={handleFilterChange}
            />
          </div>
        </section>

        {/* TOP 10 EDITORIAL GUIDE SECTION */}
        <section
          id="top-10"
          className="border-t-2 border-neutral-950 bg-white py-14 sm:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
            >
              <div>
                <p className="font-mono text-xs font-bold text-neutral-600">
                  02. Ranked Corner by Corner
                </p>
                <h2 className="mt-1 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 [text-wrap:balance]">
                  {guideData.site.listHeading}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-neutral-700 max-w-md leading-relaxed">
                {guideData.site.listSubheading}
              </p>
            </motion.div>

            {/* Mobile-Friendly Quick Number Jump Rail (01–10) */}
            <div
              className="mb-8 flex items-center gap-1.5 overflow-x-auto pb-2"
              aria-label="Quick jump to spot number"
            >
              {guideData.spots.map((spot) => {
                const isSaved = savedIds.includes(spot.id);
                const isSelected = selectedSpotId === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => handleJumpToSpot(spot.id)}
                    className={`min-h-[44px] min-w-[44px] px-3 font-mono text-sm font-bold tabular-nums border-2 border-neutral-950 shrink-0 cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? 'bg-[#E8FF00] text-neutral-950 shadow-[3px_3px_0px_#0A0A0A] -translate-y-0.5'
                        : isSaved
                          ? 'bg-neutral-950 text-[#E8FF00] hover:bg-[#FF3B1F] hover:text-white'
                          : 'bg-white text-neutral-950 hover:bg-[#E8FF00]'
                    }`}
                    title={`${spot.id}. ${spot.name}`}
                  >
                    {String(spot.id).padStart(2, '0')}
                  </button>
                );
              })}
            </div>

            {/* Active Filter Notice when Filtered */}
            {filter !== 'All' && (
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-4 bg-neutral-100 border-2 border-neutral-950">
                <p className="text-sm font-medium text-neutral-950">
                  Showing{' '}
                  <span className="font-mono font-bold tabular-nums">
                    {visibleSpots.length}
                  </span>{' '}
                  {filter === 'Saved'
                    ? 'saved crawl spots'
                    : `${filter.toLowerCase()} spots`}
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setFilter('All')}
                  className="min-h-[40px] px-3.5 py-1.5 text-xs font-bold bg-neutral-950 text-white hover:bg-[#E8FF00] hover:text-neutral-950 cursor-pointer whitespace-nowrap transition-colors"
                >
                  Show All 10
                </button>
              </div>
            )}

            {/* Top 10 Cards Stack */}
            {visibleSpots.length === 0 ? (
              <div className="p-10 text-center border-2 border-neutral-950 bg-neutral-50">
                <p className="text-lg font-bold text-neutral-950">
                  Your crawl list is empty right now.
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  Switch back to All 10 to pick the corners you want to hit first.
                </p>
                <button
                  type="button"
                  onClick={() => setFilter('All')}
                  className="mt-4 min-h-[44px] px-5 py-2.5 text-sm font-bold bg-[#E8FF00] text-neutral-950 border-2 border-neutral-950 cursor-pointer"
                >
                  View All 10 Spots
                </button>
              </div>
            ) : (
              <div className="space-y-7 sm:space-y-9">
                {visibleSpots.map((spot) => (
                  <SpotCard
                    key={spot.id}
                    spot={spot}
                    isSelected={selectedSpotId === spot.id}
                    isSaved={savedIds.includes(spot.id)}
                    onPinOnMap={handlePinOnMap}
                    onToggleSaved={handleToggleSaved}
                    onEdit={(id) => handleOpenEditor(id)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* POCKET ORDER CHEAT SHEET — One-Handed Curbside Checklist */}
        <section
          id="quick-guide"
          className="border-t-2 border-neutral-950 bg-neutral-950 text-white py-14 sm:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
            >
              <div>
                <p className="font-mono text-xs font-bold text-[#E8FF00]">
                  03. Pocket Order Sheet
                </p>
                <h2 className="mt-1 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white [text-wrap:balance]">
                  Stand in line, call this out.
                </h2>
              </div>
              <p className="text-sm sm:text-base text-neutral-300 max-w-md leading-relaxed">
                Tap any row to check it off your personal {guideData.site.cityName} crawl. Saved automatically on your phone.
              </p>
            </motion.div>

            <div className="border-2 border-white/25 divide-y divide-white/15">
              {guideData.spots.map((spot) => {
                const checked = savedIds.includes(spot.id);
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => handleToggleSaved(spot.id)}
                    className={`w-full text-left px-4 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 cursor-pointer transition-colors duration-150 ${
                      checked
                        ? 'bg-[#E8FF00] text-neutral-950'
                        : 'bg-neutral-950 text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4 sm:w-64 shrink-0">
                      <span
                        className={`w-7 h-7 flex items-center justify-center border-2 shrink-0 ${
                          checked
                            ? 'bg-neutral-950 text-[#E8FF00] border-neutral-950'
                            : 'border-white/50 text-transparent'
                        }`}
                        aria-hidden="true"
                      >
                        <Check className="w-4 h-4" />
                      </span>
                      <span className="font-mono text-sm font-bold tabular-nums opacity-75">
                        {String(spot.id).padStart(2, '0')}
                      </span>
                      <span className="font-display text-lg font-extrabold tracking-tight truncate">
                        {spot.name}
                      </span>
                    </div>

                    <p
                      className={`flex-1 text-sm sm:text-base font-semibold leading-snug ${
                        checked ? 'text-neutral-950' : 'text-neutral-100'
                      }`}
                    >
                      {spot.whatToOrder}
                    </p>

                    <span
                      className={`font-mono text-xs tabular-nums whitespace-nowrap shrink-0 ${
                        checked ? 'text-neutral-900 font-bold' : 'text-neutral-400'
                      }`}
                    >
                      {spot.neighborhood} · {spot.priceRange}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* CLEAN EDITORIAL FOOTER */}
      <footer
        id="crawl-note"
        className="border-t-2 border-neutral-950 bg-white text-neutral-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-lg">
            <p className="font-display text-2xl font-extrabold tracking-tight text-neutral-950">
              {guideData.site.brandName} · {guideData.site.cityName}
            </p>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              {guideData.site.curatorNote}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleOpenEditor(null)}
              className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-sm font-bold bg-[#E8FF00] text-neutral-950 border-2 border-neutral-950 cursor-pointer whitespace-nowrap brutal-lift"
            >
              <Pencil className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Edit All Text</span>
            </button>

            <button
              type="button"
              onClick={() => setSavedIds([])}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-white text-neutral-950 border-2 border-neutral-950 hover:bg-neutral-100 cursor-pointer whitespace-nowrap transition-colors"
            >
              <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Clear Crawl</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center bg-neutral-950 text-white hover:bg-[#E8FF00] hover:text-neutral-950 border-2 border-neutral-950 cursor-pointer transition-colors"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </footer>

      {/* Live Text Editor Slide-Over Drawer (remounted per target for fresh tab state) */}
      {editorOpen && (
        <EditGuideDrawer
          key={`editor-${editorTargetSpotId ?? 'site'}`}
          isOpen={editorOpen}
          initialSpotId={editorTargetSpotId}
          data={guideData}
          onUpdateSite={handleUpdateSite}
          onUpdateSpot={handleUpdateSpot}
          onResetDefaults={handleResetDefaults}
          onClose={() => setEditorOpen(false)}
        />
      )}
    </div>
  );
}
