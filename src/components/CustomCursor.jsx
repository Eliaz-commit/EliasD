import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Things the brackets wrap around when pointed at.
const TARGETS = 'a[href], button:not(:disabled), [role="button"], summary, .tech-chip, [data-cursor="frame"]';
// Over these the native text cursor shows instead, so typing feels normal.
const TEXT_FIELDS = 'input, textarea, [contenteditable="true"]';

const ARM = 10;   // bracket arm length (px), matches .cursor-corner in CSS
const IDLE = 30;  // size of the frame around the pointer when nothing is targeted
const PAD = 7;    // gap between a target's edge and the brackets
const PRESS = 3;  // how far the brackets pinch in while the mouse button is held

const canUseCustomCursor = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function CustomCursor() {
  const [enabled] = useState(canUseCustomCursor);
  const rootRef = useRef(null);
  const accentRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const root = rootRef.current;
    const accent = accentRef.current;
    const layers = [root, accent];
    const setState = (name, on) => layers.forEach((layer) => layer.classList.toggle(name, on));
    const dots = [root.querySelector(".cursor-dot"), accent.querySelector(".cursor-dot")];
    const corners = ["tl", "tr", "bl", "br"].map((name) => root.querySelector(`.cursor-corner-${name}`));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0 : 0.25; // short enough to keep up with the mouse

    // Each corner glides on its own, which gives the frame a slightly elastic feel.
    const move = corners.map((corner) => ({
      x: gsap.quickTo(corner, "x", { duration, ease: "power3.out" }),
      y: gsap.quickTo(corner, "y", { duration, ease: "power3.out" }),
    }));
    const setDotX = gsap.quickSetter(dots, "x", "px");
    const setDotY = gsap.quickSetter(dots, "y", "px");

    let pointerX = -100;
    let pointerY = -100;
    let present = false;
    let pressed = false;
    let snap = true; // place the brackets instantly the first time (and after the pointer re-enters)
    let target = null;
    let needsHitTest = true; // set when the pointer moves or the page scrolls
    let last = ""; // last positions sent to the brackets, to skip identical updates

    document.documentElement.classList.add("has-custom-cursor");

    const handlePointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      needsHitTest = true;
      setDotX(pointerX);
      setDotY(pointerY);
      if (!present) {
        present = true;
        setState("is-visible", true);
      }
    };
    const handleScroll = () => { needsHitTest = true; };
    const handlePointerLeave = (event) => {
      if (event.relatedTarget) return;
      present = false;
      snap = true;
      setState("is-visible", false);
    };
    const handlePointerDown = () => {
      pressed = true;
      needsHitTest = true;
      gsap.to(dots, { scale: 0.5, duration: 0.15 });
    };
    const handlePointerUp = () => {
      pressed = false;
      needsHitTest = true;
      gsap.to(dots, { scale: 1, duration: 0.3, ease: "back.out(3)" });
    };

    // Each frame, but only doing work when something changed: re-check what's under the
    // pointer after it moves or the page scrolls, and while locked, follow the target's box
    // (it can move on its own: marquee chips, Pip). When idle, nothing runs.
    const tick = () => {
      if (!present || (!needsHitTest && !target)) return;

      if (needsHitTest) {
        needsHitTest = false;
        const element = document.elementFromPoint(pointerX, pointerY);
        const overText = Boolean(element?.closest(TEXT_FIELDS));
        target = overText ? null : element?.closest(TARGETS) ?? null;
        setState("is-text", overText);
        setState("is-locked", Boolean(target));
      }

      let left = pointerX - IDLE / 2;
      let top = pointerY - IDLE / 2;
      let right = pointerX + IDLE / 2;
      let bottom = pointerY + IDLE / 2;

      if (target) {
        const rect = target.getBoundingClientRect();
        left = rect.left - PAD;
        top = rect.top - PAD;
        right = rect.right + PAD;
        bottom = rect.bottom + PAD;
      }

      const inset = pressed ? PRESS : 0;
      const positions = [
        [left + inset, top + inset],
        [right - ARM - inset, top + inset],
        [left + inset, bottom - ARM - inset],
        [right - ARM - inset, bottom - ARM - inset],
      ].map(([x, y]) => [Math.round(x * 2) / 2, Math.round(y * 2) / 2]);

      const key = positions.join();
      if (key === last && !snap) return;
      last = key;

      // quickTo(value, start): passing the same start snaps instead of gliding.
      positions.forEach(([x, y], index) => {
        move[index].x(x, snap ? x : undefined);
        move[index].y(y, snap ? y : undefined);
      });
      snap = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("pointerout", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("pointerout", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      gsap.ticker.remove(tick);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  // Two layers: brackets and dot invert against whatever is behind them (mix-blend-mode),
  // while the cobalt dot shown on a target sits on its own layer so it keeps its color.
  return (
    <>
      <div ref={rootRef} className="cursor" aria-hidden="true">
        <span className="cursor-corner cursor-corner-tl" />
        <span className="cursor-corner cursor-corner-tr" />
        <span className="cursor-corner cursor-corner-bl" />
        <span className="cursor-corner cursor-corner-br" />
        <span className="cursor-dot" />
      </div>
      <div ref={accentRef} className="cursor cursor-accent" aria-hidden="true">
        <span className="cursor-dot" />
      </div>
    </>
  );
}
