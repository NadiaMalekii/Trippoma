import { ChevronRight, MapPinned } from "lucide-react";
import { DEFAULT_IMAGE, imageError } from "../../utils/places";

export default function Hero({ featuredPlace, onExplore, onOpenPlace }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line/70">
      <div className="absolute inset-0">
         <img src={featuredPlace?.image || DEFAULT_IMAGE} alt="" onError={imageError} className="h-full w-full object-cover" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 to-night/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/25" />
      </div>
      <div className="atlas-grid absolute inset-0 opacity-20" />
      <div className="relative mx-auto flex min-h-[590px] max-w-7xl items-end px-5 pb-14 pt-24 sm:px-8 lg:min-h-[650px] lg:px-10 lg:pb-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Oman, on the ground</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.035em] text-sand sm:text-6xl lg:text-8xl">
            Make room for the <span className="text-gold">unexpected.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-sand/75 sm:text-lg">
            Quiet wadis, old stone, open skies. Find the places that make Oman unforgettable, one field note at a time.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" onClick={onExplore} className="group inline-flex items-center gap-2 rounded-full bg-clay px-5 py-3 text-sm font-medium text-sand transition hover:bg-gold hover:text-night">
              Explore places <ChevronRight size={16} className="transition group-hover:translate-x-0.5" />
            </button>
            {featuredPlace && (
              <button type="button" onClick={() => onOpenPlace(featuredPlace)} className="inline-flex items-center gap-2 rounded-full border border-sand/30 bg-night/20 px-5 py-3 text-sm text-sand backdrop-blur transition hover:border-gold hover:text-gold">
                <MapPinned size={15} /> Discover {featuredPlace.name}
              </button>
            )}
          </div>
          <div className="mt-12 flex items-center gap-5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted">
            <span>07 field notes</span>
            <span className="h-px w-10 bg-line" />
            <span>23° 35′ N · 58° 24′ E</span>
          </div>
        </div>
      </div>
    </section>
  );
}
