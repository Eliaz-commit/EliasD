import { useEffect, useRef } from "react";

const RADIUS = 230; // matches the 460px .ambient-spotlight in CSS

export default function CursorGrid() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.38;
    let frame = 0;

    // The circle moves with a transform (GPU-composited, no repaint) and its dots shift the
    // opposite way, so the grid stays anchored to the screen while the circle reveals it.
    // Only the circle's own 460px area repaints, and at most once per frame.
    const render = () => {
      frame = 0;
      spotlight.style.transform = `translate3d(${x - RADIUS}px, ${y - RADIUS}px, 0)`;
      spotlight.style.backgroundPosition = `${RADIUS - x}px ${RADIUS - y}px`;
    };

    const handlePointerMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Orbs: soft glows that drift and travel with the scroll (see useScrollAnimations).
  // ::after is the film grain.
  return (
    <div className="ambient-texture" aria-hidden="true">
      <span className="ambient-orb ambient-orb-1" />
      <span className="ambient-orb ambient-orb-2" />
      <span className="ambient-orb ambient-orb-3" />
      <span ref={spotlightRef} className="ambient-spotlight" />
    </div>
  );
}
