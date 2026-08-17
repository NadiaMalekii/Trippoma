import { ArrowUpRight } from "lucide-react";
import CategoryChip from "../ui/CategoryChip";
import ContourDivider from "../ui/ContourDivider";
import PlaceGrid from "../ui/PlaceGrid";
import Hero from "./Hero";

export default function Home({
  categories,
  places,
  loading,
  activeCategory,
  onCategory,
  onExplore,
  onOpenPlace,
  favoriteIds,
  onToggleFavorite,
  error,
}) {
  return (
    <main>
      <Hero featuredPlace={places[0]} onExplore={onExplore} onOpenPlace={onOpenPlace} />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <ContourDivider />
        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Start with a feeling</p>
              <h2 className="mt-2 font-display text-3xl text-sand sm:text-4xl">Where do you want to go?</h2>
            </div>
            <button type="button" onClick={onExplore} className="hidden items-center gap-1 text-sm text-muted transition hover:text-gold sm:flex">View all places <ArrowUpRight size={15} /></button>
          </div>
          <div className="quiet-scrollbar mt-7 flex gap-2 overflow-x-auto pb-2">
            {categories.length ? categories.map((category) => (
              <CategoryChip key={category.id} category={category} active={activeCategory === category.id} onClick={() => onCategory(category.id)} />
            )) : (
              <div className="h-10 w-full max-w-xl animate-pulse rounded-full bg-surface" />
            )}
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">The short list</p>
              <h2 className="mt-2 font-display text-3xl text-sand sm:text-4xl">Popular this month</h2>
            </div>
            <button type="button" onClick={onExplore} className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-gold">See the atlas <ArrowUpRight size={15} /></button>
          </div>
          <PlaceGrid
            places={places.slice(0, 6)}
            loading={loading}
            error={error}
            skeletonCount={3}
            emptyMessage="The atlas is waiting for its first field notes."
            onReset={onExplore}
            favoriteIds={favoriteIds}
            onToggleFavorite={onToggleFavorite}
            onOpenPlace={onOpenPlace}
          />
        </section>

        <section className="relative mt-20 overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-10 lg:p-14">
          <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full border border-gold/20" />
          <div className="absolute -right-6 -top-14 h-44 w-44 rounded-full border border-gold/10" />
          <div className="relative max-w-xl">
            <p className="eyebrow">A slower way to travel</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-sand sm:text-5xl">The best stories are rarely on the main road.</h2>
            <p className="mt-5 leading-7 text-muted">Trippoma is a growing collection of places, routes, and small details worth stopping for.</p>
            <button type="button" onClick={onExplore} className="mt-7 inline-flex items-center gap-2 text-sm text-gold transition hover:text-sand">Browse the collection <ArrowUpRight size={16} /></button>
          </div>
        </section>
      </div>
    </main>
  );
}
