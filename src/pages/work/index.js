import { html } from "@inglorious/web"
import { classMap } from "@inglorious/web/directives/class-map"
import { when } from "@inglorious/web/directives/when"

import { Layout } from "../../app/layout/index.js"
import { forLocale, pageMeta } from "../../common/i18n.js"
import page from "../../styles/page.module.css"
import styles from "./style.module.css"

const PATH = "/work"

const CASES = [
  {
    title: "Developers Italia",
    client: "Italian Digital Transformation Team · AgID",
    href: "https://developers.italia.it/",
    stack: ["Website", "Open source community"],
    text: {
      en: [
        "In 2017 the Digital Transformation Team of the Italian Government introduced itself at Codemotion Rome, to show the projects it was building together with AgID and to involve a community of developers and designers in the process.",
        "The main endpoint for that community is developers.italia.it. Working remotely and, on the last day, from the offices of Palazzo Chigi, we helped build the first version of the website in time for the presentation.",
      ],
      it: [
        "Nel 2017 il Team per la Trasformazione Digitale del Governo si è presentato al Codemotion di Roma, per mostrare i progetti che stava realizzando insieme ad AgID e coinvolgere una community di sviluppatori e designer.",
        "Il punto di riferimento di questa community è developers.italia.it. Da remoto e, l'ultimo giorno, dagli uffici di Palazzo Chigi, abbiamo aiutato a costruire la prima versione del sito in tempo per la presentazione.",
      ],
    },
  },
  {
    title: "Tazebao",
    client: "CNOS-FAP Salesiani",
    href: "https://cnosfap.net/",
    stack: ["Vue.js", "Framework7", "Loopback", "Dialogflow"],
    text: {
      en: [
        "To create the best school management system, CNOS-FAP needed someone who could solve the most complex algorithms, guide the architecture, and set the bar for code quality.",
        "The result is an ecosystem of software: a desktop web app in Vue.js, a mobile electronic register in Framework7, a Loopback server, and a Dialogflow bot.",
      ],
      it: [
        "Per realizzare il miglior gestionale scolastico, CNOS-FAP aveva bisogno di qualcuno capace di risolvere gli algoritmi più complessi, guidare l'architettura e alzare l'asticella della qualità del codice.",
        "Il risultato è un ecosistema di software: una web app desktop in Vue.js, un registro elettronico mobile in Framework7, un server Loopback e un bot Dialogflow.",
      ],
    },
  },
  {
    title: "Fattutto",
    client: "Sistemi ICT",
    href: "https://www.fattutto.com/",
    stack: [".NET Core", "React", "CoreUI"],
    text: {
      en: [
        "Sistemi ICT wanted to build the best invoice management system, starting from the right architecture and the right technologies.",
        "Four developers, one of them an Inglorious Coder, met for 29 days and in that time defined the product (features, UX), the project (stack, planning), and an MVP: a .NET Core back end and a React front end. The client then carried on development independently.",
      ],
      it: [
        "Sistemi ICT voleva costruire il miglior gestionale per la fatturazione, partendo dall'architettura giusta e dalle tecnologie giuste.",
        "Quattro sviluppatori, di cui un Inglorious Coder, si sono riuniti per 29 giorni e in questo tempo hanno definito il prodotto (funzionalità, UX), il progetto (stack, pianificazione) e un MVP: back end in .NET Core e front end in React. Il cliente ha poi proseguito lo sviluppo in autonomia.",
      ],
    },
  },
  {
    title: "Lanieri Back Office Platform",
    client: "Protocube · Lanieri",
    href: "https://lanieri.com/",
    stack: ["Vue.js", "Express", "MongoDB"],
    text: {
      en: [
        "Protocube wanted to hire us for a six-month project. We told them they needed us for a lot less. They went with two weeks for a start: after one week the project was ready for production.",
        "A Vue.js web app backed by an Express/MongoDB server with authentication, file upload, and both REST and real-time communication — handed over to the client's developers, who easily kept working on it.",
      ],
      it: [
        "Protocube voleva ingaggiarci per un progetto di sei mesi. Gli abbiamo detto che gliene servivano molti meno. Hanno scelto due settimane per cominciare: dopo una settimana il progetto era pronto per la produzione.",
        "Una web app Vue.js con un server Express/MongoDB, autenticazione, upload di file e comunicazione sia REST sia in tempo reale — consegnata agli sviluppatori del cliente, che hanno continuato a lavorarci senza difficoltà.",
      ],
    },
  },
  {
    title: "React Quiz Game",
    client: "Alittleb.it · Skillato",
    href: "https://www.alittleb.it/",
    stack: ["React", "Storybook"],
    text: {
      en: [
        "Alittleb.it built Skillato, a gamified learning platform. The missing piece was a tournament-based quiz game: blazing fast, responsive, well tested, highly customizable, with shiny animations and happy sounds — in about a dozen days.",
        "We delivered, along with full Storybook documentation. The client was amazed by the quality, the speed, and the extra miles.",
      ],
      it: [
        "Alittleb.it ha creato Skillato, una piattaforma di apprendimento gamificata. Mancava un quiz a tornei: velocissimo, responsive, ben testato, molto personalizzabile, con animazioni scintillanti e suoni allegri — in una dozzina di giorni.",
        "Abbiamo consegnato, insieme a una documentazione completa in Storybook. Il cliente è rimasto colpito dalla qualità, dalla velocità e dai chilometri in più.",
      ],
    },
  },
  {
    title: "Leonardo",
    client: "B-Play",
    stack: ["React", "PWA", "Cordova"],
    text: {
      en: [
        "B-Play urgently needed an app for an exhibition on Leonardo da Vinci's machines. Two days after receiving the mockups we had a React PWA, wrapped with Cordova for the Android and iOS stores.",
        "When the Play Store approval was delayed, the client still had a solid PWA to show: the opening day was a total success.",
      ],
      it: [
        "B-Play aveva bisogno urgente di un'app per una mostra sulle macchine di Leonardo da Vinci. Due giorni dopo aver ricevuto i mockup avevamo una PWA in React, impacchettata con Cordova per gli store Android e iOS.",
        "Quando l'approvazione sul Play Store ha tardato, il cliente aveva comunque una PWA solida da mostrare: il giorno dell'inaugurazione è stato un successo.",
      ],
    },
  },
  {
    title: "EpiCura",
    client: "EpiCura",
    href: "https://www.epicuramed.it/",
    stack: ["Strapi", "REST", "GraphQL"],
    text: {
      en: [
        "EpiCura makes health and social care services more accessible. We chose a headless CMS, Strapi, to quickly build a back end with security, file upload, emails, REST and GraphQL APIs.",
        "While Strapi was moving from alpha to beta we bent it to our needs and contributed back to the open-source project, yielding a stable and performant service.",
      ],
      it: [
        "EpiCura rende più accessibili i servizi sanitari e socio-assistenziali. Abbiamo scelto un CMS headless, Strapi, per costruire rapidamente un back end con sicurezza, upload di file, email, API REST e GraphQL.",
        "Mentre Strapi passava dall'alpha alla beta lo abbiamo adattato alle nostre esigenze e abbiamo contribuito al progetto open source, ottenendo un servizio stabile e performante.",
      ],
    },
  },
  {
    title: "Appointment Selector",
    client: "Milkman",
    stack: ["React", "Storybook"],
    text: {
      en: [
        "Milkman lets you choose when your parcels get delivered. They asked us for a responsive, performant, highly customizable, multi-touch React component to book delivery slots from mobile or desktop.",
        "It's hard to build simple things. After 9 days of constant feedback the component was delivered fully tested, with a Storybook playground.",
      ],
      it: [
        "Milkman ti permette di scegliere quando ricevere i tuoi pacchi. Ci hanno chiesto un componente React responsive, performante, personalizzabile e multi-touch per prenotare la consegna da mobile o desktop.",
        "È difficile costruire cose semplici. Dopo 9 giorni di feedback costante il componente è stato consegnato completamente testato, con un playground in Storybook.",
      ],
    },
  },
  {
    title: "Saving Private Griffe",
    client: "PrivateGriffe",
    stack: ["React", "Loopback", "CoreUI"],
    isFailure: true,
    text: {
      en: [
        "A failure case — and failures teach as much as successes. The startup was on the edge of default because of severe performance issues on its React front end and a heavily bloated Spring back end.",
        "We fixed the most critical performance issues and rebuilt the back end with Loopback and the back office with React. But half the employees left and the controlling company cut costs, and the project stopped there.",
      ],
      it: [
        "Un caso di fallimento — e i fallimenti insegnano quanto i successi. La startup era sull'orlo del default per gravi problemi di performance sul front end React e un back end Spring estremamente appesantito.",
        "Abbiamo risolto i problemi di performance più critici e ricostruito il back end con Loopback e il back office con React. Ma metà dei dipendenti se n'è andata, la controllante ha tagliato i costi e il progetto si è fermato lì.",
      ],
    },
  },
]

const COPY = {
  en: {
    title: "Work | Inglorious Coderz",
    heading: "Work",
    description:
      "Case studies from Inglorious Coderz: government websites, school management systems, invoicing platforms, games and more — including one honest failure.",
    intro:
      "Coding is a craft that mixes creativity and logic. Every project is treated like a creature we raise until it can walk on its own — and then we hand it over. Here are some of the stories behind the logos.",
    failure: "Failure case",
    visit: "Visit",
    ctaText: "Have a project that deserves the same care?",
    ctaButton: "Get In Touch",
  },
  it: {
    title: "Lavori | Inglorious Coderz",
    heading: "Lavori",
    description:
      "Casi di studio di Inglorious Coderz: siti istituzionali, gestionali scolastici, piattaforme di fatturazione, giochi e altro — compreso un onesto fallimento.",
    intro:
      "Programmare è un mestiere artigianale che unisce creatività e logica. Ogni progetto è trattato come una creatura da crescere finché non sa camminare da sola — e poi la consegniamo. Ecco alcune delle storie dietro ai loghi.",
    failure: "Caso di fallimento",
    visit: "Visita",
    ctaText: "Hai un progetto che merita la stessa cura?",
    ctaButton: "Contattaci",
  },
}

export const Work = {
  render(entity, api) {
    const { locale } = entity
    const c = forLocale(COPY, locale)

    return Layout.render(
      {
        locale,
        path: PATH,
        content: html`
          <section class="${page.container} ${page.page}">
            <h1 class=${page.pageTitle}>${c.heading}</h1>
            <p class=${page.pageIntro}>${c.intro}</p>

            <div class=${page.cards}>
              ${CASES.map(
                (item) => html`
                  <article
                    class=${classMap({
                      [page.card]: true,
                      [styles.failure]: item.isFailure,
                    })}
                  >
                    <h3>${item.title}</h3>
                    <p class=${page.cardMeta}>
                      ${item.client}${when(
                        item.isFailure,
                        () =>
                          html` ·
                            <span class=${page.badge}>${c.failure}</span>`,
                      )}
                    </p>
                    ${forLocale(item.text, locale).map((p) => html`<p>${p}</p>`)}
                    <p class=${page.tags}>
                      ${item.stack.map((s) => html`<span class=${page.tag}>${s}</span>`)}
                    </p>
                    ${when(
                      item.href,
                      () =>
                        html`<p class=${page.cardCta}>
                          <a href=${item.href} target="_blank" rel="noopener"
                            >${c.visit} →</a
                          >
                        </p>`,
                    )}
                  </article>
                `,
              )}
            </div>
          </section>

          <section class=${page.cta}>
            <div class=${page.container}>
              <p class=${page.ctaText}>${c.ctaText}</p>
              <a href="mailto:info@ingloriouscoderz.it" class=${page.ctaButton}
                >${c.ctaButton}</a
              >
            </div>
          </section>
        `,
      },
      api,
    )
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
