import { Heart, MapPin } from "lucide-react";
import { imageError } from "../../utils/places";

export default function PlaceCard({ place, isFavorite, onToggleFavorite, onOpen }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-muted hover:shadow-soft">
      <div className="relative h-56 overflow-hidden">
        <button
          type="button"
          onClick={() => onOpen(place)}
          className="absolute inset-0 z-0 h-full w-full text-left"
          aria-label={`Open ${place.name}`}
        >
          <img
            src={place.image}
            alt={place.name}
            loading="lazy"
            onError={imageError}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/5 to-transparent" />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite(place.id);
          }}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-night/55 text-sand backdrop-blur transition hover:bg-night/85"
          aria-label={`${isFavorite ? "Remove" : "Save"} ${place.name} ${isFavorite ? "from favorites" : "to favorites"}`}
          aria-pressed={isFavorite}
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "text-gold" : ""} />
        </button>
        <span className="absolute bottom-3 left-3 rounded-full bg-clay px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-sand">
          {place.categoryName || "Oman"}
        </span>
      </div>
      <button type="button" onClick={() => onOpen(place)} className="block w-full p-4 text-left">
        <h3 className="font-display text-[1.3rem] leading-tight text-sand transition group-hover:text-gold">
          {place.name}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 font-mono text-[0.66rem] text-muted">
          <MapPin size={12} /> {place.city}
        </p>
      </button>
    </article>
  );
}
