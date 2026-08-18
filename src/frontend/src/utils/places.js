export const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&q=85";

const FALLBACK_IMAGES = {
  "wadi shab": "https://images.unsplash.com/photo-1590689858961-cffb0dfd1f36?w=1200&q=85",
  "nizwa fort": "https://images.unsplash.com/photo-1601565415267-724c2a5f2e1f?w=1200&q=85",
  "mutrah souq": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=85",
  "sultan qaboos grand mosque": "https://images.unsplash.com/photo-1564769625392-651b2c4c1c1c?w=1200&q=85",
  "bimmah sinkhole": "https://images.unsplash.com/photo-1580746738099-1cf7b1a9d5f3?w=1200&q=85",
  "jebel akhdar": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=85",
  "wahiba sands": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=85",
};

export function imageForPlace(place) {
  const mainImage = place.images?.find((image) => image.isMain)?.imageUrl;
  const firstImage = place.images?.[0]?.imageUrl;
  return (
    mainImage ||
    firstImage ||
    place.mainImageUrl ||
    FALLBACK_IMAGES[place.name?.toLowerCase()] ||
    DEFAULT_IMAGE
  );
}

export function normalizePlace(place) {
  return {
    ...place,
    id: place.id ?? place.placeId,
    image: imageForPlace(place),
  };
}

export function normalizeFavorite(favorite) {
  return normalizePlace({
    ...favorite,
    id: favorite.placeId,
    categoryName: "Saved place",
    description: "",
    images: favorite.mainImageUrl ? [{ imageUrl: favorite.mainImageUrl, isMain: true }] : [],
  });
}

export function imageError(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = DEFAULT_IMAGE;
}
