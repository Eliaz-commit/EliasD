import { useState } from "react";
import { personalInfo } from "../data/personal";
import { useIntersectionObserver } from "../hooks/useScroll";

export default function Contact() {
  const [ref, isVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
    
    setTimeout(() => setStatus("idle"), 3000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 sm:py-32 lg:py-40 grid-bg relative"
      aria-labelledby="contact-title"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="glow-orb"
          style={{
            width: "500px",
            height: "500px",
            top: "-150px",
            right: "-150px",
            background: "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-4" style={{ background: "var(--color-accent-glow)", color: "var(--color-accent)", border: "1px solid var(--color-accent)/30" }}>
              Get in Touch
            </span>
            <h2 id="contact-title" className="section-title text-gradient mb-6">
              Let's build something together.
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-12">
              Have a project idea, collaboration, or just want to connect? Feel free to reach out.
              I'm always open to discussing new opportunities and interesting projects.
            </p>

            <div className="space-y-4 mb-12">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 glass rounded-2xl p-4 card-hover group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--color-accent-glow)", border: "1px solid var(--color-accent)/30" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)] group-hover:scale-110 transition-transform">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-[var(--color-text-dim)] text-sm">Email</p>
                  <p className="text-[var(--color-text)] font-medium group-hover:text-[var(--color-accent)] transition-colors">{personalInfo.email}</p>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass rounded-2xl p-4 card-hover group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[var(--color-text-dim)] text-sm">GitHub</p>
                  <p className="text-[var(--color-text)] font-medium group-hover:text-[var(--color-accent)] transition-colors">github.com/{personalInfo.github.split("/").pop()}</p>
                </div>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass rounded-2xl p-4 card-hover group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--color-accent-glow)", border: "1px solid var(--color-accent)/30" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-accent)]">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[var(--color-text-dim)] text-sm">LinkedIn</p>
                  <p className="text-[var(--color-text)] font-medium group-hover:text-[var(--color-accent)] transition-colors">linkedin.com/in/{personalInfo.linkedin.split("/").pop()}</p>
                </div>
              </a>
            </div>

            <div className="glass rounded-2xl p-6" style={{ borderColor: "var(--color-accent)/30" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--color-accent-glow)", border: "1px solid var(--color-accent)/30" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Availability</h3>
              <p className="text-[var(--color-text-muted)] text-sm">
                Currently open to internships, freelance projects, and collaboration opportunities.
                Typically respond within 24-48 hours.
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ animationDelay: "200ms" }}
          >
            <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8" noValidate>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border bg-[var(--color-bg)] text-[var(--color-text)] placeholder-[var(--color-text-dim)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
                    style={{ borderColor: "var(--color-border)" }}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border bg-[var(--color-bg)] text-[var(--color-text)] placeholder-[var(--color-text-dim)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
                    style={{ borderColor: "var(--color-border)" }}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border bg-[var(--color-bg)] text-[var(--color-text)] placeholder-[var(--color-text-dim)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all resize-none"
                    style={{ borderColor: "var(--color-border)" }}
                    placeholder="What's on your mind?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : status === "success" ? (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block ml-2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}