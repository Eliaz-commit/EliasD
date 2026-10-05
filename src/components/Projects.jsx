import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TbArrowRight, TbX } from "react-icons/tb";
import { featuredProjects, otherProjects, projectArchive } from "../data/projects";
import { getLenis } from "../lib/smoothScroll";

const isRealUrl = (url) => Boolean(url) && !url.startsWith("YOUR_");

const cardProjects = [...featuredProjects, ...otherProjects];
const listedNames = new Set(cardProjects.map((project) => project.name));
const extraProjects = projectArchive.filter((project) => !listedNames.has(project.name));

// Short monogram for cards without a screenshot, e.g. "Academic Management System" -> "AM".
const initials = (name) => name.split(/[\s-]+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();

function ProjectRow({ name, description, technologies, year, url, extra = false }) {
  return (
    <li className={`project-row${extra ? " is-extra" : ""}`}>
      <span className="project-row-year">{year}</span>
      <div>
        <h3>{name}</h3>
        {description && <p>{description}</p>}
      </div>
      <p className="project-row-stack">{technologies.join(", ")}</p>
      {isRealUrl(url) ? (
        <a className="project-row-link text-link" href={url} target="_blank" rel="noopener noreferrer">
          Code <span aria-hidden="true">↗</span>
        </a>
      ) : <span />}
    </li>
  );
}

function ProjectImage({ project }) {
  if (project.image) return <img src={project.image} alt="" loading="lazy" />;
  return (
    <span className="project-card-placeholder" aria-hidden="true">
      <span className="project-card-monogram">{initials(project.name)}</span>
    </span>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card">
      {/* The picture opens the same details as the button; the button is the one screen readers hear. */}
      <div className="project-card-media" onClick={() => onOpen(project)} aria-hidden="true">
        <ProjectImage project={project} />
      </div>
      <div className="project-card-body">
        <p className="meta">{project.year} / {project.category.split(" / ")[0]}</p>
        <h3>{project.name}</h3>
        <p className="project-card-text">{project.description}</p>
        <button type="button" className="btn project-card-btn" onClick={() => onOpen(project)}>
          View details <TbArrowRight aria-hidden="true" />
          <span className="sr-only"> about {project.name}</span>
        </button>
      </div>
    </article>
  );
}

function ProjectDetails({ project, onClose }) {
  return (
    <>
      <button type="button" className="project-dialog-close" onClick={onClose} aria-label="Close" autoFocus>
        <TbX aria-hidden="true" />
      </button>
      <div className="project-dialog-media">
        <ProjectImage project={project} />
      </div>
      <div className="project-dialog-body">
        <p className="meta">{project.year} / {project.category}</p>
        <h3>{project.name}</h3>
        <p className="project-dialog-text">{project.longDescription || project.description}</p>

        {project.features?.length > 0 && (
          <div>
            <h4 className="minor-heading">What it does</h4>
            <ul className="plain-list">
              {project.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
        )}

        {(project.role || project.outcome) && (
          <dl className="case-notes">
            {project.role && <div><dt className="minor-heading">My role</dt><dd>{project.role}</dd></div>}
            {project.outcome && <div><dt className="minor-heading">Outcome</dt><dd>{project.outcome}</dd></div>}
          </dl>
        )}

        <ul className="chip-list" aria-label="Technologies">
          {project.technologies.map((tech) => <li key={tech} className="chip">{tech}</li>)}
        </ul>

        {(isRealUrl(project.githubUrl) || isRealUrl(project.liveUrl)) && (
          <div className="project-feature-links">
            {isRealUrl(project.liveUrl) && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Live demo <span aria-hidden="true">↗</span>
              </a>
            )}
            {isRealUrl(project.githubUrl) && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn">
                View code <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default function Projects() {
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef(null);
  const hasToggled = useRef(false);
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);

  // Open the details as a modal and pause smooth scrolling behind it.
  useEffect(() => {
    if (!selected) return;
    dialogRef.current.showModal();
    dialogRef.current.scrollTop = 0;
    getLenis()?.stop();
    return () => getLenis()?.start();
  }, [selected]);

  // The list changes height when expanded, so scroll positions below it need re-measuring.
  useLayoutEffect(() => {
    if (!hasToggled.current) {
      hasToggled.current = true;
      return;
    }
    if (expanded && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.from(listRef.current.querySelectorAll(".is-extra"), { opacity: 0, y: 20, duration: 0.8, stagger: 0.08, ease: "expo.out" });
    }
    ScrollTrigger.refresh();
  }, [expanded]);

  return (
    <section id="projects" className="page-section" aria-labelledby="projects-title">
      <div className="section-container">
        <header className="section-heading">
          <h2 id="projects-title" className="section-title">Selected projects</h2>
          <p className="section-lede">Things I’ve built while studying, from school systems to personal tools.</p>
        </header>

        <div className="project-grid" data-stagger>
          {cardProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
          ))}
        </div>

        {extraProjects.length > 0 && (
          <>
            {expanded && (
              <ul className="project-list" ref={listRef}>
                {extraProjects.map((project) => (
                  <ProjectRow key={project.name} {...project} extra />
                ))}
              </ul>
            )}
            <button
              type="button"
              className="btn project-more"
              onClick={() => setExpanded((open) => !open)}
              aria-expanded={expanded}
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          </>
        )}

        {/* Clicking the dimmed area outside the panel closes it, like Esc does. */}
        <dialog
          ref={dialogRef}
          className="project-dialog"
          aria-label={selected ? `${selected.name} details` : undefined}
          data-lenis-prevent
          onClose={() => setSelected(null)}
          onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
        >
          {selected && <ProjectDetails project={selected} onClose={() => dialogRef.current.close()} />}
        </dialog>
      </div>
    </section>
  );
}
