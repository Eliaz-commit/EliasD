import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { existsSync } from 'node:fs'

// The "Download resume" button only appears once public/resume.pdf exists.
// (Restart `npm run dev` after adding the file.)
const hasResume = existsSync(new URL('./public/resume.pdf', import.meta.url))

// Link previews (LinkedIn, Messenger, X) need the full URL of the share image. On Vercel it's
// filled in automatically; anywhere else, build with SITE_URL=https://your-domain.com.
const siteUrl = process.env.SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')

const absoluteShareImage = {
  name: 'absolute-share-image',
  transformIndexHtml: (html) => html.replaceAll('content="/og-image.png"', `content="${siteUrl}/og-image.png"`),
}

export default defineConfig({
  plugins: [react(), tailwindcss(), absoluteShareImage],
  define: {
    __HAS_RESUME__: JSON.stringify(hasResume),
  },
})
