import { certificates, education, journeyItems } from "../data/journey";

const isRealUrl = (url) => Boolean(url) && !url.startsWith("YOUR_");

// Education, timeline, and certificates in one section (they were three thin sections before).
export default function Background() {
  return (
    <section id="background" className="page-section" aria-labelledby="background-title">
      <div className="section-container">
        <header className="section-heading">
          <h2 id="background-title" className="section-title">Background</h2>
          <p className="section-lede">Where I study, how I got into programming, and the courses I’ve taken.</p>
        </header>

        <div className="background-grid">
          <div className="background-block">
            <h3 className="subsection-title">Education</h3>
            {education.map((edu) => {
              const achievements = edu.achievements.filter((achievement) => !achievement.includes("Placeholder"));

              return (
                <article key={edu.id} className="edu-entry" data-stagger>
                  <div className="edu-main">
                    <p className="meta">{edu.period}</p>
                    <h4>{edu.institution}</h4>
                    <p className="edu-degree">{edu.degree}</p>
                    <p className="edu-desc">{edu.description}</p>
                  </div>

                  <div>
                    <h5 className="minor-heading">Relevant coursework</h5>
                    <ul className="chip-list">
                      {edu.relevantSubjects.map((subject) => <li key={subject} className="chip">{subject}</li>)}
                    </ul>
                  </div>

                  <div>
                    <h5 className="minor-heading">Academic projects</h5>
                    <ul className="plain-list">
                      {edu.projects.map((project) => <li key={project}>{project}</li>)}
                    </ul>
                  </div>

                  {achievements.length > 0 && (
                    <div>
                      <h5 className="minor-heading">Achievements</h5>
                      <ul className="plain-list">
                        {achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="background-block">
            <h3 className="subsection-title">Timeline</h3>
            <div className="timeline-wrap">
              {/* Fills down the timeline as you scroll (see useScrollAnimations). */}
              <span className="timeline-progress" aria-hidden="true" />
              <ol className="timeline">
                {journeyItems.map((item) => (
                  <li key={item.year} className={`timeline-item reveal${item.current ? " is-current" : ""}`}>
                    <p className="timeline-year">{item.year}</p>
                    <div className="timeline-body">
                      <h4>
                        {item.title}
                        {item.current && <span className="timeline-now">Now</span>}
                      </h4>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="background-block background-certificates">
          <h3 className="subsection-title">Certificates</h3>
          <ul className="cert-grid" data-stagger>
            {certificates.map((cert) => (
              <li key={cert.id} className="cert-item">
                <p className="meta">{cert.date}</p>
                <h4>{cert.title}</h4>
                <p className="cert-org">{cert.organization}</p>
                {isRealUrl(cert.url) && (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-link">
                    View certificate <span aria-hidden="true">↗</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
