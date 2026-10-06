import { personalInfo } from "../data/personal";
import { skills } from "../data/skills";

const facts = [
  { label: "Name", value: personalInfo.name },
  { label: "Location", value: personalInfo.location },
  { label: "Studying", value: `${personalInfo.program}, ${personalInfo.school}` },
  { label: "Email", value: personalInfo.email },
];

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

        <div className="about-details">
          <div className="about-block reveal">
            <h3 className="subsection-title">Personal information</h3>
            <dl className="about-facts">
              {facts.map(({ label, value }) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </div>

          <div className="about-block reveal">
            <h3 className="subsection-title">Skills</h3>
            <ul className="chip-list">
              {skills.map(({ name }) => <li key={name} className="chip">{name}</li>)}
            </ul>
          </div>

          <div className="about-block reveal">
            <h3 className="subsection-title">Interests</h3>
            <ul className="chip-list">
              {personalInfo.interests.map((interest) => <li key={interest} className="chip">{interest}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
