import { useEffect, useState } from "react";

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, options.threshold, options.rootMargin]);

  return [setElement, isIntersecting];
}

export function useActiveSection(sectionIds, offset = 100) {
  const [activeId, setActiveId] = useState(sectionIds[0] || "");

  useEffect(() => {
    const handleScroll = () => {
      const activationLine = Math.min(offset, window.innerHeight * 0.35);
      const sections = sectionIds
        .map((id) => ({ id, element: document.getElementById(id) }))
        .filter(({ element }) => element)
        .map(({ id, element }) => ({ id, top: element.getBoundingClientRect().top }));

      const currentSection = sections
        .filter(({ top }) => top <= activationLine)
        .sort((a, b) => b.top - a.top)[0];

      const atPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const nextActiveId = atPageBottom
        ? sections.sort((a, b) => b.top - a.top)[0]?.id
        : currentSection?.id || sections.sort((a, b) => a.top - b.top)[0]?.id;

      if (nextActiveId) setActiveId(nextActiveId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds.join("|"), offset]);

  return activeId;
}
