const API_ROOT = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");
const SESSION_KEY = "trippoma.session";

export function getSession() {
  try {
    const stored = window.localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setSession(session) {
  if (session) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
}

async function request(path, options = {}) {
  const session = getSession();
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (session?.token) {
    headers.set("Authorization", `Bearer ${session.token}`);
  }

  const response = await fetch(`${API_ROOT}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      // Some framework errors have no response body.
    }

    if (response.status === 401) {
      setSession(null);
    }

    const validationMessage = payload?.errors
      ? Object.values(payload.errors).flat().join(" ")
      : null;
    const error = new Error(
      validationMessage || payload?.detail || payload?.title || payload?.message || `Request failed (${response.status})`,
    );
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) return null;
  return response.json();
}

export function getCategories(signal) {
  return request("/categories", { signal });
}

export function getPlaces({ search, city, categoryId, signal } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (city) params.set("city", city);
  if (categoryId) params.set("categoryId", categoryId);
  const query = params.toString();
  return request(`/places${query ? `?${query}` : ""}`, { signal });
}

export function getPlace(id, signal) {
  return request(`/places/${id}`, { signal });
}

export function login(credentials) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function register(credentials) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function getFavorites(signal) {
  return request("/favorites", { signal });
}

export function addFavorite(placeId) {
  return request(`/favorites/${placeId}`, { method: "POST" });
}

export function removeFavorite(placeId) {
  return request(`/favorites/${placeId}`, { method: "DELETE" });
}
