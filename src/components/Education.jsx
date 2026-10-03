import { education } from "../data/journey";
import { useIntersectionObserver } from "../hooks/useScroll";

export default function Education() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      id="education"
      ref={ref}
      className="py-24 sm:py-32 lg:py-40 grid-bg relative"
      aria-labelledby="education-title"
    >
      <div className="section-container">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-4" style={{ background: "var(--color-accent-glow)", color: "var(--color-accent)", border: "1px solid var(--color-accent)/30" }}>
            Education
          </span>
          <h2 id="education-title" className="section-title text-gradient mb-4">
            Academic Background
          </h2>
          <p className="section-subtitle mx-auto">
            Formal education that laid the foundation for my development journey.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ animationDelay: "200ms" }}
        >
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <article
                key={edu.id}
                className="glass-strong rounded-3xl p-8 relative overflow-hidden card-hover"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10" style={{ background: "var(--color-accent)" }} />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--color-accent-glow)", border: "1px solid var(--color-accent)/30" }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-[var(--color-text)]">{edu.institution}</h3>
                      <p className="text-[var(--color-accent)] font-medium mt-1">{edu.degree}</p>
                      <p className="text-[var(--color-text-dim)] text-sm mt-1">{edu.period}</p>
                    </div>
                  </div>

                  <p className="text-[var(--color-text-muted)] leading-relaxed">{edu.description}</p>

                  <div className="pt-4 border-t space-y-6" style={{ borderColor: "var(--color-border)" }}>
                    <div>
                      <h4 className="font-medium text-[var(--color-text-dim)] uppercase tracking-wider text-xs mb-3">Relevant Coursework</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevantSubjects.map((subject) => (
                          <span key={subject} className="px-3 py-1.5 rounded-xl text-sm" style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-[var(--color-text-dim)] uppercase tracking-wider text-xs mb-3">Academic Projects</h4>
                      <ul className="space-y-2">
                        {edu.projects.map((project) => (
                          <li key={project} className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)] flex-shrink-0">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 8v4l3 3" />
                            </svg>
                            {project}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {edu.achievements.length > 0 && (
                      <div>
                        <h4 className="font-medium text-[var(--color-text-dim)] uppercase tracking-wider text-xs mb-3">Achievements</h4>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement) => (
                            <li key={achievement} className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)] flex-shrink-0">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}