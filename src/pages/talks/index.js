import { html, nothing } from "@inglorious/web"

import { Layout } from "../../app/layout/index.js"
import { forLocale, localize, pageMeta } from "../../common/i18n.js"
import page from "../../styles/page.module.css"
import styles from "./style.module.css"

const PATH = "/talks"

const TALKS = [
  {
    title: "Web Architectures & Inglorious Forge",
    event: "SAIT · Guest lectures",
    year: "2026",
    kind: { en: "Teaching", it: "Formazione" },
    text: {
      en: "Guest lectures for SAIT students on web architectures — from the fundamentals of rendering and state management to building real apps with Inglorious Forge. The lectures culminate in the Byte-Sized Hackathon.",
      it: "Lezioni da guest lecturer per gli studenti del SAIT sulle architetture web — dai fondamenti di rendering e gestione dello stato fino alla costruzione di app reali con Inglorious Forge. Il percorso culmina nel Byte-Sized Hackathon.",
    },
    links: [
      {
        label: { en: "Byte-Sized Hackathon", it: "Byte-Sized Hackathon" },
        href: "/community",
        isInternal: true,
      },
    ],
  },
  {
    title: "New Technologies",
    event: "European Innovation Academy · Turin",
    year: "2019",
    kind: { en: "Keynote", it: "Keynote" },
    text: {
      en: "Besides acting as Head of Mentors, I gave two speeches to students, teachers and mentors. According to one of the Program Managers, this keynote was “a mix of frontier technologies, memes, gifs and fundamental thoughts about the future – it is captivating, fun and thought-provoking”.",
      it: "Oltre al ruolo di Head of Mentors, ho tenuto due interventi davanti a studenti, docenti e mentor. Secondo uno dei Program Manager, questo keynote è stato “un mix di tecnologie di frontiera, meme, gif e riflessioni fondamentali sul futuro – coinvolgente, divertente e stimolante”.",
    },
    links: [
      {
        label: { en: "Slides", it: "Slide" },
        href: "https://docs.google.com/presentation/d/16i5LKo5tY6aoKUX7xy_9zTUPgw2CMSAnD6arEnTVxyM/",
      },
    ],
  },
  {
    title: "React, The Inglorious Way",
    event: "Codemotion Amsterdam",
    year: "2019",
    kind: { en: "Live coding", it: "Live coding" },
    text: {
      en: "A 40-minute, highly technical live-coding session on the perks and gotchas of common React patterns: Container/Presentational, Higher-Order Components, Render Props, and Hooks.",
      it: "Una sessione di live coding di 40 minuti, molto tecnica, su pregi e insidie dei pattern React più comuni: Container/Presentational, Higher-Order Component, Render Props e Hooks.",
    },
    links: [
      {
        label: { en: "Event", it: "Evento" },
        href: "https://events.codemotion.com/conferences/amsterdam/2019/",
      },
    ],
  },
  {
    title: "Refactoring Into React Hooks",
    event: "Codemotion Rome",
    year: "2019",
    kind: { en: "Live coding", it: "Live coding" },
    text: {
      en: "A 40-minute live-coding talk showing how to turn a codebase into hooks, starting from Class Components, Higher-Order Components, Render Props, the Context API, and more.",
      it: "Un talk di live coding di 40 minuti su come convertire una codebase agli hooks, partendo da Class Component, Higher-Order Component, Render Props, Context API e altro.",
    },
    links: [
      {
        label: { en: "Event", it: "Evento" },
        href: "https://events.codemotion.com/conferences/rome/2019/",
      },
    ],
  },
  {
    title: "CTO Bootcamp: Tech Team Management",
    event: "Codemotion × Facebook",
    year: "2019",
    kind: { en: "Workshop", it: "Workshop" },
    text: {
      en: "A 3.5-hour session in a webinar series on becoming a great CTO: the CTO as technical lead, metrics, software lifecycle, eXtreme Programming and TDD, project management, and license management.",
      it: "Un intervento di 3 ore e mezza in una serie di webinar su come diventare un ottimo CTO: il CTO come leader tecnico, metriche, ciclo di vita del software, eXtreme Programming e TDD, project management e gestione delle licenze.",
    },
    links: [
      {
        label: { en: "Slides", it: "Slide" },
        href: "https://docs.google.com/presentation/d/1ThCBbvSC4Dp53eFf84cqUfytggI7pK_MpQlBFHMJDM8/",
      },
      {
        label: { en: "Review", it: "Recensione" },
        href: "https://www.ryadel.com/en/codemotion-from-developer-to-cto-tech-leadership-training-course-day-one/",
      },
    ],
  },
  {
    title: "Technology 101 For Startupperz",
    event: "European Innovation Academy · Turin, Shenzhen, Doha",
    year: "2018",
    kind: { en: "Keynote", it: "Keynote" },
    text: {
      en: "A 40-minute keynote for aspiring founders, delivered on three continents. The slides are hand-drawn doodles, scanned and composed on Google Slides.",
      it: "Un keynote di 40 minuti per aspiranti founder, portato in tre continenti. Le slide sono scarabocchi disegnati a mano, scansionati e montati su Google Slides.",
    },
    links: [
      {
        label: { en: "Slides", it: "Slide" },
        href: "https://www.slideshare.net/InnovationAcademy/apia2018-antony-mistretta-tech-101",
      },
      {
        label: { en: "Video", it: "Video" },
        href: "https://youtu.be/Ox4k-lSEnFw",
      },
    ],
  },
]

const COPY = {
  en: {
    title: "Talks & Teaching | Inglorious Coderz",
    heading: "Talks & Teaching",
    description:
      "Conference talks, keynotes and lectures by Matteo Antony Mistretta of Inglorious Coderz: Codemotion, European Innovation Academy, Codemotion × Facebook CTO Bootcamp, SAIT.",
    intro:
      "Developing people is as important as developing software. Half of what we do is teaching, mentoring and public speaking: every lesson is a show, where the hardest concepts become easy and fun, and every step is backed by solid theory.",
    trainingTitle: "Training",
    training:
      "Companies and schools such as Codemotion, the European Innovation Academy, Vulog, Powercoders and forma-re-te rely on us for hands-on courses on React, JavaScript, software architecture and engineering practices: we build a complete project step by step, so teams learn what to do, how to do it, and why.",
    ctaText: "Looking for a speaker, a trainer or a workshop for your team?",
    ctaButton: "Get In Touch",
  },
  it: {
    title: "Talk e formazione | Inglorious Coderz",
    heading: "Talk e formazione",
    description:
      "Talk, keynote e lezioni di Matteo Antony Mistretta di Inglorious Coderz: Codemotion, European Innovation Academy, CTO Bootcamp di Codemotion × Facebook, SAIT.",
    intro:
      "Far crescere le persone è importante quanto far crescere il software. Metà di ciò che facciamo è insegnamento, mentoring e public speaking: ogni lezione è uno spettacolo, in cui i concetti più difficili diventano semplici e divertenti, e ogni passo è sostenuto da una solida teoria.",
    trainingTitle: "Formazione",
    training:
      "Aziende e scuole come Codemotion, la European Innovation Academy, Vulog, Powercoders e forma-re-te si affidano a noi per corsi pratici su React, JavaScript, architettura del software e pratiche di ingegneria: costruiamo un progetto completo passo dopo passo, così i team imparano cosa fare, come farlo e perché.",
    ctaText: "Cerchi uno speaker, un formatore o un workshop per il tuo team?",
    ctaButton: "Contattaci",
  },
}

export const Talks = {
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

            <ol class=${styles.timeline}>
              ${TALKS.map(
                (talk) => html`
                  <li class=${page.card}>
                    <p class=${page.cardMeta}>
                      <span class=${page.badge}
                        >${forLocale(talk.kind, locale)}</span
                      >
                      ${talk.event} · ${talk.year}
                    </p>
                    <h3>${talk.title}</h3>
                    <p>${forLocale(talk.text, locale)}</p>
                    <p class=${page.cardCta}>
                      ${talk.links.map(
                        (link) => html`
                          <a
                            href=${link.isInternal ? localize(link.href, locale) : link.href}
                            target=${link.isInternal ? nothing : "_blank"}
                            rel=${link.isInternal ? nothing : "noopener"}
                            >${forLocale(link.label, locale)} →</a
                          >
                        `,
                      )}
                    </p>
                  </li>
                `,
              )}
            </ol>

            <div class=${page.techBadge}>
              <h3>${c.trainingTitle}</h3>
              <p>${c.training}</p>
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
