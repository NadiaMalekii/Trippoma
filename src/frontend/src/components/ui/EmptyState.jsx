import { Compass, RotateCcw } from "lucide-react";

export default function EmptyState({ onReset, message = "No places match those filters." }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface/40 px-6 py-14 text-center">
      <Compass className="mx-auto text-muted" size={28} strokeWidth={1.4} />
      <h3 className="mt-4 font-display text-2xl text-sand">The trail goes quiet here</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">{message} Try a different city, category, or search term.</p>
      {onReset && (
        <button type="button" onClick={onReset} className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-sand transition hover:border-gold hover:text-gold">
          <RotateCcw size={14} /> Clear filters
        </button>
      )}
    </div>
  );
}
