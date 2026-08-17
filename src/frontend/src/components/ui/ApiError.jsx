import { CircleAlert } from "lucide-react";

export default function ApiError({ message }) {
  return (
    <div className="mb-5 flex items-start gap-3 rounded-xl border border-clay/50 bg-clay/10 px-4 py-3 text-sm text-sand">
      <CircleAlert size={17} className="mt-0.5 shrink-0 text-gold" />
      <span>{message}</span>
    </div>
  );
}
