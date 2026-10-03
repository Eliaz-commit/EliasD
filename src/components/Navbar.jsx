import { useEffect, useState } from "react";
import { navItems, personalInfo } from "../data/personal";
import { useScrollPosition, useActiveSection } from "../hooks/useScroll";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const scrollY = useScrollPosition();
  const activeId = useActiveSection(navItems.map((item) => item.id));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pendingActiveId, setPendingActiveId] = useState(null);
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      if (pendingActiveId || activeId !== id) setPendingActiveId(id);
      element.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    if (!pendingActiveId) return undefined;

    let settleTimer;
    const settle = () => {
      clearTimeout(settleTimer);
      setPendingActiveId(null);
    };
    const handleScroll = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 250);
    };

    document.addEventListener("scrollend", settle);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(settleTimer);
      document.removeEventListener("scrollend", settle);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pendingActiveId]);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-300 ${
        scrollY > 20 || mobileOpen
          ? "bg-[var(--color-bg-elevated)]/95 backdrop-blur-xl border border-[var(--color-border)] shadow-[var(--shadow-glass)]"
          : "bg-[var(--color-bg)]/75 backdrop-blur-xl border border-white/10"
      } rounded-2xl px-3 sm:px-5 py-2.5`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="font-semibold text-xs tracking-[0.22em] text-[var(--color-text)]" aria-label={`${personalInfo.name} portfolio`}>
          ED<span className="text-[var(--color-accent)]">.</span>
        </div>

        <div
          id="mobile-menu"
          className={`flex items-center gap-1 transition-all duration-300 ${
            mobileOpen ? "absolute inset-x-2 top-[calc(100%+0.5rem)] flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/98 p-3 shadow-[var(--shadow-glass)] md:static md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none" : "hidden md:flex"
          }`}
          role="menubar"
        >
          {navItems.map((item) => (
            // Keep the clicked destination highlighted while smooth scrolling passes
            // through other sections; resume scroll-based tracking when it settles.
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative min-h-11 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                (pendingActiveId || activeId) === item.id
                  ? "text-[var(--color-accent)] bg-[var(--color-accent-glow)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-card)]"
              }`}
              role="menuitem"
              aria-current={(pendingActiveId || activeId) === item.id ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="min-h-11 min-w-11 p-2 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-card)] transition-all duration-300"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={theme === "light"}
          >
            {theme === "dark" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden min-h-11 min-w-11 p-2 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-card)] transition-colors"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
