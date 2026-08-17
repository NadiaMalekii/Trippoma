import ApiError from "./ApiError";
import EmptyState from "./EmptyState";
import PlaceCard from "./PlaceCard";
import SkeletonCard from "./SkeletonCard";

export default function PlaceGrid({
  places,
  loading,
  error,
  skeletonCount = 3,
  emptyMessage,
  onReset,
  favoriteIds,
  onToggleFavorite,
  onOpenPlace,
}) {
  return (
    <>
      {error && <ApiError message={error} />}
      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: skeletonCount }, (_, index) => <SkeletonCard key={index} />)}
        </div>
      ) : places.length ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              isFavorite={favoriteIds.includes(place.id)}
              onToggleFavorite={onToggleFavorite}
              onOpen={onOpenPlace}
            />
          ))}
        </div>
      ) : !error ? (
        <EmptyState onReset={onReset} message={emptyMessage} />
      ) : null}
    </>
  );
}
