import "@inglorious/logo/style.css"

import { html } from "@inglorious/web"
import { classMap } from "@inglorious/web/directives/class-map"
import { when } from "@inglorious/web/directives/when"

import { Layout } from "../app/layout/index.js"
import { forLocale, formatDate, localize, pageMeta } from "../common/i18n.js"
import { listPosts } from "../common/posts.js"
import page from "../styles/page.module.css"
import styles from "./index.module.css"

const PATH = "/"
const LATEST_POSTS_COUNT = 3
const CLIENT_LOGO_SIZE = 128

const FEATURED_CLIENTS = [
  {
    name: "Tetra Pak",
    href: "https://www.tetrapak.com/",
    logo: "/logos/tetrapak.png",
  },
  {
    name: "Heineken",
    href: "https://www.heineken.com/",
    logo: "/logos/heineken.png",
  },
  { name: "BAT", href: "https://www.bat.com/", logo: "/logos/bat.svg" },
  {
    name: "Vatican City State",
    href: "https://www.vaticanstate.va/",
    logo: "/logos/vaticano.png",
  },
  {
    name: "Italian Digital Transformation Team",
    href: "https://teamdigitale.governo.it/",
    logo: "/logos/governo.svg",
  },
]

const CLIENTS = [
  { name: "Reply", href: "https://www.reply.com/", logo: "/logos/reply.svg" },
  { name: "SENEC", href: "https://senec.com/", logo: "/logos/senec.svg" },
  {
    name: "European Innovation Academy",
    href: "https://www.inacademy.eu/",
    logo: "/logos/eia.svg",
  },
  {
    name: "Codemotion",
    href: "https://www.codemotion.com/",
    logo: "/logos/codemotion.svg",
  },
  {
    name: "Irion",
    href: "https://www.irion-edm.com/",
    logo: "/logos/irion.webp",
  },
  {
    name: "Nexus LCM",
    href: "https://nexuslcm.com/",
    logo: "/logos/nexus.svg",
  },
  {
    name: "CNOSFAP - Salesiani",
    href: "https://cnosfap.net/",
    logo: "/logos/cnosfap.png",
  },
  {
    name: "Powercoders",
    href: "https://powercoders.org/",
    logo: "/logos/powercoders.svg",
  },
  { name: "Lanieri", href: "https://lanieri.com/", logo: "/logos/lanieri.svg" },
  {
    name: "AltForm",
    href: "https://www.altform.com/",
    logo: "/logos/altform.svg",
  },
  {
    name: "Vedrai",
    href: "https://www.vedrai.com/",
    logo: "/logos/vedrai.svg",
  },
  {
    name: "Fattutto",
    href: "https://www.fattutto.com/",
    logo: "/logos/fattutto.png",
  },
  {
    name: "Kinetikon",
    href: "https://www.kinetikon.com/",
    logo: "/logos/kinetikon.png",
  },
  {
    name: "Alittleb.it",
    href: "https://www.alittleb.it/",
    logo: "/logos/alittlebit.png",
  },
]

const TESTIMONIALS = [
  {
    author: "Savino Carlone",
    role: "Senior Web Developer",
    href: "https://www.linkedin.com/in/savino-carlone-306b0897/",
    quote: {
      en: "You are as expensive as platinum, but you are worth platinum. Truly, working with you is an extraordinary experience — and I have worked with people who are damn good.",
      it: "Sei caro come il platino, ma vali il platino. Lavorare con te è davvero un'esperienza straordinaria — e ti assicuro che ho lavorato con gente dannatamente brava.",
    },
  },
  {
    author: "Davide Dispenza",
    role: "Senior Front End Developer @ Irion",
    quote: {
      en: "His technical ability is surpassed only by his relentless desire to involve and teach: a true example of a technical leader. His method — experimentation, with absolute precision in following best practices and clean code — is still the basis of all my work.",
      it: "La sua abilità tecnica è superata solo dall'incessante desiderio di coinvolgere e insegnare: un vero esempio di leader tecnico. Il suo metodo — sperimentazione, ma con assoluta precisione nel seguire best practice e clean code — è ancora oggi alla base di tutto il mio lavoro.",
    },
  },
  {
    author: "Steven Trinché",
    role: "Front End Developer @ Vulog",
    quote: {
      en: "With a year of experience in Vue.js but none in React, I came out of a 3-day React training with a level even higher than my Vue.js one. The best trainer I have ever seen.",
      it: "Con un anno di esperienza in Vue.js e nessuna in React, sono uscito da un corso di 3 giorni su React con un livello persino superiore a quello che avevo in Vue.js. Il miglior formatore che abbia mai visto.",
    },
  },
]

const COPY = {
  en: {
    title: "Inglorious Coderz | Quality Software, Quality People",
    description:
      "Quality software, quality people. Turin-based software house crafting beautiful solutions with the Inglorious Way. Trusted by Tetra Pak, Heineken, BAT, and the Vatican.",
    tagline: "Quality software, Quality people.",
    subtitle:
      "The industry is drowning in AI-generated code that nobody fully understands, frameworks that age badly, and teams that ship fast but can't maintain what they built. We do the opposite: we craft software with intention, cut what doesn't need to exist, and take responsibility for what we deliver — ensuring your tech stack remains an asset, not a cost center.",
    trustedBy: "Trusted By",
    caseStudies: "Read the case studies",
    way: "The Inglorious Way",
    quote: [
      "“He who works with his hands is a laborer.",
      "He who works with his hands and his head is a craftsman.",
      "He who works with his hands and his head and his heart is an artist.”",
      "— Saint Francis of Assisi",
    ],
    principles: [
      [
        "Lone Wolf & Pack Animal",
        "Autonomous and reliable, we work without waiting for orders. Yet we're highly communicative, knowing how to transmit knowledge and assert our opinions clearly.",
      ],
      [
        "Aggressive & Cold",
        "We stay ahead of market demands, planning solutions that attack the future. Fast but without haste, we make the right decisions at the right time.",
      ],
      [
        "Crazy Dog",
        "Hungry and foolish like Steve Jobs taught us. We're passionate about our work, making it an art and putting all our creativity into it.",
      ],
      [
        "Humble & Ambitious",
        "We know our strengths and use them, but we also know our weaknesses and overcome them with help from more skilled people. We don't complain, we perform.",
      ],
      [
        "Sniper & Ruthless",
        "Speed never compromises accuracy. We write clean, tested code and reduce complex problems to simple solutions through continuous refactoring.",
      ],
      [
        "Pirate & Solid",
        "Result-oriented, we bypass unnecessary bureaucracy. But freedom has limits: we're absolutely transparent, law-abiding, and honest to the bone.",
      ],
      [
        "Extreme & Liquid",
        "We don't compromise on quality or passion. Yet we're flexible, adapting to survive and using change as a weapon in our favor.",
      ],
      [
        "Lightning Fast",
        "As good hackers, we learn and act fast. We quickly find the most relevant information and apply it to the context without hesitation.",
      ],
      [
        "One-Man Army",
        "When you hire us, you get an architect who knows what not to build, a developer who writes less code on purpose, a tester who breaks things before production does, and an engineer who will still understand this codebase in three years.",
      ],
    ],
    whatWeDo: "What We Do",
    services: [
      [
        "Software House",
        "Your codebase is slowing you down. We build software that stays maintainable, performant, and follows industry standards so you're never locked in — yours to own, yours to hand off, yours to scale.",
      ],
      [
        "IT Consulting",
        "Wrong tech choices compound. We help you pick the stack you won't regret, define the architecture patterns your team can actually follow, and flag the traps before you fall into them — so the next team inherits a blueprint, not a mess.",
      ],
      [
        "Tech Leadership",
        "Your team ships features but nobody owns quality. We bring technical direction, standards, and accountability — including helping teams integrate AI without losing control of their architecture.",
      ],
      [
        "Mentoring & Teaching",
        "We train developers to think before they code. Because the industry already has enough people who can generate output.",
      ],
    ],
    badge: (web, ssx) =>
      html`<strong>Built on our own tools.</strong> This site runs on ${web}, a
        framework we wrote from scratch, and ${ssx}, our static site generator.
        We don't recommend tools we haven't used in production ourselves.`,
    founder: "Behind The Code",
    founderText: [
      "Inglorious Coderz was founded and is led by Matteo Antony Mistretta, a.k.a. IceOnFire: software engineer, tech lead, teacher and public speaker, with a career that spans from enterprise Java to modern front-end architectures.",
      "He has spoken at Codemotion in Amsterdam and Rome, was Head of Mentors at the European Innovation Academy, Teaching Lead for the Powercoders refugee coding bootcamp, and is now a guest lecturer on web architectures at SAIT. He is the author of the Inglorious Forge — the open-source framework family behind this very site — and has been studying quantum computing since 2020.",
    ],
    founderLinks: [
      ["/talks", "Talks & teaching"],
      ["/blog", "Writing, including quantum computing"],
      ["/community", "Community & hackathons"],
    ],
    saying: "What People Say",
    beyond: "Beyond The Code",
    latest: "Latest writing",
    allPosts: "All posts",
    talksTitle: "Talks",
    talksText:
      "Codemotion, the European Innovation Academy in Turin, Shenzhen and Doha, the Codemotion × Facebook CTO Bootcamp, and guest lectures at SAIT.",
    talksCta: "See all talks",
    communityTitle: "Byte-Sized Hackathon",
    communityText:
      "December 3rd, 2026 at SAIT — powered by Inglorious Forge. The Founder's Choice project will be featured on this website.",
    communityCta: "Community & hackathons",
    ctaTitle: "Let's Build Something Inglorious",
    ctaButton: "Get In Touch",
    based: "Based in Turin and Rome • Available worldwide",
  },
  it: {
    title: "Inglorious Coderz | Software di qualità, persone di qualità",
    description:
      "Software di qualità, persone di qualità. Software house torinese che crea soluzioni eleganti seguendo l'Inglorious Way. Scelta da Tetra Pak, Heineken, BAT e dal Vaticano.",
    tagline: "Software di qualità, persone di qualità.",
    subtitle:
      "L'industria sta annegando in codice generato dall'AI che nessuno capisce fino in fondo, in framework che invecchiano male e in team che rilasciano in fretta ma non sanno manutenere ciò che hanno costruito. Noi facciamo l'opposto: scriviamo software con intenzione, eliminiamo ciò che non ha motivo di esistere e ci prendiamo la responsabilità di ciò che consegniamo — perché il tuo stack tecnologico resti un patrimonio, non un costo.",
    trustedBy: "Si fidano di noi",
    caseStudies: "Leggi i casi di studio",
    way: "L'Inglorious Way",
    quote: [
      "“Chi lavora con le sue mani è un lavoratore.",
      "Chi lavora con le sue mani e la sua testa è un artigiano.",
      "Chi lavora con le sue mani, la sua testa e il suo cuore è un artista.”",
      "— San Francesco d'Assisi",
    ],
    principles: [
      [
        "Lupo solitario & animale da branco",
        "Autonomi e affidabili, lavoriamo senza aspettare ordini. Ma siamo anche molto comunicativi: sappiamo trasmettere conoscenza e far valere le nostre opinioni con chiarezza.",
      ],
      [
        "Aggressivi & freddi",
        "Anticipiamo le richieste del mercato, progettando soluzioni che vanno incontro al futuro. Veloci ma senza fretta, prendiamo le decisioni giuste al momento giusto.",
      ],
      [
        "Cani pazzi",
        "Affamati e folli, come ci ha insegnato Steve Jobs. Siamo appassionati del nostro lavoro, ne facciamo un'arte e ci mettiamo tutta la nostra creatività.",
      ],
      [
        "Umili & ambiziosi",
        "Conosciamo i nostri punti di forza e li sfruttiamo, ma conosciamo anche le nostre debolezze e le superiamo con l'aiuto di chi è più bravo di noi. Non ci lamentiamo, rendiamo.",
      ],
      [
        "Cecchini & spietati",
        "La velocità non va mai a scapito della precisione. Scriviamo codice pulito e testato, e riduciamo problemi complessi a soluzioni semplici grazie al refactoring continuo.",
      ],
      [
        "Pirati & solidi",
        "Orientati al risultato, scavalchiamo la burocrazia inutile. Ma la libertà ha dei limiti: siamo assolutamente trasparenti, rispettosi della legge e onesti fino al midollo.",
      ],
      [
        "Estremi & liquidi",
        "Non scendiamo a compromessi su qualità e passione. Eppure siamo flessibili: ci adattiamo per sopravvivere e usiamo il cambiamento come un'arma a nostro favore.",
      ],
      [
        "Fulminei",
        "Da bravi hacker, impariamo e agiamo in fretta. Troviamo rapidamente le informazioni più rilevanti e le applichiamo al contesto senza esitazione.",
      ],
      [
        "Esercito di un solo uomo",
        "Quando ci ingaggi, ottieni un architetto che sa cosa non costruire, uno sviluppatore che scrive meno codice di proposito, un tester che rompe le cose prima che lo faccia la produzione e un ingegnere che fra tre anni capirà ancora questo codice.",
      ],
    ],
    whatWeDo: "Cosa facciamo",
    services: [
      [
        "Software House",
        "Il tuo codice ti sta rallentando. Costruiamo software che resta manutenibile, performante e conforme agli standard, così non sei mai legato a noi — tuo da possedere, da passare ad altri, da far crescere.",
      ],
      [
        "Consulenza IT",
        "Le scelte tecnologiche sbagliate si accumulano. Ti aiutiamo a scegliere lo stack di cui non ti pentirai, a definire pattern architetturali che il tuo team possa davvero seguire e a segnalarti le trappole prima che tu ci cada — così il prossimo team eredita un progetto, non un disastro.",
      ],
      [
        "Tech Leadership",
        "Il tuo team rilascia funzionalità ma nessuno è responsabile della qualità. Portiamo direzione tecnica, standard e responsabilità — anche aiutando i team a integrare l'AI senza perdere il controllo dell'architettura.",
      ],
      [
        "Mentoring & formazione",
        "Insegniamo agli sviluppatori a pensare prima di scrivere codice. Perché l'industria ha già abbastanza persone capaci di generare output.",
      ],
    ],
    badge: (web, ssx) =>
      html`<strong>Costruito con i nostri strumenti.</strong> Questo sito gira
        su ${web}, un framework che abbiamo scritto da zero, e su ${ssx}, il
        nostro generatore di siti statici. Non consigliamo strumenti che non
        abbiamo usato noi stessi in produzione.`,
    founder: "Dietro il codice",
    founderText: [
      "Inglorious Coderz è stata fondata ed è guidata da Matteo Antony Mistretta, alias IceOnFire: ingegnere del software, tech lead, docente e speaker, con una carriera che va dal Java enterprise alle moderne architetture front end.",
      "Ha parlato al Codemotion di Amsterdam e di Roma, è stato Head of Mentors alla European Innovation Academy, Teaching Lead del bootcamp di programmazione per rifugiati Powercoders e oggi è guest lecturer di architetture web al SAIT. È l'autore di Inglorious Forge — la famiglia di framework open source su cui gira questo sito — e studia quantum computing dal 2020.",
    ],
    founderLinks: [
      ["/talks", "Talk e formazione"],
      ["/blog", "Articoli, anche sul quantum computing"],
      ["/community", "Community e hackathon"],
    ],
    saying: "Dicono di noi",
    beyond: "Oltre il codice",
    latest: "Ultimi articoli",
    allPosts: "Tutti gli articoli",
    talksTitle: "Talk",
    talksText:
      "Codemotion, la European Innovation Academy a Torino, Shenzhen e Doha, il CTO Bootcamp di Codemotion × Facebook e le lezioni da guest lecturer al SAIT.",
    talksCta: "Tutti i talk",
    communityTitle: "Byte-Sized Hackathon",
    communityText:
      "3 dicembre 2026 al SAIT — powered by Inglorious Forge. Il progetto Founder's Choice sarà presentato su questo sito.",
    communityCta: "Community e hackathon",
    ctaTitle: "Costruiamo qualcosa di Inglorious",
    ctaButton: "Contattaci",
    based: "Con sede a Torino e Roma • Disponibili in tutto il mondo",
  },
}

export const Landing = {
  render(entity, api) {
    const { locale } = entity
    const c = forLocale(COPY, locale)
    const posts = listPosts(locale).filter(
      (_, index) => index < LATEST_POSTS_COUNT,
    )

    return Layout.render(
      {
        locale,
        path: PATH,
        content: html`
          <main class=${styles.heroSection}>
            <section class=${styles.logo}>${api.render("logo")}</section>

            <section class=${styles.hero}>
              <h1><span>INGLORIOUS</span> <span>CODERZ</span></h1>
              <p class=${styles.tagline}>${c.tagline}</p>
              <p class=${styles.subtitle}>${c.subtitle}</p>
            </section>
          </main>

          <section class=${page.container}>
            <h2>${c.trustedBy}</h2>
            <div class=${styles.clients}>
              ${FEATURED_CLIENTS.map((client) => this.renderClient(client, true))}
            </div>
            <div class=${styles.clients}>
              ${CLIENTS.map((client) => this.renderClient(client))}
            </div>
            <p class=${page.sectionCta}>
              <a href=${localize("/work", locale)}>${c.caseStudies} →</a>
            </p>
          </section>

          <section class=${page.container}>
            <h2>${c.way}</h2>
            <p class=${styles.quote}>
              ${c.quote.map(
                (line, i) => html`${when(i, () => html`<br />`)}${line}`,
              )}
            </p>
            <div class=${styles.principles}>
              ${c.principles.map(
                ([title, text]) => html`
                  <div class=${styles.principle}>
                    <h3>${title}</h3>
                    <p>${text}</p>
                  </div>
                `,
              )}
            </div>
          </section>

          <section class=${page.container}>
            <h2>${c.whatWeDo}</h2>
            <div class=${styles.services}>
              ${c.services.map(
                ([title, text]) => html`
                  <div class=${styles.service}>
                    <h3>${title}</h3>
                    <p>${text}</p>
                  </div>
                `,
              )}
            </div>
            <div class=${page.techBadge}>
              <p>
                ${c.badge(
                  html`<a
                    href="https://inglorious.dev/web/"
                    target="_blank"
                    rel="noopener"
                    >Inglorious Web</a
                  >`,
                  html`<a
                    href="https://inglorious.dev/web/advanced/ssx.html"
                    target="_blank"
                    rel="noopener"
                    >Inglorious SSX</a
                  >`,
                )}
              </p>
            </div>
          </section>

          <section class=${page.container} id="founder">
            <h2>${c.founder}</h2>
            <div class=${styles.founder}>
              <div class=${styles.founderText}>
                ${c.founderText.map((p) => html`<p>${p}</p>`)}
              </div>
              <ul class=${styles.founderLinks}>
                ${c.founderLinks.map(
                  ([path, label]) =>
                    html`<li>
                      <a href=${localize(path, locale)}>${label} →</a>
                    </li>`,
                )}
              </ul>
            </div>
          </section>

          <section class=${page.container}>
            <h2>${c.saying}</h2>
            <div class=${styles.testimonials}>
              ${TESTIMONIALS.map(
                ({ author, role, href, quote }) => html`
                  <blockquote class=${styles.testimonial}>
                    <p>${forLocale(quote, locale)}</p>
                    <footer>
                      —
                      ${when(
                        href,
                        () =>
                          html`<a href=${href} target="_blank" rel="noopener"
                            >${author}</a
                          >`,
                        () => author,
                      )},
                      ${role}
                    </footer>
                  </blockquote>
                `,
              )}
            </div>
          </section>

          <section class=${page.container}>
            <h2>${c.beyond}</h2>
            <div class=${page.cards}>
              <article class=${page.card}>
                <h3>${c.latest}</h3>
                <ul class=${styles.latest}>
                  ${posts.map(
                    (post) => html`
                      <li>
                        <a href=${localize(`/blog/${post.slug}`, locale)}
                          >${post.title}</a
                        >
                        <time datetime=${post.date}
                          >${formatDate(post.date, locale)}</time
                        >
                      </li>
                    `,
                  )}
                </ul>
                <p class=${page.cardCta}>
                  <a href=${localize("/blog", locale)}>${c.allPosts} →</a>
                </p>
              </article>

              <article class=${page.card}>
                <h3>${c.talksTitle}</h3>
                <p>${c.talksText}</p>
                <p class=${page.cardCta}>
                  <a href=${localize("/talks", locale)}>${c.talksCta} →</a>
                </p>
              </article>

              <article class="${page.card} ${page.highlight}">
                <h3>${c.communityTitle}</h3>
                <p>${c.communityText}</p>
                <p class=${page.cardCta}>
                  <a href=${localize("/community", locale)}
                    >${c.communityCta} →</a
                  >
                </p>
              </article>
            </div>
          </section>

          <section class=${page.cta}>
            <div class=${page.container}>
              <h2>${c.ctaTitle}</h2>
              <a href="mailto:info@ingloriouscoderz.it" class=${page.ctaButton}
                >${c.ctaButton}</a
              >
              <div class=${styles.contactInfo}>
                <p>${c.based}</p>
                <p>
                  <a href="mailto:info@ingloriouscoderz.it"
                    >info@ingloriouscoderz.it</a
                  >
                </p>
              </div>
            </div>
          </section>
        `,
      },
      api,
    )
  },

  renderClient({ name, href, logo }, isFeatured = false) {
    return html`
      <a
        class=${classMap({
          [styles.client]: true,
          [styles.featured]: isFeatured,
        })}
        href=${href}
        target="_blank"
        rel="noopener"
      >
        <img
          alt=${name}
          src=${logo}
          width=${CLIENT_LOGO_SIZE}
          height=${CLIENT_LOGO_SIZE}
          loading="lazy"
        />
      </a>
    `
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
