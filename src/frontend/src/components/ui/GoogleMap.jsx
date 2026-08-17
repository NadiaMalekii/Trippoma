import { ArrowUpRight, MapPinned } from "lucide-react";

export default function GoogleMap({ latitude, longitude, placeName }) {
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const query = encodeURIComponent(`${lat},${lng}`);
  const embedUrl = `https://www.google.com/maps?q=${query}&z=14&output=embed`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface" aria-label={`Map showing ${placeName}`}>
      <iframe
        title={`Google Map for ${placeName}`}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-64 w-full border-0 sm:h-80"
      />
      <a
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between border-t border-line px-4 py-3 text-sm text-muted transition hover:text-gold"
      >
        <span className="flex items-center gap-2"><MapPinned size={16} /> Open in Google Maps</span>
        <ArrowUpRight size={16} />
      </a>
    </section>
  );
}
