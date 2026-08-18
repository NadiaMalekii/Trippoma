import { memo, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Heart, LoaderCircle, MapPin } from "lucide-react";
import { DEFAULT_IMAGE, imageError } from "../../utils/places";
import ApiError from "../ui/ApiError";
import ContourDivider from "../ui/ContourDivider";
import GoogleMap from "../ui/GoogleMap";

function Detail({ place, loading, error, onBack, isFavorite, onToggleFavorite }) {
  const gallery = useMemo(() => {
    if (!place) return [];
    return [...new Set([place.image, ...(place.images || []).map((image) => image.imageUrl).filter(Boolean)])];
  }, [place]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => setActiveImage(0), [place?.id]);

  if (!place) {
    return (
      <main className="mx-auto max-w-5xl px-5 py-9 sm:px-8 lg:px-10 lg:py-14">
        <button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-gold"><ArrowLeft size={15} /> Back to explore</button>
        {loading && <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-5 text-sm text-muted"><LoaderCircle size={17} className="animate-spin text-gold" /> Loading field note</div>}
        {!loading && error && <ApiError message={error} />}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-9 sm:px-8 lg:px-10 lg:py-14">
      <button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-gold"><ArrowLeft size={15} /> Back to explore</button>
      {error && <ApiError message={error} />}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(290px,0.85fr)] lg:items-start">
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface">
             <img src={gallery[activeImage] || DEFAULT_IMAGE} alt={place.name} onError={imageError} className="h-[330px] w-full object-cover sm:h-[480px]" fetchPriority="high" decoding="async" />
            {loading && <div className="absolute inset-0 flex items-center justify-center bg-night/40 backdrop-blur-[2px]"><LoaderCircle size={26} className="animate-spin text-gold" /></div>}
            <span className="absolute bottom-4 left-4 rounded-full bg-clay px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-sand">{place.categoryName || "Saved place"}</span>
          </div>
           {gallery.length > 1 && <div className="mt-3 flex gap-2 overflow-x-auto">{gallery.map((image, index) => <button type="button" key={image} onClick={() => setActiveImage(index)} className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${activeImage === index ? "border-gold" : "border-line"}`}><img src={image} alt="" onError={imageError} loading="lazy" decoding="async" className="h-full w-full object-cover" /></button>)}</div>}
        </div>

        <div className="lg:pt-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Field note</p>
              <h1 className="mt-3 font-display text-5xl leading-[0.95] tracking-tight text-sand">{place.name}</h1>
            </div>
            <button type="button" onClick={() => onToggleFavorite(place.id)} aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"} aria-pressed={isFavorite} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-sand transition hover:border-gold hover:text-gold">
              <Heart size={19} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "text-gold" : ""} />
            </button>
          </div>
          <p className="mt-4 flex items-center gap-2 font-mono text-xs text-muted"><MapPin size={14} /> {place.city}</p>
          <ContourDivider className="my-7" />
          <p className="text-[1.05rem] leading-8 text-sand/85">{place.description || "A new field note is being prepared for this place."}</p>

          <GoogleMap latitude={place.latitude} longitude={place.longitude} placeName={place.name} />
        </div>
      </div>
    </main>
  );
}

export default memo(Detail);
