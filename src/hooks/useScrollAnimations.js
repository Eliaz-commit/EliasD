import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { startSmoothScroll } from "../lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = "expo.out";
const WIPE = "expo.inOut";

// Reveal animations play once, the first time something scrolls into view, and then stay put.
// (Replaying them every time made content vanish and reappear while reading.)
const ONCE = { once: true };

// Scrubbed animations follow the scroll position across an element's whole trip through the viewport.
const across = (trigger, scrub = true) => ({ trigger, start: "top bottom", end: "bottom top", scrub });

function splitLines(target, vars) {
  return SplitText.create(target, {
    type: "lines",
    mask: "lines",
    linesClass: "split-line",
    autoSplit: true,
    onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.1, stagger: 0.09, ease: EASE, ...vars }),
  });
}

function splitWords(target, vars) {
  return SplitText.create(target, {
    type: "words",
    autoSplit: true,
    onSplit: (self) => gsap.from(self.words, { opacity: 0, y: 14, duration: 0.8, stagger: 0.018, ease: EASE, ...vars }),
  });
}

function animateBackground() {
  // The glow drifts on its own (CSS) and also travels as you move down the page.
  const page = { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 1.5 };
  gsap.to(".ambient-orb-1", { xPercent: -45, yPercent: 120, ease: "none", scrollTrigger: page });
  gsap.to(".ambient-orb-2", { xPercent: 50, yPercent: -90, ease: "none", scrollTrigger: page });
  gsap.to(".ambient-orb-3", { xPercent: -30, yPercent: -140, scale: 1.4, ease: "none", scrollTrigger: page });
}

function animateHero() {
  // On load.
  splitLines(".hero-intro h1", { delay: 0.15 });
  gsap.from([".hero-eyebrow", ".hero-summary", ".hero-actions"], {
    opacity: 0, y: 18, duration: 1, stagger: 0.12, delay: 0.35, ease: EASE,
  });
  gsap.fromTo(".hero-portrait", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, delay: 0.1, ease: WIPE });
  gsap.from(".hero-portrait img", { scale: 1.3, duration: 1.8, delay: 0.1, ease: EASE });

  // While scrolling out: layers move at different speeds for depth.
  const out = { trigger: ".hero", start: "top top", end: "bottom top", scrub: true };
  gsap.to(".hero-intro", { yPercent: -22, opacity: 0.15, ease: "none", scrollTrigger: out });
  gsap.to(".hero-portrait-wrap", { yPercent: 16, ease: "none", scrollTrigger: out });
  gsap.to(".hero-grid", { yPercent: 30, ease: "none", scrollTrigger: out });
}

function animateText() {
  gsap.utils.toArray(".section-title").forEach((title) => {
    splitLines(title, { scrollTrigger: { trigger: title, start: "top 88%", ...ONCE } });
  });

  gsap.utils.toArray(".section-lede").forEach((lede) => {
    splitWords(lede, { delay: 0.15, scrollTrigger: { trigger: lede, start: "top 90%", ...ONCE } });
  });

  // About statement: words brighten as you scroll through it, and stay bright afterwards.
  gsap.utils.toArray(".about-lede").forEach((lede) => {
    SplitText.create(lede, {
      type: "words",
      autoSplit: true,
      onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.16 }, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: lede, start: "top 82%", end: "bottom 50%", scrub: true, ...ONCE },
      }),
    });
  });
}

function animateLayout() {
  // Divider lines between sections draw in from the left.
  gsap.utils.toArray(".page-section + .page-section").forEach((section) => {
    gsap.fromTo(section, { "--line-progress": 0 }, {
      "--line-progress": 1, duration: 1.4, ease: WIPE,
      scrollTrigger: { trigger: section, start: "top 92%", ...ONCE },
    });
  });

  // Tech rows drift sideways with the scroll, on top of their own looping motion.
  gsap.utils.toArray(".tech-shift").forEach((row, index) => {
    const [from, to] = index % 2 ? [-220, 0] : [0, -220];
    gsap.fromTo(row, { x: from }, { x: to, ease: "none", scrollTrigger: across(".tech-marquee") });
  });

  // Timeline: the line fills as you read down and each dot lights up as the line reaches it.
  // The line runs from the first dot to the last, and the dots are lit from the line's own
  // position, so they stay in step. It follows the scroll both ways on purpose; it shows where you are.
  gsap.utils.toArray(".timeline-wrap").forEach((wrap) => {
    const line = wrap.querySelector(".timeline-progress");
    const items = gsap.utils.toArray(".timeline-item", wrap);
    const dotY = parseFloat(getComputedStyle(wrap).getPropertyValue("--dot-y"));
    let dots = []; // each dot's centre, measured from the top of the timeline
    let length = 0;

    const measure = () => {
      const top = wrap.getBoundingClientRect().top;
      dots = items.map((item) => item.querySelector(".timeline-body").getBoundingClientRect().top - top + dotY);
      length = dots[dots.length - 1] - dots[0];
      line.style.height = `${length}px`;
    };

    const update = () => {
      // How far down the timeline the reading line (65% down the screen) has reached.
      const reach = window.innerHeight * 0.65 - wrap.getBoundingClientRect().top;
      const filled = gsap.utils.clamp(0, length, reach - dots[0]);
      line.style.transform = `scaleY(${length ? filled / length : 0})`;
      items.forEach((item, i) => item.classList.toggle("is-passed", reach >= dots[i]));
    };

    ScrollTrigger.create({
      trigger: wrap, start: "top bottom", end: "bottom top",
      onUpdate: update,
      onRefresh: () => { measure(); update(); },
    });
  });

  // Containers whose children enter one after another.
  gsap.utils.toArray("[data-stagger]").forEach((container) => {
    gsap.from(container.children, {
      opacity: 0, y: 24, duration: 0.9, stagger: 0.08, ease: EASE,
      scrollTrigger: { trigger: container, start: "top 88%", ...ONCE },
    });
  });

  // Single blocks.
  gsap.set(".reveal", { opacity: 0, y: 28 });
  ScrollTrigger.batch(".reveal", {
    start: "top 90%",
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: EASE, overwrite: true }),
  });
}

export function useScrollAnimations() {
  // Layout effect so starting states are applied before the first paint (no flash of visible content).
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const stopSmoothScroll = startSmoothScroll();

      animateBackground();
      animateHero();
      animateText();
      animateLayout();

      // Web fonts change line lengths and page height, so re-measure once they're in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return stopSmoothScroll;
    });

    return () => mm.revert();
  }, []);
}
