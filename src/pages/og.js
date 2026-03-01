import { html } from "@inglorious/web";
import "@inglorious/logo/style.css";

export const metadata = {
  title: "Inglorious Coderz | OG Image",
};

export const og = {
  render(_, api) {
    return html`
      <div class="og-root">
        <div class="og-logo">${api.render("logo")}</div>

        <div class="og-text">
          <h1 class="og-wordmark">
            <span class="og-word1">INGLORIOUS</span>
            <span class="og-word2">CODERZ</span>
          </h1>
          <p class="og-tagline">Quality Software · Quality People</p>
          <div class="og-divider"></div>
          <p class="og-descriptor">
            Crafting software with <strong>intention</strong>.<br />
            Your tech stack as an asset, not a cost center.
          </p>
        </div>

        <div class="og-domain">ingloriouscoderz.it</div>
      </div>

      <style>
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .og-root {
          width: 1200px;
          height: 630px;
          overflow: hidden;
          background: var(--dark-bg);
          background-image: url(/images/metal-wallpaper.jpg);
          background-position: center;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 80px;
          padding: 0 80px;
          position: relative;
        }

        /* subtle vignette to make text pop */
        .og-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 30%,
            rgba(10, 10, 10, 0.7) 100%
          );
          pointer-events: none;
        }

        .og-logo {
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }

        .og-text {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .og-wordmark {
          font-family: "Ethnocentric";
          font-size: 80px;
          line-height: 1;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .og-word1 {
          background: linear-gradient(to bottom, #999 50%, #666 50%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: none;
        }

        .og-word2 {
          background: linear-gradient(to bottom, #999 50%, #666 50%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: none;
        }

        .og-tagline {
          font-family: "Orbitron";
          font-size: 20px;
          color: var(--heading-color);
          letter-spacing: 3px;
          margin-top: 16px;
          text-transform: uppercase;
        }

        .og-divider {
          width: 60px;
          height: 2px;
          background: var(--neon-cyan);
          box-shadow: 0 0 8px var(--neon-cyan);
          margin: 20px 0;
        }

        .og-descriptor {
          font-family: "Oxanium";
          font-size: 20px;
          color: var(--text-color);
          line-height: 1.6;
        }

        .og-descriptor strong {
          color: var(--neon-cyan);
          text-shadow: 0 0 8px var(--neon-cyan);
        }

        .og-domain {
          position: absolute;
          bottom: 32px;
          right: 80px;
          font-family: "Fira Code", monospace;
          font-size: 14px;
          color: rgba(153, 153, 153, 0.5);
          letter-spacing: 2px;
          z-index: 1;
        }
      </style>
    `;
  },
};
