import { useState } from 'react';
import { Check, Copy, RotateCcw, X } from 'lucide-react';
import type {
  SiteCopy,
  StreetFoodGuideData,
  StreetFoodSpot,
  TimeVibe,
} from '../data/streetFoodData';

interface EditGuideDrawerProps {
  isOpen: boolean;
  initialSpotId: number | null;
  data: StreetFoodGuideData;
  onUpdateSite: (patch: Partial<SiteCopy>) => void;
  onUpdateSpot: (id: number, patch: Partial<StreetFoodSpot>) => void;
  onResetDefaults: () => void;
  onClose: () => void;
}

const VIBE_CHOICES: TimeVibe[] = ['Morning', 'Midday', 'Late Night'];

export function EditGuideDrawer({
  isOpen,
  initialSpotId,
  data,
  onUpdateSite,
  onUpdateSpot,
  onResetDefaults,
  onClose,
}: EditGuideDrawerProps) {
  const [activeTab, setActiveTab] = useState<'site' | number>(
    initialSpotId ?? 'site'
  );
  const [copied, setCopied] = useState(false);

  // Sync tab whenever opened targeting a specific spot
  if (!isOpen) return null;

  const selectedSpot =
    typeof activeTab === 'number'
      ? data.spots.find((s) => s.id === activeTab) ?? data.spots[0]
      : null;

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Edit street-food guide text"
    >
      {/* Backdrop click closes drawer */}
      <button
        type="button"
        aria-label="Close editor overlay"
        onClick={onClose}
        className="flex-1 cursor-default"
      />

      {/* Slide-over Editor Panel */}
      <div className="w-full max-w-xl bg-white text-neutral-950 border-l-2 border-neutral-950 flex flex-col h-full shadow-2xl">
        {/* Sticky Drawer Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b-2 border-neutral-950 bg-[#E8FF00]">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-neutral-950">
              Edit Guide Text
            </h2>
            <p className="text-xs font-medium text-neutral-800">
              Every change updates live and auto-saves to this browser.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close text editor"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-neutral-950 text-white hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Selector Strip: City Copy + Spots 01–10 */}
        <div className="px-5 py-3 border-b border-neutral-200 bg-neutral-50 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('site')}
              className={`min-h-[40px] px-3.5 py-1.5 text-xs font-bold border-2 border-neutral-950 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'site'
                  ? 'bg-neutral-950 text-[#E8FF00]'
                  : 'bg-white text-neutral-950 hover:bg-neutral-100'
              }`}
            >
              City & Headlines
            </button>
            {data.spots.map((spot) => (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActiveTab(spot.id)}
                className={`min-h-[40px] px-3 py-1.5 font-mono text-xs font-bold border-2 border-neutral-950 whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                  activeTab === spot.id
                    ? 'bg-[#E8FF00] text-neutral-950'
                    : 'bg-white text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                {String(spot.id).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Form Fields */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {activeTab === 'site' ? (
            <div className="space-y-4">
              <FieldInput
                label="Brand Wordmark"
                value={data.site.brandName}
                onChange={(v) => onUpdateSite({ brandName: v })}
              />
              <FieldInput
                label="City Name"
                value={data.site.cityName}
                onChange={(v) => onUpdateSite({ cityName: v })}
              />
              <FieldInput
                label="Hero Edition Line"
                value={data.site.editionLine}
                onChange={(v) => onUpdateSite({ editionLine: v })}
              />
              <FieldInput
                label="Big Hero Headline"
                value={data.site.heroHeadline}
                onChange={(v) => onUpdateSite({ heroHeadline: v })}
              />
              <FieldTextarea
                label="Hero Intro Copy"
                rows={3}
                value={data.site.heroSubheadline}
                onChange={(v) => onUpdateSite({ heroSubheadline: v })}
              />
              <FieldInput
                label="Map Section Heading"
                value={data.site.mapHeading}
                onChange={(v) => onUpdateSite({ mapHeading: v })}
              />
              <FieldTextarea
                label="Map Section Intro"
                rows={2}
                value={data.site.mapSubheading}
                onChange={(v) => onUpdateSite({ mapSubheading: v })}
              />
              <FieldInput
                label="Top 10 Section Heading"
                value={data.site.listHeading}
                onChange={(v) => onUpdateSite({ listHeading: v })}
              />
              <FieldTextarea
                label="Top 10 Section Intro"
                rows={2}
                value={data.site.listSubheading}
                onChange={(v) => onUpdateSite({ listSubheading: v })}
              />
              <FieldInput
                label="Footer Curator Note"
                value={data.site.curatorNote}
                onChange={(v) => onUpdateSite({ curatorNote: v })}
              />
            </div>
          ) : (
            selectedSpot && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <span className="font-mono text-sm font-bold text-neutral-950">
                    Editing Spot {String(selectedSpot.id).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-neutral-500">
                    Updates map pin & card immediately
                  </span>
                </div>

                <FieldInput
                  label="Spot Name"
                  value={selectedSpot.name}
                  onChange={(v) => onUpdateSpot(selectedSpot.id, { name: v })}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldInput
                    label="Neighborhood"
                    value={selectedSpot.neighborhood}
                    onChange={(v) =>
                      onUpdateSpot(selectedSpot.id, { neighborhood: v })
                    }
                  />
                  <FieldInput
                    label="Price Range"
                    value={selectedSpot.priceRange}
                    onChange={(v) =>
                      onUpdateSpot(selectedSpot.id, { priceRange: v })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldInput
                    label="Street Corner / Address"
                    value={selectedSpot.address}
                    onChange={(v) =>
                      onUpdateSpot(selectedSpot.id, { address: v })
                    }
                  />
                  <FieldInput
                    label="Opening Hours"
                    value={selectedSpot.hours}
                    onChange={(v) =>
                      onUpdateSpot(selectedSpot.id, { hours: v })
                    }
                  />
                </div>

                <div>
                  <span className="block text-xs font-bold text-neutral-950 mb-1.5">
                    Best Time to Go
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {VIBE_CHOICES.map((vibe) => (
                      <button
                        key={vibe}
                        type="button"
                        onClick={() =>
                          onUpdateSpot(selectedSpot.id, { vibe })
                        }
                        className={`min-h-[44px] text-xs font-bold border-2 border-neutral-950 cursor-pointer ${
                          selectedSpot.vibe === vibe
                            ? 'bg-neutral-950 text-[#E8FF00]'
                            : 'bg-white text-neutral-950 hover:bg-neutral-100'
                        }`}
                      >
                        {vibe}
                      </button>
                    ))}
                  </div>
                </div>

                <FieldTextarea
                  label="What to Order (Highlight Box)"
                  rows={2}
                  value={selectedSpot.whatToOrder}
                  onChange={(v) =>
                    onUpdateSpot(selectedSpot.id, { whatToOrder: v })
                  }
                />

                <FieldInput
                  label="Drink / Side Pairing"
                  value={selectedSpot.pairWith}
                  onChange={(v) =>
                    onUpdateSpot(selectedSpot.id, { pairWith: v })
                  }
                />

                <FieldTextarea
                  label="Short Description"
                  rows={3}
                  value={selectedSpot.story}
                  onChange={(v) =>
                    onUpdateSpot(selectedSpot.id, { story: v })
                  }
                />

                <FieldTextarea
                  label="Local Insider Tip"
                  rows={2}
                  value={selectedSpot.proTip}
                  onChange={(v) =>
                    onUpdateSpot(selectedSpot.id, { proTip: v })
                  }
                />

                {/* Map Pin Coordinates */}
                <div className="p-4 bg-neutral-50 border border-neutral-200 space-y-3">
                  <span className="block text-xs font-bold text-neutral-950">
                    Map Pin Position (West–East / North–South)
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="text-xs text-neutral-700 font-mono">
                      Horizontal: {selectedSpot.mapX}%
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={selectedSpot.mapX}
                        onChange={(e) =>
                          onUpdateSpot(selectedSpot.id, {
                            mapX: Number(e.target.value),
                          })
                        }
                        className="mt-1 w-full accent-neutral-950 cursor-pointer"
                      />
                    </label>
                    <label className="text-xs text-neutral-700 font-mono">
                      Vertical: {selectedSpot.mapY}%
                      <input
                        type="range"
                        min={12}
                        max={88}
                        value={selectedSpot.mapY}
                        onChange={(e) =>
                          onUpdateSpot(selectedSpot.id, {
                            mapY: Number(e.target.value),
                          })
                        }
                        className="mt-1 w-full accent-neutral-950 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Sticky Drawer Footer */}
        <div className="p-4 border-t-2 border-neutral-950 bg-neutral-50 flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={onResetDefaults}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200 border border-neutral-300 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyJson}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-white text-neutral-950 border-2 border-neutral-950 hover:bg-neutral-100 cursor-pointer whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copied JSON</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-5 py-2 text-xs font-bold bg-neutral-950 text-[#E8FF00] border-2 border-neutral-950 hover:bg-neutral-800 cursor-pointer whitespace-nowrap"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FieldInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function FieldInput({ label, value, onChange }: FieldInputProps) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-neutral-950 mb-1">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[44px] px-3 py-2 text-sm bg-white text-neutral-950 border-2 border-neutral-950 focus:bg-[#E8FF00]/15 outline-none"
      />
    </label>
  );
}

interface FieldTextareaProps {
  label: string;
  value: string;
  rows: number;
  onChange: (value: string) => void;
}

function FieldTextarea({ label, value, rows, onChange }: FieldTextareaProps) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-neutral-950 mb-1">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm bg-white text-neutral-950 border-2 border-neutral-950 focus:bg-[#E8FF00]/15 outline-none resize-y"
      />
    </label>
  );
}
