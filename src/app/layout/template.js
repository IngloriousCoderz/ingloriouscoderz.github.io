import { html, nothing } from "@inglorious/web"

import { forLocale, localize, otherLocale } from "../../common/i18n.js"

const LOGO_SIZE = 32

const NAV = [
  { path: "/work", label: { en: "Work", it: "Lavori" } },
  { path: "/talks", label: { en: "Talks", it: "Talk" } },
  { path: "/blog", label: { en: "Blog", it: "Blog" } },
  { path: "/community", label: { en: "Community", it: "Community" } },
]

const LABELS = {
  en: {
    switchTo: "Leggi in italiano",
    contact: "Contact",
    skip: "Skip to content",
    rss: "RSS feed",
    privacy: "Privacy",
    cookies: "Cookie preferences",
    icy: "Make your own logo",
  },
  it: {
    switchTo: "Read in English",
    contact: "Contatti",
    skip: "Vai al contenuto",
    rss: "Feed RSS",
    privacy: "Privacy",
    cookies: "Preferenze cookie",
    icy: "Crea il tuo logo",
  },
}

export const template = {
  render(props, api) {
    return this.renderLayout(props, api)
  },

  /**
   * @param {Object} props
   * @param {string} props.locale
   * @param {string} props.path - Locale-agnostic path of the page, e.g. "/talks".
   * @param {import("lit-html").TemplateResult} props.content
   * @param {() => void} props.onConsentOpen
   * @param {Object} api - Only to render the consent banner.
   */
  renderLayout(props, api) {
    return html`
      ${this.renderHeader(props)}
      <div id="content">${props.content}</div>
      ${this.renderFooter(props)} ${api.render("analytics")}
    `
  },

  renderHeader({ locale, path }) {
    const labels = forLocale(LABELS, locale)
    const alt = otherLocale(locale)

    return html`
      <header class="site-header">
        <a class="skip-link" href="#content" data-external>${labels.skip}</a>
        <a class="brand" href=${localize("/", locale)}>
          <img
            src="/images/logo.png"
            alt=""
            width=${LOGO_SIZE}
            height=${LOGO_SIZE}
          />
          <span>Inglorious Coderz</span>
        </a>

        <nav aria-label="Main">
          ${NAV.map((item) =>
            this.renderNavItem({
              ...item,
              locale,
              isActive: isActive(path, item.path),
            }),
          )}
          <a href="mailto:info@ingloriouscoderz.it">${labels.contact}</a>
        </nav>

        <a
          class="lang-switch"
          href=${localize(path, alt)}
          hreflang=${alt}
          lang=${alt}
          title=${labels.switchTo}
          >${alt.toUpperCase()}</a
        >
      </header>
    `
  },

  renderNavItem({ path, label, locale, isActive }) {
    return html`<a
      href=${localize(path, locale)}
      class=${isActive ? "active" : nothing}
      aria-current=${isActive ? "page" : "false"}
      >${forLocale(label, locale)}</a
    >`
  },

  renderFooter({ locale, onConsentOpen }) {
    const labels = forLocale(LABELS, locale)

    return html`
      <footer>
        <p class="footer-links">
          <a
            href="https://github.com/IngloriousCoderz"
            target="_blank"
            rel="noopener"
            >GitHub</a
          >
          ·
          <a href="https://inglorious.dev" target="_blank" rel="noopener"
            >inglorious.dev</a
          >
          ·
          <a href="/feed.xml" data-external>${labels.rss}</a>
          ·
          <a href=${localize("/icy", locale)}>${labels.icy}</a>
        </p>
        <p class="footer-links">
          <a href=${localize("/privacy", locale)}>${labels.privacy}</a>
          ·
          <button type="button" class="link-button" @click=${onConsentOpen}>
            ${labels.cookies}
          </button>
        </p>
        <p>INGLORIOUS CODERZ SRL</p>
        <p>Corso Traiano 3, 10135 Torino TO, Italy</p>
        <p>VAT Code IT12862900011</p>
        <p>SdI ROINDUX</p>
        <p>
          PEC
          <a href="mailto:ingloriouscoderz@legalmail.it"
            >ingloriouscoderz@legalmail.it</a
          >
        </p>
      </footer>
    `
  },
}

function isActive(currentPath, itemPath) {
  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`)
}
