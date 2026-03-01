import { VitePWA } from "vite-plugin-pwa";

export default {
  title: "Inglorious Coderz | Quality Software, Quality People",
  favicon: "/images/logo.png",
  meta: {
    viewport: "width=device-width, initial-scale=1.0",
    description:
      "Quality software, quality people. Turin-based software house crafting beautiful solutions with the Inglorious Way. Trusted by Tetra Pak, Heineken, BAT, and the Vatican.",
    "og:type": "website",
    "og:url": "https://ingloriouscoderz.it",
    "og:title": "Inglorious Coderz | Quality Software, Quality People",
    "og:description":
      "Quality software, quality people. Turin-based software house crafting beautiful solutions with the Inglorious Way. Trusted by Tetra Pak, Heineken, BAT, and the Vatican.",
    "og:image": "https://ingloriouscoderz.it/images/og.png",
    "og:image:width": "1200",
    "og:image:height": "628",
    "twitter:card": "summary_large_image",
    "twitter:title": "Inglorious Coderz | Quality Software, Quality People",
    "twitter:description":
      "Quality software, quality people. Turin-based software house crafting beautiful solutions with the Inglorious Way. Trusted by Tetra Pak, Heineken, BAT, and the Vatican.",
    "twitter:image": "https://ingloriouscoderz.it/images/og.png",
  },
  styles: ["/styles/fonts.css", "/styles/style.css"],
  prescripts: [
    "https://embeds.iubenda.com/widgets/f3325768-794c-46d3-ab63-cd01c579deb4.js",
  ],
  scripts: [
    "https://www.googletagmanager.com/gtag/js?id=G-1VTZM56KYZ",
    "/scripts/ga.js",
  ],

  vite: {
    // assetsInclude: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.jpeg"],
    ssr: {
      noExternal: ["@inglorious/logo"], // Force Vite to process this package
    },

    plugins: [
      VitePWA({
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
};
