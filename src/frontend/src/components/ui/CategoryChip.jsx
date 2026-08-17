import { getCategoryIcon } from "../../utils/places";

export default function CategoryChip({ category, active, onClick }) {
  const Icon = getCategoryIcon(category.name);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition duration-200 ${
        active
          ? "border-teal bg-teal text-sand shadow-[0_5px_18px_rgba(47,110,104,0.25)]"
          : "border-line bg-transparent text-sand hover:border-muted hover:bg-surface"
      }`}
    >
      <Icon size={14} strokeWidth={1.8} />
      {category.name}
    </button>
  );
}
