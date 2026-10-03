import { useRef } from "react";
import { personalInfo } from "../data/personal";
import { useIntersectionObserver } from "../hooks/useScroll";

const interests = [
  "Web Development",
  "Full-Stack Development",
  "Software Systems",
  "Networking",
  "Building Practical Applications",
  "Learning New Technologies",
];

const stats = [
  { value: "3+", label: "Projects Built" },
  { value: "4", label: "Tech Categories" },
  { value: "2023", label: "Started Coding" },
  { value: "∞", label: "Curiosity" },
];

export default function About() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 sm:py-32 lg:py-40 grid-bg relative"
      aria-labelledby="about-title"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-4" style={{ background: "var(--color-accent-glow)", color: "var(--color-accent)", border: "1px solid var(--color-accent)/30" }}>
              About Me
            </span>
            <h2 id="about-title" className="section-title text-gradient mb-6">
              Getting to Know Me
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-8">
              {personalInfo.bio}
            </p>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-10">
              I'm currently an IT student at National University - Manila, passionate about creating
              functional and beautiful web applications. My journey started with curiosity about how
              things work on the web, and it's grown into a dedication to building practical solutions
              that make a difference.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-6 text-center transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-gradient-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--color-text-dim)]">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-glow)]"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
            style={{ animationDelay: "200ms" }}
          >
            <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-glow)] to-transparent opacity-50" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--color-accent-glow)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">Currently Focused On</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">Full-Stack Web Development</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-[var(--color-text-dim)] uppercase tracking-wider text-xs">Learning & Exploring</h4>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "Next.js", "Docker", "AWS", "GraphQL", "Testing"].map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "var(--color-accent-glow)", color: "var(--color-accent)", border: "1px solid var(--color-accent)/30" }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                  <h4 className="font-medium text-[var(--color-text-dim)] uppercase tracking-wider text-xs mb-4">Development Setup</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>
                      <span>VS Code</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]"><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M13 6h3a2 2 0 0 1 2 2v7" /><path d="M11 18H8a2 2 0 0 1-2-2V9" /></svg>
                      <span>Git & GitHub</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                      <span>Chrome DevTools</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                      <span>Postman</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl glass flex items-center justify-center hidden lg:block">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-accent)]/50">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}