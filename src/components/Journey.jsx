import { journeyItems } from "../data/journey";
import { useIntersectionObserver } from "../hooks/useScroll";

export default function Journey() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      id="journey"
      ref={ref}
      className="py-24 sm:py-32 lg:py-40 grid-bg relative"
      aria-labelledby="journey-title"
    >
      <div className="section-container">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-4" style={{ background: "var(--color-accent-glow)", color: "var(--color-accent)", border: "1px solid var(--color-accent)/30" }}>
            Timeline
          </span>
          <h2 id="journey-title" className="section-title text-gradient mb-4">
            Development Journey
          </h2>
          <p className="section-subtitle mx-auto">
            My path from learning the basics to building full-stack applications.
            Every step has been a building block for what comes next.
          </p>
        </div>

        <div
          className={`relative transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ animationDelay: "200ms" }}
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2" style={{ background: "linear-gradient(to bottom, transparent, var(--color-accent), transparent)" }} />
            
            {journeyItems.map((item, index) => (
              <div
                key={item.year}
                className={`relative mb-16 ${index % 2 === 0 ? "pl-20 pr-4" : "pr-20 pl-4"} sm:pl-0 sm:pr-0`}
              >
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 flex items-center justify-center" style={{ 
                  background: item.current ? "var(--color-accent)" : "var(--color-bg-card)",
                  border: item.current ? "none" : "2px solid var(--color-accent)",
                  boxShadow: item.current ? "0 0 20px var(--color-accent-glow-strong)" : "none",
                }}>
                  {item.current && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-bg)" }} />}
                </div>

                <div className="glass-strong rounded-2xl p-6 card-hover relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-medium" style={{ background: "var(--color-accent-glow)", color: "var(--color-accent)", border: "1px solid var(--color-accent)/30" }}>
                      {item.year}
                    </span>
                    {item.current && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium animate-pulse" style={{ background: "var(--color-accent-glow)", color: "var(--color-accent)" }}>
                        Current
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">{item.title}</h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">{item.description}</p>

                  {item.type === "education" && (
                    <div className="mt-4 pt-4 border-t flex flex-wrap gap-2" style={{ borderColor: "var(--color-border)" }}>
                      <span className="px-2 py-1 rounded-full text-xs" style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
                        Education
                      </span>
                    </div>
                  )}
                  {item.type === "learning" && (
                    <div className="mt-4 pt-4 border-t flex flex-wrap gap-2" style={{ borderColor: "var(--color-border)" }}>
                      <span className="px-2 py-1 rounded-full text-xs" style={{ background: "var(--color-accent-glow)", border: "1px solid var(--color-accent)/30", color: "var(--color-accent)" }}>
                        Self-Learning
                      </span>
                    </div>
                  )}
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 top-8 w-2 h-2 rounded-full" style={{ 
                  background: item.current ? "var(--color-accent)" : "var(--color-border)",
                  boxShadow: item.current ? "0 0 10px var(--color-accent-glow-strong)" : "none",
                }} />
              </div>
            ))}

            <div className="glass rounded-2xl p-8 text-center mt-8" style={{ borderColor: "var(--color-accent)/30" }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: "var(--color-accent-glow)", border: "1px solid var(--color-accent)/30" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">The Journey Continues</h3>
              <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
                Always learning, always building. The next chapter is being written right now.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}