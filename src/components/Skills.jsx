import { skillCategories, skillIcons } from "../data/skills";
import { useIntersectionObserver } from "../hooks/useScroll";

export default function Skills() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 sm:py-32 lg:py-40 grid-bg relative"
      aria-labelledby="skills-title"
    >
      <div className="section-container">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-4" style={{ background: "var(--color-accent-glow)", color: "var(--color-accent)", border: "1px solid var(--color-accent)/30" }}>
            Tech Stack
          </span>
          <h2 id="skills-title" className="section-title text-gradient mb-4">
            Technologies & Tools
          </h2>
          <p className="section-subtitle mx-auto">
            Here are the technologies I work with, organized by category. I'm constantly
            expanding this toolkit as I learn and build more projects.
          </p>
        </div>

        <div className="space-y-12">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.category}
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${200 + catIndex * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--color-accent-glow)", border: "1px solid var(--color-accent)/30" }}>
                  {skillIcons[category.icon]}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] tracking-tight">{category.category}</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group card-hover glass rounded-2xl p-6 flex flex-col items-center gap-4 border-transparent hover:border-[var(--color-accent)]"
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}
                    >
                      {skillIcons[skill.icon]}
                    </div>
                    <span className="font-medium text-[var(--color-text)] text-center transition-colors group-hover:text-[var(--color-accent)]">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
