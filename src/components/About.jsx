import { personalInfo } from "../data/personal";

export default function About() {
  return (
    <section id="about" className="page-section" aria-labelledby="about-title">
      <div className="section-container">
        <header className="section-heading">
          <h2 id="about-title" className="section-title">A little about me</h2>
        </header>
        <div className="about-layout">
          <p className="about-lede">{personalInfo.bio}</p>
          <p className="about-copy reveal">
            I’m studying Information Technology at National University - Manila. Most of what I’ve built so far started as school projects, like C-Link and an academic management system.
          </p>
        </div>
      </div>
    </section>
  );
}
