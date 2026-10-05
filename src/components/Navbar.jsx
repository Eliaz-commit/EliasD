import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TbArrowRight } from "react-icons/tb";
import { navItems, personalInfo } from "../data/personal";
import { useActiveSection, useHideOnScroll } from "../hooks/useScroll";
import { useTheme } from "../context/ThemeContext";
import { getLenis } from "../lib/smoothScroll";

// Which link each section highlights. "home" and "contact" highlight none.
const linkForSection = Object.fromEntries(
  navItems.flatMap((item) => (item.sections ?? [item.id]).map((section) => [section, item.id]))
);
const trackedSections = ["home", ...Object.keys(linkForSection), "contact"];

export default function Navbar() {
  const hidden = useHideOnScroll();
  const activeLink = linkForSection[useActiveSection(trackedSections)] ?? null;
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const linksRef = useRef(null);
  const indicatorRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  // Slide the highlight pill under the active link.
  useLayoutEffect(() => {
    const indicator = indicatorRef.current;

    const place = () => {
      const link = linksRef.current?.querySelector(`[data-nav-id="${activeLink}"]`);
      const wasVisible = indicator.classList.contains("is-visible");
      indicator.classList.toggle("is-visible", Boolean(link));
      if (!link) return;

      // When it was hidden, appear under the link instead of sliding in from the last spot.
      indicator.classList.toggle("is-instant", !wasVisible);
      indicator.style.setProperty("--x", `${link.offsetLeft}px`);
      indicator.style.setProperty("--w", `${link.offsetWidth}px`);
      if (!wasVisible) {
        void indicator.offsetWidth;
        indicator.classList.remove("is-instant");
      }
    };

    place();
    document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [activeLink]);

  // While the full-screen menu is open: freeze the page behind it and keep focus inside.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const root = document.documentElement;
    const page = [document.querySelector("main"), document.querySelector("footer")];
    const desktop = window.matchMedia("(min-width: 768px)");

    getLenis()?.stop();
    root.classList.add("menu-open");
    page.forEach((element) => { if (element) element.inert = true; });
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector("a")?.focus({ preventScroll: true }));

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const handleDesktop = (event) => { if (event.matches) setMenuOpen(false); };

    window.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleDesktop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleDesktop);
      page.forEach((element) => { if (element) element.inert = false; });
      root.classList.remove("menu-open");
      getLenis()?.start();
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <nav className={`site-nav${hidden && !menuOpen ? " is-hidden" : ""}`} aria-label="Main navigation">
        <div className="site-nav-pill">
          <a className="site-brand" href="#home" aria-label={`${personalInfo.name}, back to top`} onClick={closeMenu}>ED</a>

          <div className="nav-links" ref={linksRef}>
            <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
            {navItems.map((item) => (
              <a
                key={item.id}
                data-nav-id={item.id}
                href={`#${item.id}`}
                className={`nav-link${activeLink === item.id ? " is-active" : ""}`}
                aria-current={activeLink === item.id ? "location" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            className="icon-button nav-theme"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" /></svg>
            )}
          </button>

          <a href="#contact" className="btn btn-primary nav-cta">Get in touch</a>

          <button
            ref={menuButtonRef}
            className="icon-button menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="menu-toggle-lines" aria-hidden="true"><span /><span /></span>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" ref={menuRef} className={`mobile-menu${menuOpen ? " is-open" : ""}`} inert={!menuOpen}>
        <nav className="mobile-menu-links" aria-label="Menu">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mobile-menu-link${activeLink === item.id ? " is-active" : ""}`}
              style={{ "--i": index }}
              aria-current={activeLink === item.id ? "location" : undefined}
              onClick={closeMenu}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="mobile-menu-footer" style={{ "--i": navItems.length }}>
          <a href="#contact" className="btn btn-primary btn-large" onClick={closeMenu}>
            Get in touch <TbArrowRight aria-hidden="true" />
          </a>
          <a className="text-link" href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
        </div>
      </div>
    </header>
  );
}
