import { useEffect, useState } from "react";

const words = ["THINK.", "BUILD.", "FOR PEOPLE."];
const SESSION_KEY = "elijah-portfolio-intro-seen";

function shouldShowIntro() {
  if (typeof window === "undefined") return false;

  try {
    return !window.sessionStorage.getItem(SESSION_KEY)
      && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
}

export default function WordsPreloader({ onComplete }) {
  const [visible, setVisible] = useState(shouldShowIntro);
  const [wordIndex, setWordIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible) {
      onComplete();
      return undefined;
    }

    try {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // The intro still works when session storage is unavailable.
    }

    const timers = words.map((_, index) =>
      window.setTimeout(() => setWordIndex(index), index * 420)
    );
    timers.push(window.setTimeout(() => setExiting(true), words.length * 420));
    timers.push(window.setTimeout(onComplete, words.length * 420 + 380));
    timers.push(window.setTimeout(() => setVisible(false), words.length * 420 + 500));

    return () => timers.forEach(window.clearTimeout);
  }, [visible, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`words-preloader${exiting ? " is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <span className="words-preloader-name">ELIJAH ASHBY DACANAY</span>
      <span key={words[wordIndex]} className="words-preloader-word" aria-hidden="true">
        {words[wordIndex]}
      </span>
      <span className="words-preloader-track" aria-hidden="true">
        <span />
      </span>
    </div>
  );
}
