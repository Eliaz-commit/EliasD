export const featuredProjects = [
  {
    id: "aconite-restaurant",
    name: "Aconite Restaurant",
    category: "Food & Dining / Full-Stack Web App",
    description: "A group project: a restaurant website where customers order food for delivery, track their order, and book tables, with an admin dashboard for running the restaurant.",
    // What the app lets people do.
    features: [
      "Order food for delivery and track its status",
      "Book a table, with a daily reservation limit set by the admin",
      "Manage orders, reservations, menu availability, and messages from an admin dashboard",
      "See sales stats like revenue and top-selling dishes",
    ],
    // Fill these in to finish the case study; each one stays hidden while it's null.
    // role: what you personally built, e.g. "Built the ordering flow and the Express API in a team of four."
    // outcome: what came of it, e.g. "Presented to our class as the final project for Web Development."
    role: null,
    outcome: null,
    technologies: ["Node.js", "Express", "MongoDB", "JavaScript", "Bootstrap"],
    image: "/aconite-restaurant.png",
    githubUrl: "YOUR_GITHUB_URL",
    liveUrl: null,
    featured: true,
    year: 2026,
  },
  {
    id: "tala",
    name: "TALA",
    category: "Productivity / Full-Stack Web App",
    description: "A group project: a to-do list app where each user sorts tasks into color-coded categories, sets due dates, and sees what's urgent at a glance.",
    // What the app lets people do.
    features: [
      "Sign up, log in, and reset a forgotten password with an expiring code",
      "Organize tasks into default or custom categories with their own icon and color",
      "Set due dates; tasks due today or tomorrow are highlighted",
      "Search tasks or view every task in one list",
    ],
    // Fill these in to finish the case study; each one stays hidden while it's null.
    role: null,
    outcome: null,
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "JavaScript"],
    image: "/tala.png",
    githubUrl: "YOUR_GITHUB_URL",
    liveUrl: null,
    featured: true,
    year: 2026,
  },
];

export const otherProjects = [
  {
    id: "c-link",
    name: "C-Link",
    category: "Transportation / Web System",
    description: "A transportation-focused web system designed to help commuters view transportation information and monitor their booked vehicle.",
    longDescription: "C-Link is a comprehensive transportation web system built to streamline the commuting experience. The platform allows users to view real-time transportation information, book vehicles, and track their booked rides. Built with a modern tech stack featuring React for the frontend and PHP/Laravel for the backend, with MySQL as the database.",
    features: [
      "See real-time transportation information",
      "Book a vehicle",
      "Track a booked ride",
    ],
    technologies: ["React", "PHP", "Laravel", "MySQL", "Tailwind CSS"],
    image: null,
    githubUrl: "YOUR_GITHUB_URL",
    liveUrl: "YOUR_LIVE_URL",
    featured: false,
    year: 2026,
  },
];

export const projectArchive = [
  { name: "C-Link", year: 2026, category: "Transportation", technologies: ["React", "PHP", "MySQL"], url: "YOUR_GITHUB_URL" },
];