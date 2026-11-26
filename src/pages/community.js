import { html } from "@inglorious/web"
import { when } from "@inglorious/web/directives/when"

import { Layout } from "../app/layout/index.js"
import { forLocale, formatDate, pageMeta } from "../common/i18n.js"
import { hackathons } from "../content/hackathons.js"

const PATH = "/community"

const INITIATIVES = [
  {
    title: "Inglorious Forge",
    meta: { en: "Open source", it: "Open source" },
    text: {
      en: "Inglorious Web, SSX, the Inglorious Store and friends: a family of open-source tools for building web apps with simple, predictable, entity-based architecture. This site is built with them.",
      it: "Inglorious Web, SSX, l'Inglorious Store e compagnia: una famiglia di strumenti open source per costruire web app con un'architettura a entità semplice e prevedibile. Questo sito è costruito con loro.",
    },
    links: [
      { label: "inglorious.dev", href: "https://inglorious.dev" },
      {
        label: "GitHub",
        href: "https://github.com/IngloriousCoderz/inglorious-forge",
      },
    ],
  },
  {
    title: "Inglorious Academy",
    meta: {
      en: "Free live-coding school",
      it: "Scuola gratuita di live coding",
    },
    text: {
      en: "Born during the 2020 pandemic: a free, six-month live-coding bootcamp on Twitch teaching HTML, CSS and JavaScript — and the mindset to build a career in IT. Students learn to learn, to question everything (including themselves), and to keep a playful, experimental attitude.",
      it: "Nata durante la pandemia del 2020: un bootcamp gratuito di sei mesi in live coding su Twitch, per insegnare HTML, CSS e JavaScript — e la mentalità giusta per costruirsi una carriera nell'IT. Gli studenti imparano a imparare, a mettere in discussione tutto (anche sé stessi) e a mantenere un approccio giocoso e sperimentale.",
    },
    links: [
      { label: "Twitch", href: "https://twitch.tv/ingloriouscoderz" },
      {
        label: "YouTube",
        href: "https://www.youtube.com/channel/UCBwo1pwwUtGi_BqsDYE03CA",
      },
    ],
  },
  {
    title: "Powercoders",
    meta: { en: "Teaching Lead · 2019–2020", it: "Teaching Lead · 2019–2020" },
    text: {
      en: "Powercoders gives refugees a second chance with a free coding bootcamp followed by a paid internship. For the Italian pilot program we led the teaching: classes, assignments, and a team of volunteer trainers from companies such as IBM and Accenture. Not even COVID-19 could stop it — the last weeks moved online.",
      it: "Powercoders offre ai rifugiati una seconda possibilità con un bootcamp di programmazione gratuito seguito da uno stage retribuito. Nel programma pilota italiano abbiamo guidato la didattica: lezioni, esercitazioni e un team di formatori volontari da aziende come IBM e Accenture. Nemmeno il COVID-19 lo ha fermato — le ultime settimane si sono spostate online.",
    },
    links: [{ label: "powercoders.org", href: "https://powercoders.org/" }],
  },
  {
    title: "Les Jeunes Leaders du Burundi",
    meta: { en: "Volunteering", it: "Volontariato" },
    text: {
      en: "A non-profit founded by a young engineering student from Bujumbura to promote sustainable development and youth employment in Burundi. We remotely supported the association's website and online presence, and connected it with advisors for crowdfunding and design.",
      it: "Un'associazione no profit fondata da un giovane studente di ingegneria di Bujumbura per promuovere lo sviluppo sostenibile e l'occupazione giovanile in Burundi. Abbiamo supportato da remoto il sito e la presenza online dell'associazione, mettendola in contatto con consulenti per crowdfunding e design.",
    },
    links: [],
  },
  {
    title: "Lampedusa Turtle Group",
    meta: { en: "Volunteering", it: "Volontariato" },
    text: {
      en: "Two weeks at the sea turtle rescue center in Lampedusa: cleaning pools and patients, assisting veterinary surgeons, and guiding visitors through the museum to raise awareness about what fishing nets, hooks, plastic and global warming do to these animals.",
      it: "Due settimane al centro di recupero tartarughe marine di Lampedusa: pulizia delle vasche e dei pazienti, assistenza ai chirurghi veterinari e visite guidate al museo per sensibilizzare su ciò che reti da pesca, ami, plastica e riscaldamento globale fanno a questi animali.",
    },
    links: [],
  },
]

const COPY = {
  en: {
    title: "Community & Hackathons | Inglorious Coderz",
    heading: "Community",
    description:
      "Hackathons, open source, free coding schools and volunteering by Inglorious Coderz — including the Byte-Sized Hackathon at SAIT, powered by Inglorious Forge.",
    intro:
      "The purpose of Inglorious Coderz is to build a better world. Code alone won't do it, so we also teach, organize, open-source and volunteer.",
    hackathons: "Hackathons",
    hackathonText:
      "Small teams of 2–4, open to every experience level, one creative challenge and a few hours to explore new tools. Participants vote for the People's Choice Award; the Founder's Choice project is picked by Antony and featured right here, and winners can book a one-on-one tech coaching session.",
    poweredBy: "Powered by Inglorious Forge · organized by",
    announcement: "Announcement",
    founderChoice: "Founder's Choice",
    tbd: "To be announced after the event. Stay tuned!",
    initiatives: "Giving Back",
  },
  it: {
    title: "Community e hackathon | Inglorious Coderz",
    heading: "Community",
    description:
      "Hackathon, open source, scuole di programmazione gratuite e volontariato di Inglorious Coderz — incluso il Byte-Sized Hackathon al SAIT, powered by Inglorious Forge.",
    intro:
      "Lo scopo di Inglorious Coderz è costruire un mondo migliore. Il codice da solo non basta, quindi insegniamo, organizziamo, rilasciamo open source e facciamo volontariato.",
    hackathons: "Hackathon",
    hackathonText:
      "Piccoli team da 2 a 4 persone, aperti a ogni livello di esperienza, una sfida creativa e qualche ora per esplorare nuovi strumenti. I partecipanti votano il People's Choice Award; il progetto Founder's Choice viene scelto da Antony e presentato proprio qui, e i vincitori possono prenotare una sessione individuale di tech coaching.",
    poweredBy: "Powered by Inglorious Forge · organizzato da",
    announcement: "Annuncio",
    founderChoice: "Founder's Choice",
    tbd: "Sarà annunciato dopo l'evento. Restate sintonizzati!",
    initiatives: "Restituire",
  },
}

export const Community = {
  render(entity, api) {
    const { locale } = entity
    const c = forLocale(COPY, locale)

    return Layout.render(
      {
        locale,
        path: PATH,
        content: html`
          <section class="container page">
            <h1 class="page-title">${c.heading}</h1>
            <p class="page-intro">${c.intro}</p>

            <h2>${c.hackathons}</h2>
            ${hackathons.map(
              (event) => html`
                <article class="card highlight hackathon">
                  <p class="card-meta">
                    <time datetime=${event.date}
                      >${formatDate(event.date, locale)}</time
                    >
                    · ${event.time} · ${event.place}
                  </p>
                  <h3>${event.name}</h3>
                  <p>${c.hackathonText}</p>
                  <p class="card-meta">
                    ${c.poweredBy} ${event.organizer} ·
                    <a href=${event.announcement} target="_blank" rel="noopener"
                      >${c.announcement} →</a
                    >
                  </p>

                  <div class="winner">
                    <h4>🏆 ${c.founderChoice}</h4>
                    ${when(
                      event.winner,
                      () => this.renderWinner(event.winner, locale),
                      () => html`<p>${c.tbd}</p>`,
                    )}
                  </div>
                </article>
              `,
            )}

            <h2>${c.initiatives}</h2>
            <div class="cards">
              ${INITIATIVES.map(
                (item) => html`
                  <article class="card">
                    <h3>${item.title}</h3>
                    <p class="card-meta">${forLocale(item.meta, locale)}</p>
                    <p>${forLocale(item.text, locale)}</p>
                    ${when(item.links.length, () => this.renderLinks(item.links))}
                  </article>
                `,
              )}
            </div>
          </section>
        `,
      },
      api,
    )
  },

  renderWinner({ project, team = [], description, links = [] }, locale) {
    return html`
      <p>
        <strong>${project}</strong>${when(
          team.length,
          () => html` — ${team.join(", ")}`,
        )}
      </p>
      ${when(description, () => html`<p>${forLocale(description, locale)}</p>`)}
      ${when(links.length, () => this.renderLinks(links))}
    `
  },

  renderLinks(links) {
    return html`<p class="card-cta">
      ${links.map(
        (link) =>
          html`<a href=${link.href} target="_blank" rel="noopener"
            >${link.label} →</a
          > `,
      )}
    </p>`
  },
}

export const metadata = (entity) => {
  const c = forLocale(COPY, entity.locale)
  return pageMeta({
    path: PATH,
    locale: entity.locale,
    title: c.title,
    description: c.description,
  })
}
