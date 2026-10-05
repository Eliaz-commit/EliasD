# Elijah Ashby Dacanay — Portfolio

Personal portfolio built with React and Vite, animated with GSAP and Lenis. The site uses a monochrome palette with one cobalt accent, light and dark themes, responsive layouts, and reduced-motion support.

## Requirements

- Node.js 22.12+ (Vite 8 requirement)
- npm

## Local development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## Deploy to Vercel

Import this repository in Vercel. The project is configured to use Vite; the build command is `npm run build` and the output directory is `dist`. Vercel will publish the generated site after the first deployment.

Link previews use `public/og-image.png`. On Vercel its full URL is filled in automatically; when deploying anywhere else, build with `SITE_URL=https://your-domain.com npm run build`.

## Portfolio content

- Personal details, navigation, resume, and contact form: `src/data/personal.js`
- Project records (including the featured project's case-study notes): `src/data/projects.js`
- Education, timeline, and certificate records: `src/data/journey.js`
- Tech stack shown in the scrolling band: `src/data/skills.js`
- Portrait: `public/elijah-dacanay.jpg`
- Link-preview image: `public/og-image.png`

Still to fill in:

- Project links, screenshots (`image`), and the featured project's `role` and `outcome` in `src/data/projects.js`.
- Certificate details and links in `src/data/journey.js`.
- `public/resume.pdf`: the "Download resume" button appears once the file exists (restart `npm run dev` after adding it).
- Optional: a form endpoint (for example from Formspree) in `contactFormEndpoint` so the message form sends directly instead of opening the visitor's email app.
