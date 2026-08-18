import { lazy, startTransition, Suspense, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
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
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ErrorToast from "./components/ui/ErrorToast";
import { normalizePlace } from "./utils/places";
import { buildRoutePath, readRoute } from "./utils/routes";

const Home = lazy(() => import("./components/home/Home"));
const Explore = lazy(() => import("./components/places/Explore"));
const Favorites = lazy(() => import("./components/places/Favorites"));
const Detail = lazy(() => import("./components/places/Detail"));
const LazyAuthModal = lazy(() => import("./components/auth/AuthModal"));

function PageFallback() {
  return (
    <main className="mx-auto grid min-h-[420px] max-w-7xl place-items-center px-5 py-10 sm:px-8 lg:px-10">
      <div className="h-10 w-full max-w-2xl animate-pulse rounded-xl bg-surface" />
    </main>
  );
}

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

  const routeState = useRef({ detailPlaceId, search, cityFilter, activeCategory });
  routeState.current = { detailPlaceId, search, cityFilter, activeCategory };
  const sessionRef = useRef(session);
  sessionRef.current = session;
  const favoriteIdsRef = useRef(favoriteIds);
  favoriteIdsRef.current = favoriteIds;
  const favoritesRef = useRef(favorites);
  favoritesRef.current = favorites;
  const catalogPlacesRef = useRef(catalogPlaces);
  catalogPlacesRef.current = catalogPlaces;

  const favoriteIdSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const applyRoute = useCallback((route) => {
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
  }, []);

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
  }, [applyRoute, initialRoute.valid]);

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
        .then((data) => {
          const normalized = data.map(normalizePlace);
          startTransition(() => setPlaces(normalized));
        })
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

  const navigate = useCallback((nextView, options = {}) => {
    const current = routeState.current;
    const nextRoute = {
      view: nextView,
      placeId: nextView === "detail" ? options.placeId || current.detailPlaceId : null,
      search: nextView === "places" ? options.search ?? current.search : "",
      city: nextView === "places" ? options.city ?? current.cityFilter : "",
      categoryId: nextView === "places" ? options.categoryId ?? current.activeCategory : null,
    };
    const path = buildRoutePath(nextRoute.view, nextRoute);
    const currentPath = `${window.location.pathname}${window.location.search}`;
    if (path !== currentPath) window.history.pushState({}, "", path);
    applyRoute({ valid: true, ...nextRoute });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [applyRoute]);

  const updatePlacesFilters = useCallback((nextFilters = {}) => {
    const current = routeState.current;
    const nextValues = {
      search: nextFilters.search ?? current.search,
      city: nextFilters.city ?? current.cityFilter,
      categoryId: nextFilters.categoryId === undefined ? current.activeCategory : nextFilters.categoryId,
    };
    setSearch(nextValues.search);
    setCityFilter(nextValues.city);
    setActiveCategory(nextValues.categoryId || null);
    window.history.replaceState({}, "", buildRoutePath("places", nextValues));
  }, []);

  const chooseCategory = useCallback((categoryId) => {
    navigate("places", { categoryId });
  }, [navigate]);

  const resetFilters = useCallback(() => {
    updatePlacesFilters({ search: "", city: "", categoryId: null });
  }, [updatePlacesFilters]);

  const openPlace = useCallback((place) => {
    setSelectedPlace(place);
    setDetailError("");
    navigate("detail", { placeId: place.id });
  }, [navigate]);

  const openAuth = useCallback(() => {
    setAuthMode("login");
    setAuthError("");
    setShowAuth(true);
  }, []);

  const toggleFavorite = useCallback(async (placeId) => {
    if (!sessionRef.current?.token) {
      openAuth();
      return;
    }
    const isCurrentlyFavorite = favoriteIdsRef.current.includes(placeId);
    const previousFavorites = favoritesRef.current;
    setAppError("");
    setFavoriteIds((current) => isCurrentlyFavorite ? current.filter((id) => id !== placeId) : [...current, placeId]);
    setFavorites((current) => isCurrentlyFavorite ? current.filter((favorite) => favorite.placeId !== placeId) : current);
    try {
      if (isCurrentlyFavorite) await removeFavorite(placeId);
      else {
        await addFavorite(placeId);
        const place = catalogPlacesRef.current.find((item) => item.id === placeId);
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
  }, [openAuth]);

  const authModeRef = useRef(authMode);
  authModeRef.current = authMode;

  const submitAuth = useCallback(async (form) => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const result = authModeRef.current === "login" ? await login({ email: form.email, password: form.password }) : await register(form);
      persistSession(result);
      setSession(result);
      setShowAuth(false);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const handleAuthModeChange = useCallback((mode) => {
    setAuthMode(mode);
    setAuthError("");
  }, []);

  const logout = useCallback(() => {
    persistSession(null);
    setSession(null);
    navigate("home");
  }, [navigate]);

  const handleSearchChange = useCallback((value) => updatePlacesFilters({ search: value }), [updatePlacesFilters]);
  const handleCityChange = useCallback((value) => updatePlacesFilters({ city: value }), [updatePlacesFilters]);
  const handleCategoryChange = useCallback((value) => updatePlacesFilters({ categoryId: value }), [updatePlacesFilters]);
  const handleExplore = useCallback(() => navigate("places"), [navigate]);
  const handleBackToExplore = useCallback(() => navigate("places"), [navigate]);
  const handleCloseAuth = useCallback(() => setShowAuth(false), []);
  const handleDismissError = useCallback(() => setAppError(""), []);

  return (
    <div className="min-h-screen bg-night text-sand">
      <Header view={view} session={session} favoriteCount={favoriteIds.length} onNavigate={navigate} onOpenAuth={openAuth} onLogout={logout} />
      <Suspense fallback={<PageFallback />}>
        {view === "home" && <Home categories={categories} places={places} loading={placesLoading && !catalogReady} activeCategory={activeCategory} onCategory={chooseCategory} onExplore={handleExplore} onOpenPlace={openPlace} favoriteIdSet={favoriteIdSet} onToggleFavorite={toggleFavorite} error={placesError} />}
        {view === "places" && <Explore categories={categories} places={places} loading={placesLoading} error={placesError} search={search} onSearchChange={handleSearchChange} cityFilter={cityFilter} onCityChange={handleCityChange} cities={cities} activeCategory={activeCategory} onCategory={handleCategoryChange} onReset={resetFilters} favoriteIdSet={favoriteIdSet} onToggleFavorite={toggleFavorite} onOpenPlace={openPlace} />}
        {view === "detail" && <Detail place={selectedPlace} loading={detailLoading} error={detailError} onBack={handleBackToExplore} isFavorite={favoriteIdSet.has(selectedPlace?.id)} onToggleFavorite={toggleFavorite} />}
        {view === "favorites" && <Favorites session={session} favorites={favorites} loading={favoritesLoading} error={favoritesError || appError} favoriteIdSet={favoriteIdSet} onToggleFavorite={toggleFavorite} onOpenPlace={openPlace} onOpenAuth={openAuth} />}
      </Suspense>

      <ErrorToast message={view !== "favorites" ? appError : ""} onDismiss={handleDismissError} />
      <Footer />

      {showAuth && (
        <Suspense fallback={null}>
          <LazyAuthModal mode={authMode} onModeChange={handleAuthModeChange} onClose={handleCloseAuth} onSubmit={submitAuth} loading={authLoading} error={authError} />
        </Suspense>
      )}
    </div>
  );
}
