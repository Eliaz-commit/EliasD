import { useEffect, useState } from "react";

// True while the user is scrolling down past `offset`; false as soon as they scroll up.
// `tolerance` ignores tiny movements so the nav doesn't flicker. Only re-renders when it flips.
export function useHideOnScroll({ offset = 120, tolerance = 6 } = {}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < tolerance) return;
      setHidden(delta > 0 && y > offset);
      lastY = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, tolerance]);

  return hidden;
}

export function useActiveSection(sectionIds, offset = 100) {
  const [activeId, setActiveId] = useState(sectionIds[0] || "");
  const idsKey = sectionIds.join("|");

  useEffect(() => {
    const ids = idsKey.split("|");
    let sections = [];
    let pageHeight = 0;

    // Section positions only change when the page's size does, so measure them then
    // instead of on every scroll frame (reading layout while scrolling forces reflows).
    const measure = () => {
      sections = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((element) => ({ id: element.id, top: element.getBoundingClientRect().top + window.scrollY }))
        .sort((a, b) => a.top - b.top);
      pageHeight = document.documentElement.scrollHeight;
      update();
    };

    const update = () => {
      if (!sections.length) return;
      const scrollY = window.scrollY;
      const activationLine = scrollY + Math.min(offset, window.innerHeight * 0.35);
      const atPageBottom = window.innerHeight + scrollY >= pageHeight - 2;
      const passed = sections.filter(({ top }) => top <= activationLine);
      const current = atPageBottom ? sections.at(-1) : passed.at(-1) ?? sections[0];
      setActiveId(current.id);
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    measure();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
    };
  }, [idsKey, offset]);

  return activeId;
}
