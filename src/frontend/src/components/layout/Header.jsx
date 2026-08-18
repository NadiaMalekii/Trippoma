import { memo, useState } from "react";
import { Compass, LogIn, Menu, UserRound, X } from "lucide-react";

function Header({ view, session, favoriteCount, onNavigate, onOpenAuth, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function navigate(nextView) {
    onNavigate(nextView);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-night/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10" aria-label="Main navigation">
        <button type="button" onClick={() => navigate("home")} className="group flex items-center gap-2.5" aria-label="Trippoma home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-night">
            <Compass size={19} />
          </span>
          <span className="font-display text-2xl font-bold tracking-tight text-sand">Trippoma</span>
        </button>

        <div className="hidden items-center gap-7 text-sm md:flex">
          <button type="button" onClick={() => navigate("places")} className={`transition hover:text-gold ${view === "places" ? "text-gold" : "text-sand"}`}>
            Explore
          </button>
          <button type="button" onClick={() => navigate("favorites")} className={`transition hover:text-gold ${view === "favorites" ? "text-gold" : "text-sand"}`}>
            Favorites {favoriteCount > 0 && <span className="font-mono text-[0.65rem]">({favoriteCount})</span>}
          </button>
          {session ? (
            <button type="button" onClick={onLogout} title="Log out" className="flex h-9 w-9 items-center justify-center rounded-full bg-teal font-display font-semibold text-sand transition hover:bg-clay">
              {session.fullName?.trim()?.charAt(0)?.toUpperCase() || <UserRound size={16} />}
            </button>
          ) : (
            <button type="button" onClick={onOpenAuth} className="flex items-center gap-2 rounded-full bg-teal px-4 py-2 text-sm text-sand transition hover:bg-clay">
              <LogIn size={14} /> Log in
            </button>
          )}
        </div>

        <button type="button" onClick={() => setMobileOpen((open) => !open)} className="rounded-lg p-2 text-sand md:hidden" aria-label="Toggle navigation menu" aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-line/80 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1 text-sm">
            <button type="button" onClick={() => navigate("places")} className="rounded-lg px-3 py-3 text-left text-sand hover:bg-surface">Explore</button>
            <button type="button" onClick={() => navigate("favorites")} className="rounded-lg px-3 py-3 text-left text-sand hover:bg-surface">Favorites {favoriteCount > 0 && `(${favoriteCount})`}</button>
            {session ? (
              <button type="button" onClick={() => { onLogout(); setMobileOpen(false); }} className="rounded-lg px-3 py-3 text-left text-sand hover:bg-surface">Log out</button>
            ) : (
              <button type="button" onClick={() => { onOpenAuth(); setMobileOpen(false); }} className="rounded-lg px-3 py-3 text-left text-gold hover:bg-surface">Log in</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default memo(Header);
