import { personalInfo } from "../data/personal";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="section-container site-footer-inner">
        <p>© {currentYear} {personalInfo.name}</p>
        <div className="site-footer-links">
          <a className="text-link" href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="text-link" href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="text-link" href={`mailto:${personalInfo.email}`}>Email</a>
          <a className="text-link" href="#home">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
