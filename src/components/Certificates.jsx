import { certificates } from "../data/journey";
import { useIntersectionObserver } from "../hooks/useScroll";

export default function Certificates() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      id="certificates"
      ref={ref}
      className="py-24 sm:py-32 lg:py-40 grid-bg relative"
      aria-labelledby="certificates-title"
    >
      <div className="section-container">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-4" style={{ background: "var(--color-accent-glow)", color: "var(--color-accent)", border: "1px solid var(--color-accent)/30" }}>
            Certificates
          </span>
          <h2 id="certificates-title" className="section-title text-gradient mb-4">
            Certifications & Learning
          </h2>
          <p className="section-subtitle mx-auto">
            Continuous learning through courses and certifications that have shaped my skills.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ animationDelay: "200ms" }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <article
                key={cert.id}
                className={`glass card-hover rounded-2xl p-6 flex flex-col transition-all duration-300 ${
                  cert.featured ? "border-[var(--color-accent)]/50 relative" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {cert.featured && (
                  <div className="absolute -top-3 -right-3 w-2 h-2 rounded-full" style={{ background: "var(--color-accent)", boxShadow: "0 0 10px var(--color-accent-glow-strong)" }} />
                )}

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--color-accent-glow)", border: "1px solid var(--color-accent)/30" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>

                <h3 className="font-semibold text-[var(--color-text)] mb-2">{cert.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-2">{cert.organization}</p>
                <p className="text-[var(--color-text-dim)] text-xs font-mono mb-4">{cert.date}</p>

                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto btn-secondary text-center text-sm py-2"
                >
                  View Certificate
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block ml-2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}