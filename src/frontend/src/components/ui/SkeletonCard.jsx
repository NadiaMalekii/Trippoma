export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="h-56 animate-pulse bg-line/70" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-2/3 animate-pulse rounded bg-line/70" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-line/70" />
      </div>
    </div>
  );
}
