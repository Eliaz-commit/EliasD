const marqueeTexts = [
  "FULL-STACK DEVELOPER",
  "IT STUDENT",
  "WEB DEVELOPER",
  "REACT",
  "LARAVEL",
  "JAVASCRIPT",
  "PHP",
  "MYSQL",
  "TAILWIND CSS",
  "BUILDING DIGITAL EXPERIENCES",
];

export default function Marquee({ className = "", reverse = false, speed = 30 }) {
  const items = [...marqueeTexts, ...marqueeTexts, ...marqueeTexts];

  return (
    <div
      className={`marquee ${className} ${reverse ? "marquee-reverse" : ""}`}
      aria-hidden="true"
      style={{ "--animate-marquee": `marquee ${speed}s linear infinite` }}
    >
      <div className="marquee-content" style={{ animationDuration: `${speed}s` }}>
        {items.map((text, index) => (
          <span
            key={index}
            className="px-6 py-2 font-mono text-xs uppercase tracking-widest opacity-30 hover:opacity-60 transition-opacity duration-300"
            style={{ color: "var(--color-text-muted)" }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}