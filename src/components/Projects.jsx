import { useState } from "react";
import { featuredProjects, otherProjects, projectArchive } from "../data/projects";
import { useIntersectionObserver } from "../hooks/useScroll";

export default function Projects() {
  const [ref, isVisible] = useIntersectionObserver();
  const [expanded, setExpanded] = useState(false);

  const featured = featuredProjects[0];
  const others = otherProjects;

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 sm:py-32 lg:py-40 grid-bg relative"
      aria-labelledby="projects-title"
    >
      <div className="section-container">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-4" style={{ background: "var(--color-accent-glow)", color: "var(--color-accent)", border: "1px solid var(--color-accent)/30" }}>
            Portfolio
          </span>
          <h2 id="projects-title" className="section-title text-gradient mb-4">
            Featured Projects
          </h2>
          <p className="section-subtitle mx-auto">
            A selection of projects I've built. Each one represents a learning milestone
            and a step forward in my development journey.
          </p>
        </div>

        {featured && (
          <article
            className={`mb-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ animationDelay: "200ms" }}
          >
            <div className="glass-strong rounded-3xl overflow-hidden card-hover">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto min-h-[300px] bg-[var(--color-bg)] flex items-center justify-center">
                  <div className="project-art project-art-featured" aria-hidden="true">
                    <span className="project-art-kicker">FEATURED PROJECT · {featured.year}</span>
                    <span className="project-art-wordmark">{featured.name}</span>
                    <span className="project-art-orbit" />
                    <span className="project-art-caption">{featured.category.toUpperCase()}</span>
                  </div>
                  <div className="absolute top-6 right-6 glass rounded-xl px-3 py-1 text-xs font-medium" style={{ color: "var(--color-accent)", borderColor: "var(--color-accent)/30" }}>
                    Featured
                  </div>
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featured.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "var(--color-accent-glow)", color: "var(--color-accent)", border: "1px solid var(--color-accent)/30" }}>
                        {tech}
                      </span>
                    ))}
                    {featured.technologies.length > 4 && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium text-[var(--color-text-dim)] border" style={{ borderColor: "var(--color-border)" }}>
                        +{featured.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-3">{featured.name}</h3>
                  <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">{featured.description}</p>

                  <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-[var(--color-text-dim)]">
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      {featured.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                      {featured.year}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={featured.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="inline-block mr-2">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      View Code
                    </a>
                    {featured.liveUrl && (
                      <a
                        href={featured.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-2">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ animationDelay: "400ms" }}
        >
          <h3 className="text-xl font-bold text-[var(--color-text)] mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "var(--color-accent-glow)", border: "1px solid var(--color-accent)/30" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
              </svg>
            </span>
            More Projects
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((project, index) => (
              <article
                key={project.id}
                className="glass card-hover rounded-2xl overflow-hidden transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video bg-[var(--color-bg)] relative overflow-hidden">
                  <div className="project-art" aria-hidden="true">
                    <span className="project-art-index">0{index + 2}</span>
                    <span className="project-art-wordmark">{project.name}</span>
                    <span className="project-art-orbit" />
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: "var(--color-accent-glow)", color: "var(--color-accent)", border: "1px solid var(--color-accent)/30" }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-lg font-semibold text-[var(--color-text)]">{project.name}</h4>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{project.description}</p>
                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-dim)] pt-2 border-t" style={{ borderColor: "var(--color-border)" }}>
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-secondary text-center py-2 text-sm"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {projectArchive.length > others.length + 1 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-10 w-full btn-secondary"
            >
              {expanded ? "Show Less" : `Show ${projectArchive.length - others.length - 1} More Projects`}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`inline-block ml-2 transition-transform ${expanded ? "rotate-180" : ""}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}

          {expanded && (
            <div className="mt-8 space-y-4 transition-all duration-300">
              {projectArchive.slice(others.length + 1).map((project) => (
                <div
                  key={project.name}
                  className="glass rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[var(--color-text)] truncate">{project.name}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-[var(--color-text-dim)]">
                      <span>{project.year}</span>
                      <span>•</span>
                      <span>{project.category}</span>
                      <span>•</span>
                      <span className="font-mono">{project.technologies.join(", ")}</span>
                    </div>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary whitespace-nowrap"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
