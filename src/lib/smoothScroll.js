import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis = null;

// The active Lenis instance, or null when smooth scrolling is off (reduced motion).
export const getLenis = () => lenis;

// Same-page links (#projects, #contact, ...) glide with Lenis instead of jumping.
// Runs on document, after React's own click handlers, so a handler can resume
// Lenis (e.g. when closing the mobile menu) before the scroll starts.
function handleAnchorClick(event) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const link = event.target.closest?.('a[href^="#"]');
  const hash = link?.getAttribute("href");
  const target = hash && hash.length > 1 ? document.querySelector(hash) : null;
  if (!target) return;

  event.preventDefault();
  lenis?.start();
  lenis?.scrollTo(target);
  history.replaceState(null, "", hash);
}

export function startSmoothScroll() {
  lenis = new Lenis({ lerp: 0.1, autoRaf: false });
  const instance = lenis;
  const tick = (time) => instance.raf(time * 1000);

  instance.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  document.addEventListener("click", handleAnchorClick);

  return () => {
    document.removeEventListener("click", handleAnchorClick);
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}
