import { html } from "@inglorious/web"
import { when } from "@inglorious/web/directives/when"

import { forLocale } from "../../common/i18n.js"
import styles from "./style.module.css"

const MESSAGES = {
  en: {
    title: "Your privacy, your choice",
    text: "This site doesn't need any tracking to work. With your permission, we'd like to use Google Analytics to count visits and see which pages are useful. Nothing is loaded until you say yes, and you can change your mind at any time from the footer.",
    policy: "Privacy & cookie policy",
    current: { granted: "Currently accepted.", denied: "Currently rejected." },
    accept: "Accept",
    reject: "Reject",
    close: "Close and reject",
  },
  it: {
    title: "La tua privacy, la tua scelta",
    text: "Questo sito non ha bisogno di alcun tracciamento per funzionare. Con il tuo permesso, vorremmo usare Google Analytics per contare le visite e capire quali pagine sono utili. Nulla viene caricato finché non dici di sì, e puoi cambiare idea in qualsiasi momento dal footer.",
    policy: "Privacy e cookie policy",
    current: {
      granted: "Attualmente accettato.",
      denied: "Attualmente rifiutato.",
    },
    accept: "Accetta",
    reject: "Rifiuta",
    close: "Chiudi e rifiuta",
  },
}

export const template = {
  render(props) {
    return this.renderAnalytics(props)
  },

  renderAnalytics({ locale, consent, policyUrl, onAccept, onReject }) {
    const m = forLocale(MESSAGES, locale)

    // Reject and accept look the same, and closing rejects: no nudging.
    return html`
      <section
        class=${styles.consent}
        role="dialog"
        aria-labelledby="consent-title"
        aria-describedby="consent-text"
      >
        <button
          class=${styles.close}
          type="button"
          aria-label=${m.close}
          @click=${onReject}
        >
          ×
        </button>
        <h2 id="consent-title" class=${styles.title}>${m.title}</h2>
        <p id="consent-text" class=${styles.text}>
          ${m.text} <a href=${policyUrl}>${m.policy}</a>
          ${when(consent, () => html`<em>${m.current[consent]}</em>`)}
        </p>
        <div class=${styles.actions}>
          <button type="button" class=${styles.button} @click=${onReject}>
            ${m.reject}
          </button>
          <button type="button" class=${styles.button} @click=${onAccept}>
            ${m.accept}
          </button>
        </div>
      </section>
    `
  },
}
