import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  addFavorite,
  getCategories,
  getFavorites,
  getPlace,
  getPlaces,
  getSession,
  login,
  register,
  removeFavorite,
  setSession as persistSession,
} from "./api";
import AuthModal from "./components/auth/AuthModal";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Detail from "./components/places/Detail";
import Explore from "./components/places/Explore";
import Favorites from "./components/places/Favorites";
import Home from "./components/home/Home";
import ErrorToast from "./components/ui/ErrorToast";
import { normalizePlace } from "./utils/places";
import { buildRoutePath, readRoute } from "./utils/routes";

export default function App() {
  const [initialRoute] = useState(readRoute);
  const [view, setView] = useState(initialRoute.view);
  const [categories, setCategories] = useState([]);
  const [catalogPlaces, setCatalogPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [activeCategory, setActiveCategory] = useState(initialRoute.categoryId || null);
  const [search, setSearch] = useState(initialRoute.search || "");
  const deferredSearch = useDeferredValue(search);
  const [cityFilter, setCityFilter] = useState(initialRoute.city || "");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [detailPlaceId, setDetailPlaceId] = useState(initialRoute.placeId || null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [placesLoading, setPlacesLoading] = useState(true);
  const [placesError, setPlacesError] = useState("");
  const [catalogReady, setCatalogReady] = useState(false);
  const [session, setSession] = useState(() => getSession());
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [favoritesError, setFavoritesError] = useState("");
  const [appError, setAppError] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  function applyRoute(route) {
    setView(route.view);

    if (route.view === "places") {
      setSearch(route.search || "");
      setCityFilter(route.city || "");
      setActiveCategory(route.categoryId || null);
    }

    if (route.view === "detail") {
      setDetailPlaceId(route.placeId);
      setSelectedPlace((current) => current?.id === route.placeId ? current : null);
    } else {
      setDetailPlaceId(null);
      setSelectedPlace(null);
    }
  }

  useEffect(() => {
    if (!initialRoute.valid) window.history.replaceState({}, "", "/");

    function handlePopState() {
      const route = readRoute();
      if (!route.valid) {
        window.history.replaceState({}, "", "/");
        applyRoute({ valid: true, view: "home" });
      } else {
        applyRoute(route);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([getCategories(controller.signal), getPlaces({ signal: controller.signal })])
      .then(([categoryData, placeData]) => {
        const normalized = placeData.map(normalizePlace);
        setCategories(categoryData);
        setCatalogPlaces(normalized);
        setPlaces(normalized);
        setCatalogReady(true);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setPlacesError(error.message);
          setCatalogReady(true);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setPlacesLoading(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!catalogReady) return undefined;
    const hasFilters = Boolean(deferredSearch.trim() || cityFilter || activeCategory);
    if (!hasFilters) {
      setPlaces(catalogPlaces);
      setPlacesError("");
      setPlacesLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setPlacesLoading(true);
      setPlacesError("");
      getPlaces({ search: deferredSearch.trim() || undefined, city: cityFilter || undefined, categoryId: activeCategory || undefined, signal: controller.signal })
        .then((data) => setPlaces(data.map(normalizePlace)))
        .catch((error) => {
          if (error.name !== "AbortError") setPlacesError(error.message);
        })
        .finally(() => {
          if (!controller.signal.aborted) setPlacesLoading(false);
        });
    }, 180);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [activeCategory, catalogPlaces, catalogReady, cityFilter, deferredSearch]);

  useEffect(() => {
    if (view !== "detail" || !detailPlaceId) return undefined;

    const controller = new AbortController();
    setDetailLoading(true);
    setDetailError("");
    getPlace(detailPlaceId, controller.signal)
      .then((data) => setSelectedPlace(normalizePlace(data)))
      .catch((error) => {
        if (error.name !== "AbortError") setDetailError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setDetailLoading(false);
      });

    return () => controller.abort();
  }, [detailPlaceId, view]);

  useEffect(() => {
    if (view !== "detail" || !detailPlaceId) return;
    const knownPlace = catalogPlaces.find((place) => place.id === detailPlaceId);
    if (knownPlace) {
      setSelectedPlace((current) => current?.id === detailPlaceId ? current : knownPlace);
    }
  }, [catalogPlaces, detailPlaceId, view]);

  useEffect(() => {
    if (!session?.token) {
      setFavoriteIds([]);
      setFavorites([]);
      setFavoritesError("");
      return undefined;
    }
    const controller = new AbortController();
    setFavoritesLoading(true);
    getFavorites(controller.signal)
      .then((data) => {
        setFavorites(data);
        setFavoriteIds(data.map((favorite) => favorite.placeId));
        setFavoritesError("");
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          if (error.status === 401) {
            persistSession(null);
            setSession(null);
          } else {
            setFavoritesError(error.message);
          }
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setFavoritesLoading(false);
      });
    return () => controller.abort();
  }, [session]);

  const cities = useMemo(() => [...new Set(catalogPlaces.map((place) => place.city).filter(Boolean))].sort(), [catalogPlaces]);

  function navigate(nextView, options = {}) {
    const nextRoute = {
      view: nextView,
      placeId: nextView === "detail" ? options.placeId || detailPlaceId : null,
      search: nextView === "places" ? options.search ?? search : "",
      city: nextView === "places" ? options.city ?? cityFilter : "",
      categoryId: nextView === "places" ? options.categoryId ?? activeCategory : null,
    };
    const path = buildRoutePath(nextRoute.view, nextRoute);
    const currentPath = `${window.location.pathname}${window.location.search}`;
    if (path !== currentPath) window.history.pushState({}, "", path);
    applyRoute({ valid: true, ...nextRoute });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updatePlacesFilters(nextFilters = {}) {
    const nextValues = {
      search: nextFilters.search ?? search,
      city: nextFilters.city ?? cityFilter,
      categoryId: nextFilters.categoryId === undefined ? activeCategory : nextFilters.categoryId,
    };
    setSearch(nextValues.search);
    setCityFilter(nextValues.city);
    setActiveCategory(nextValues.categoryId || null);
    window.history.replaceState({}, "", buildRoutePath("places", nextValues));
  }

  function chooseCategory(categoryId) {
    navigate("places", { categoryId });
  }

  function resetFilters() {
    updatePlacesFilters({ search: "", city: "", categoryId: null });
  }

  function openPlace(place) {
    setSelectedPlace(place);
    setDetailError("");
    navigate("detail", { placeId: place.id });
  }

  async function toggleFavorite(placeId) {
    if (!session?.token) {
      openAuth();
      return;
    }
    const isCurrentlyFavorite = favoriteIds.includes(placeId);
    const previousFavorites = favorites;
    setAppError("");
    setFavoriteIds((current) => isCurrentlyFavorite ? current.filter((id) => id !== placeId) : [...current, placeId]);
    setFavorites((current) => isCurrentlyFavorite ? current.filter((favorite) => favorite.placeId !== placeId) : current);
    try {
      if (isCurrentlyFavorite) await removeFavorite(placeId);
      else {
        await addFavorite(placeId);
        const place = [...places, ...catalogPlaces].find((item) => item.id === placeId);
        if (place) setFavorites((current) => [{ placeId, name: place.name, city: place.city, mainImageUrl: place.image, createdAt: new Date().toISOString() }, ...current]);
      }
    } catch (error) {
      setFavoriteIds((current) => isCurrentlyFavorite ? [...current, placeId] : current.filter((id) => id !== placeId));
      setFavorites(previousFavorites);
      if (error.status === 401) {
        persistSession(null);
        setSession(null);
      }
      setAppError(error.message);
    }
  }

  async function submitAuth(form) {
    setAuthLoading(true);
    setAuthError("");
    try {
      const result = authMode === "login" ? await login({ email: form.email, password: form.password }) : await register(form);
      persistSession(result);
      setSession(result);
      setShowAuth(false);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  }

  function openAuth() {
    setAuthMode("login");
    setAuthError("");
    setShowAuth(true);
  }

  function logout() {
    persistSession(null);
    setSession(null);
    navigate("home");
  }

  return (
    <div className="min-h-screen bg-night text-sand">
      <Header view={view} session={session} favoriteCount={favoriteIds.length} onNavigate={navigate} onOpenAuth={openAuth} onLogout={logout} />
      {view === "home" && <Home categories={categories} places={places} loading={placesLoading && !catalogReady} activeCategory={activeCategory} onCategory={chooseCategory} onExplore={() => navigate("places")} onOpenPlace={openPlace} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} error={placesError} />}
      {view === "places" && <Explore categories={categories} places={places} loading={placesLoading} error={placesError} search={search} onSearchChange={(value) => updatePlacesFilters({ search: value })} cityFilter={cityFilter} onCityChange={(value) => updatePlacesFilters({ city: value })} cities={cities} activeCategory={activeCategory} onCategory={(value) => updatePlacesFilters({ categoryId: value })} onReset={resetFilters} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} onOpenPlace={openPlace} />}
      {view === "detail" && <Detail place={selectedPlace} loading={detailLoading} error={detailError} onBack={() => navigate("places")} isFavorite={favoriteIds.includes(selectedPlace?.id)} onToggleFavorite={toggleFavorite} />}
      {view === "favorites" && <Favorites session={session} favorites={favorites} loading={favoritesLoading} error={favoritesError || appError} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} onOpenPlace={openPlace} onOpenAuth={openAuth} />}

      <ErrorToast message={view !== "favorites" ? appError : ""} onDismiss={() => setAppError("")} />
      <Footer />

      {showAuth && <AuthModal mode={authMode} onModeChange={(mode) => { setAuthMode(mode); setAuthError(""); }} onClose={() => setShowAuth(false)} onSubmit={submitAuth} loading={authLoading} error={authError} />}
    </div>
  );
}
