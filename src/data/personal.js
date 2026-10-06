export const personalInfo = {
  name: "Elijah Ashby Dacanay",
  bio: "I enjoy working across every part of a product, from the interface people use to the data behind it.",
  location: "Manila, Philippines",
  school: "National University - Manila",
  program: "BS Information Technology",
  // Shown as chips in the About section. Edit these to match what you actually enjoy.
  interests: ["Full-stack web development", "Interface design", "Databases", "Networking"],
  email: "delijahashby@gmail.com",
  github: "https://github.com/Eliaz-commit",
  linkedin: "https://www.linkedin.com/in/elijah-ashby-dacanay-bb1700431",
  // The "Download resume" button appears automatically once this file exists in public/
  // (restart `npm run dev` after adding it).
  resume: "/resume.pdf",
  // To have the message form send emails directly (instead of opening the visitor's email
  // app), create a free form at https://formspree.io and paste its endpoint here,
  // e.g. "https://formspree.io/f/abcdwxyz".
  contactFormEndpoint: null,
};

// Listed in the same order the sections appear on the page.
// Contact is reached through the "Get in touch" button instead of a link.
export const navItems = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "background", label: "Background" },
];
