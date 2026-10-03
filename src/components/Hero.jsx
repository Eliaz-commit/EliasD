import { personalInfo, heroTechTags } from "../data/personal";
import Pet from "./Pet";

export default function Hero() {
  return (
    <section id="home" className="hero relative isolate overflow-hidden" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-namewash" aria-hidden="true">
        <div className="hero-namewash-track">
          <span>{personalInfo.name.toUpperCase()}</span>
          <span>{personalInfo.name.toUpperCase()}</span>
        </div>
      </div>

      <div className="hero-content section-container">
        <div className="hero-intro">
          <p className="hero-eyebrow"><span className="hero-live-dot" /> MANILA, PHILIPPINES · OPEN TO OPPORTUNITIES</p>
          <h1 id="hero-title">Building useful things<br /><span>for the PEOPLE.</span></h1>
          <p className="hero-summary">I’m {personalInfo.name}, an IT student and web developer exploring full-stack development and cloud computing.</p>
          <div className="hero-actions">
            <a href="#projects" className="hero-link hero-link-primary">Explore my work <span aria-hidden="true">↗</span></a>
            <a href="#contact" className="hero-link">Get in touch <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <figure className="hero-portrait">
            <img src="/elijah-dacanay.jpg" alt={`Portrait of ${personalInfo.name}`} fetchPriority="high" />
            <figcaption><span>{personalInfo.name.toUpperCase()}</span><span>DEVELOPER · MANILA</span></figcaption>
          </figure>
          <Pet />
        </div>

        <div className="hero-bottomline" aria-label="Technologies">
          <span className="hero-bottom-label">CURRENT TOOLKIT</span>
          <div>{heroTechTags.map((tech) => <span key={tech}>{tech}</span>)}</div>
          <a href="#about" aria-label="Scroll to About section" className="hero-scroll">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}
