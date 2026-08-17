export function readRoute() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const params = new URLSearchParams(window.location.search);

  if (pathname === "/") {
    return { valid: true, view: "home" };
  }

  if (pathname === "/places") {
    return {
      valid: true,
      view: "places",
      search: params.get("search") || "",
      city: params.get("city") || "",
      categoryId: params.get("category") || null,
    };
  }

  if (pathname === "/favorites") {
    return { valid: true, view: "favorites" };
  }

  const detailMatch = pathname.match(/^\/places\/([^/]+)$/);
  if (detailMatch) {
    let placeId;
    try {
      placeId = decodeURIComponent(detailMatch[1]);
    } catch {
      return { valid: false, view: "home" };
    }

    return {
      valid: true,
      view: "detail",
      placeId,
    };
  }

  return { valid: false, view: "home" };
}

export function buildRoutePath(view, { placeId, search = "", city = "", categoryId = null } = {}) {
  if (view === "detail" && placeId) {
    return `/places/${encodeURIComponent(placeId)}`;
  }

  if (view === "favorites") return "/favorites";
  if (view !== "places") return "/";

  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  if (city) params.set("city", city);
  if (categoryId) params.set("category", categoryId);
  const query = params.toString();
  return `/places${query ? `?${query}` : ""}`;
}
