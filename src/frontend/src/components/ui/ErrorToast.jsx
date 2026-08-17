import { CircleAlert, X } from "lucide-react";

export default function ErrorToast({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-xl border border-clay/60 bg-surface px-4 py-3 text-sm text-sand shadow-soft">
      <CircleAlert size={17} className="shrink-0 text-gold" />
      <span className="flex-1">{message}</span>
      <button type="button" onClick={onDismiss} aria-label="Dismiss error"><X size={15} /></button>
    </div>
  );
}
