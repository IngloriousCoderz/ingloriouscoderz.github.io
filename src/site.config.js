import { VitePWA } from "vite-plugin-pwa"

import { postsPlugin } from "../plugins/vite-plugin-posts.js"
import { I18N, SITE_URL } from "./common/i18n.js"

const TITLE = "Inglorious Coderz | Quality Software, Quality People"
const DESCRIPTION =
  "Quality software, quality people. Turin-based software house crafting beautiful solutions with the Inglorious Way. Trusted by Tetra Pak, Heineken, BAT, and the Vatican."
const OG_IMAGE = `${SITE_URL}/images/og.png`

/** @type {import('@inglorious/ssx').SiteConfig} */
export default {
  title: TITLE,
  favicon: "/images/logo.png",
  meta: {
    viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
    description: DESCRIPTION,
    "og:type": "website",
    "og:url": SITE_URL,
    "og:title": TITLE,
    "og:description": DESCRIPTION,
    "og:image": OG_IMAGE,
    "og:image:width": "1200",
    "og:image:height": "630",
    "twitter:card": "summary_large_image",
    "twitter:title": TITLE,
    "twitter:description": DESCRIPTION,
    "twitter:image": OG_IMAGE,
  },
  i18n: I18N,

  sitemap: {
    hostname: SITE_URL,
    filter: (page) => !isUtilityPage(page),
  },

  rss: {
    title: "Inglorious Coderz Blog",
    description:
      "Quantum computing, software architecture and the craft of maintainable code.",
    link: SITE_URL,
    feedPath: "/feed.xml",
    language: "en",
    copyright: `© ${new Date().getFullYear()} Inglorious Coderz`,
    // Italian translations live under /it/blog/: the feed is English only.
    filter: (page) => page.path.startsWith("/blog/"),
  },

  vite: {
    css: {
      modules: { localsConvention: "camelCaseOnly" },
    },

    ssr: {
      noExternal: ["@inglorious/logo"],
    },

    plugins: [
      postsPlugin(),
      VitePWA({
        workbox: {
          // A multi-page site: never answer a navigation with the homepage's
          // cached HTML, the plugin's single-page-app default.
          navigateFallback: null,
          // Only the app shell: post chunks and pages are fetched on demand.
          globPatterns: ["**/*.{js,css,woff2}", "index.html", "it/index.html"],
          globIgnores: ["**/{en,it}.*.js", "KaTeX_*"],
        },
        manifest: {
          name: "Inglorious Coderz",
          short_name: "IC",
          theme_color: "#0a0a0a",
          background_color: "#0a0a0a",
          icons: [{ src: "/images/logo.png", sizes: "any" }],
        },
      }),
    ],
  },
}

function isUtilityPage(page) {
  return /^(\/it)?\/og$/.test(page.path)
}
