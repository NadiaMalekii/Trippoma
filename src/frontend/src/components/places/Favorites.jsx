import { LogIn } from "lucide-react";
import { normalizeFavorite } from "../../utils/places";
import PlaceGrid from "../ui/PlaceGrid";

export default function Favorites({ session, favorites, loading, error, favoriteIds, onToggleFavorite, onOpenPlace, onOpenAuth }) {
  if (!session) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="max-w-xl">
          <p className="eyebrow">Your personal atlas</p>
          <h1 className="mt-3 font-display text-5xl tracking-tight text-sand">Keep the places that call you back.</h1>
          <p className="mt-5 text-base leading-7 text-muted">Log in to save places while you plan your next Oman escape.</p>
          <button type="button" onClick={onOpenAuth} className="mt-8 inline-flex items-center gap-2 rounded-full bg-clay px-5 py-3 text-sm text-sand transition hover:bg-gold hover:text-night"><LogIn size={15} /> Log in to see favorites</button>
        </div>
      </main>
    );
  }

  const savedPlaces = favorites.map(normalizeFavorite);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <p className="eyebrow">Saved for later</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="font-display text-5xl tracking-tight text-sand">Your favorites</h1><p className="mt-3 text-sm text-muted">The places you want to remember.</p></div>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{favorites.length} saved</span>
      </div>
      <div className="mt-9">
        <PlaceGrid
          places={savedPlaces}
          loading={loading}
          error={error}
          skeletonCount={3}
          emptyMessage="Nothing saved yet. Tap the heart on any place to keep it close."
          favoriteIds={favoriteIds}
          onToggleFavorite={onToggleFavorite}
          onOpenPlace={onOpenPlace}
        />
      </div>
    </main>
  );
}
