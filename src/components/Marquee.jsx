import {
  SiCss, SiFigma, SiGithub, SiHtml5, SiJavascript, SiLaravel, SiMysql, SiNextdotjs,
  SiNodedotjs, SiNpm, SiPhp, SiReact, SiTailwindcss, SiVercel,
} from "react-icons/si";
import { TbApi, TbBrandVscode } from "react-icons/tb";
import { skills } from "../data/skills";

const icons = {
  html: SiHtml5,
  css: SiCss,
  js: SiJavascript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  php: SiPhp,
  laravel: SiLaravel,
  nodejs: SiNodedotjs,
  api: TbApi,
  mysql: SiMysql,
  npm: SiNpm,
  git: SiGithub,
  vercel: SiVercel,
  vscode: TbBrandVscode,
  figma: SiFigma,
};

// Each row is rendered four times so half the track is always wider than the screen;
// the animation slides it by exactly half, which makes the loop seamless.
const COPIES = 4;

function SkillRow({ items, reverse = false }) {
  return (
    <div className={`tech-row${reverse ? " is-reversed" : ""}`}>
      {/* tech-shift is nudged by scroll position; tech-track loops on its own inside it. */}
      <div className="tech-shift">
        <div className="tech-track">
          {Array.from({ length: COPIES }, (_, copy) => (
            <ul className="tech-group" key={copy} aria-hidden={copy > 0 || undefined}>
              {items.map(({ name, icon }) => {
                const Icon = icons[icon];
                return (
                  <li className="tech-chip" key={name}>
                    {Icon && <Icon aria-hidden="true" />}
                    {name}
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Marquee() {
  const splitAt = Math.ceil(skills.length / 2);

  return (
    <section className="tech-marquee" aria-labelledby="tech-marquee-title">
      <div className="tech-marquee-header section-container">
        <h2 id="tech-marquee-title" className="label">Tech stack</h2>
      </div>
      <SkillRow items={skills.slice(0, splitAt)} />
      <SkillRow items={skills.slice(splitAt)} reverse />
    </section>
  );
}
