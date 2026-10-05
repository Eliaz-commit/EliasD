import { personalInfo } from "../data/personal";

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content section-container">
        <div className="hero-intro">
          <p className="hero-eyebrow label">Open to internships</p>
          <h1 id="hero-title">I build full-stack <span>web apps.</span></h1>
          <p className="hero-summary">I’m {personalInfo.name}, an IT student in Manila working across React, Laravel, and MySQL.</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View projects</a>
            <a href="#contact" className="btn">Get in touch</a>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <figure className="hero-portrait">
            <img src="/elijah-dacanay.jpg" alt={`Portrait of ${personalInfo.name}`} width="1212" height="1500" fetchPriority="high" />
          </figure>
        </div>
      </div>
    </section>
  );
}
