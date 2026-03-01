export default {
  title: "Inglorious Coderz | Quality Software, Quality People",
  favicon: "/icons/logo.png",
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

  layout(body, options) {
    const {
      lang = "en",
      charset = "UTF-8",
      title = "",
      favicon = "",
      meta = {},
      styles = [],
      head = "",
      scripts = [],
      isDev,
    } = options;

    return `<!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <script type="text/javascript" src="https://embeds.iubenda.com/widgets/f3325768-794c-46d3-ab63-cd01c579deb4.js"></script>
        <meta charset="${charset}" />
        <title>${title}</title>
        <link rel="icon" type="image/x-icon" href="${favicon}">
        ${Object.entries(meta)
          .map(
            ([name, content]) => `<meta name="${name}" content="${content}">`,
          )
          .join("\n")}
        ${styles
          .map((href) => `<link rel="stylesheet" href="${href}">`)
          .join("\n")}
        ${head}
      </head>
      <body>
        <div id="root">${body}</div>
        ${isDev ? `<script type="module" src="/@vite/client"></script>` : ``}
        <script type="module" src="/main.js"></script>
        ${scripts
          .map((src) => `<script type="module" src="${src}"></script>`)
          .join("\n")}
      </body>
    </html>`;
  },

  vite: {
    // assetsInclude: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.jpeg"],
    ssr: {
      noExternal: ["@inglorious/logo"], // Force Vite to process this package
    },
  },
};
