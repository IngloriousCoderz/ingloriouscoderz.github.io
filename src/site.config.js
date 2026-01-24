export default {
  title: "Inglorious Coderz | Quality Software, Quality People",
  meta: {
    viewport: "width=device-width, initial-scale=1.0",
  },
  styles: ["styles/fonts.css", "/styles/style.css"],
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
