import { memo } from "react";
import { ChevronRight, RotateCcw, Search, X } from "lucide-react";
import CategoryChip from "../ui/CategoryChip";
import PlaceGrid from "../ui/PlaceGrid";

function Explore({
  categories,
  places,
  loading,
  error,
  search,
  onSearchChange,
  cityFilter,
  onCityChange,
  cities,
  activeCategory,
  onCategory,
  onReset,
  favoriteIdSet,
  onToggleFavorite,
  onOpenPlace,
}) {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">The atlas</p>
          <h1 className="mt-2 font-display text-5xl tracking-tight text-sand">Explore places</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">Search across Oman by place, city, or the kind of day you want to have.</p>
        </div>
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{loading ? "Updating map" : `${places.length} places found`}</div>
      </div>

      <div className="mt-9 grid gap-3 md:grid-cols-[minmax(0,1fr)_190px_auto]">
        <label className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition focus-within:border-gold">
          <Search size={17} className="shrink-0 text-muted" />
          <span className="sr-only">Search places</span>
          <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search places by name" className="w-full bg-transparent text-sm text-sand outline-none placeholder:text-muted/70" />
          {search && <button type="button" onClick={() => onSearchChange("")} className="text-muted hover:text-sand" aria-label="Clear search"><X size={15} /></button>}
        </label>
        <label className="relative">
          <span className="sr-only">Filter by city</span>
          <select value={cityFilter} onChange={(event) => onCityChange(event.target.value)} className="h-full w-full appearance-none rounded-xl border border-line bg-surface px-4 py-3 text-sm text-sand outline-none transition focus:border-gold">
            <option value="">All cities</option>
            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
          <ChevronRight size={15} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-muted" />
        </label>
        <button type="button" onClick={onReset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-3 text-sm text-muted transition hover:border-gold hover:text-gold"><RotateCcw size={15} /> Reset</button>
      </div>

      <div className="quiet-scrollbar mt-5 flex gap-2 overflow-x-auto pb-2">
        <button type="button" onClick={() => onCategory(null)} aria-pressed={!activeCategory} className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${!activeCategory ? "border-teal bg-teal text-sand" : "border-line text-sand hover:bg-surface"}`}>All places</button>
        {categories.map((category) => <CategoryChip key={category.id} category={category} active={activeCategory === category.id} onClick={() => onCategory(activeCategory === category.id ? null : category.id)} />)}
      </div>

      <div className="mt-9">
        <PlaceGrid
          places={places}
          loading={loading}
          error={error}
          skeletonCount={6}
          onReset={onReset}
          favoriteIdSet={favoriteIdSet}
          onToggleFavorite={onToggleFavorite}
          onOpenPlace={onOpenPlace}
        />
      </div>
    </main>
  );
}

export default memo(Explore);
