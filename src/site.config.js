export default {
  title: "Inglorious Coderz | Quality Software, Quality People",
  favicon: "/icons/favicon.ico",
  meta: {
    viewport: "width=device-width, initial-scale=1.0",
    description:
      "Quality software, quality people. Turin-based software house crafting beautiful solutions with the Inglorious Way. Trusted by Tetra Pak, Heineken, BAT, and the Vatican.",
  },
  styles: ["/styles/fonts.css", "/styles/style.css"],
  scripts: [
    "https://www.googletagmanager.com/gtag/js?id=G-1VTZM56KYZ",
    "/scripts/ga.js",
  ],

  vite: {
    // assetsInclude: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.jpeg"],
    ssr: {
      noExternal: ["@inglorious/logo"], // Force Vite to process this package
    },
  },
};
