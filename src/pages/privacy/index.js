import { html } from "@inglorious/web"

import { Layout } from "../../app/layout/index.js"
import { forLocale, formatDate, pageMeta } from "../../common/i18n.js"
import page from "../../styles/page.module.css"
import styles from "./style.module.css"

const PATH = "/privacy"
const UPDATED = "2026-11-25"

const CONTROLLER = html`
  <p>
    <strong>Inglorious Coderz S.r.l.</strong><br />
    Corso Traiano 3, 10135 Torino (TO), Italy · VAT IT12862900011<br />
    Email:
    <a href="mailto:info@ingloriouscoderz.it">info@ingloriouscoderz.it</a> ·
    PEC:
    <a href="mailto:ingloriouscoderz@legalmail.it"
      >ingloriouscoderz@legalmail.it</a
    >
  </p>
`

const PROVIDERS = {
  google: externalLink("https://policies.google.com/privacy", "Google"),
  vercel: externalLink("https://vercel.com/legal/privacy-policy", "Vercel"),
  cloudflare: externalLink(
    "https://www.cloudflare.com/privacypolicy/",
    "Cloudflare",
  ),
  garante: externalLink(
    "https://www.garanteprivacy.it/",
    "Garante per la protezione dei dati personali",
  ),
  optout: externalLink(
    "https://tools.google.com/dlpage/gaoptout",
    "Google Analytics Opt-out",
  ),
}

const COPY = {
  en: {
    title: "Privacy & Cookie Policy | Inglorious Coderz",
    heading: "Privacy & Cookie Policy",
    description:
      "How ingloriouscoderz.it handles personal data, cookies and similar technologies.",
    updated: "Last updated",
    preferences: "Change your cookie preferences",
    body: (open) => html`
      <p>
        We keep this short and honest: this site doesn't need to track you to
        work, and anything optional only happens if you say yes.
      </p>

      <h2>Data controller</h2>
      ${CONTROLLER}

      <h2>What we process and why</h2>

      <h3>1. Browsing data</h3>
      <p>
        To deliver the pages, our hosting provider (Vercel Inc.) and our CDN and
        security provider (Cloudflare Inc.) necessarily process technical data
        such as your IP address, browser type, requested pages and time of the
        request. This is required to show you the site and protect it from
        abuse. <strong>Legal basis:</strong> our legitimate interest in
        operating a secure website (Art. 6(1)(f) GDPR). These providers keep
        logs according to their own policies (${PROVIDERS.vercel},
        ${PROVIDERS.cloudflare}).
      </p>

      <h3>2. Audience measurement (only with your consent)</h3>
      <p>
        If you accept, we use Google Analytics 4 (Google Ireland Ltd. / Google
        LLC) to understand how many people visit the site and which pages they
        find useful. Google Analytics collects pseudonymous identifiers stored
        in cookies, the pages you view, and information about your device,
        browser and approximate location; IP addresses are not logged. We don't
        use advertising features: advertising consent signals are always sent as
        denied. Until you accept, the Google Analytics script is not even
        loaded. <strong>Legal basis:</strong> your consent (Art. 6(1)(a) GDPR
        and Art. 122 of the Italian Privacy Code), which you can withdraw at any
        time. <strong>Retention:</strong> no longer than 14 months. See also
        ${PROVIDERS.google}'s policy and the ${PROVIDERS.optout} add-on.
      </p>

      <h3>3. When you write to us</h3>
      <p>
        If you email us, we use your address and whatever you write to reply
        and, if it's about a project, to evaluate and carry out the
        collaboration. <strong>Legal basis:</strong> steps taken at your request
        before entering into a contract, or our legitimate interest in replying
        (Art. 6(1)(b) and (f) GDPR). We keep the correspondence as long as
        needed for these purposes and to meet legal obligations.
      </p>

      <h2>Cookies and similar technologies</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Provider</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ic-consent</code> (local storage)</td>
            <td>Inglorious Coderz</td>
            <td>Strictly necessary: remembers your privacy choices</td>
            <td>6 months</td>
          </tr>
          <tr>
            <td><code>_cfuvid</code>, <code>cf_clearance</code></td>
            <td>Cloudflare</td>
            <td>Strictly necessary: security and bot protection</td>
            <td>Session / 30 minutes</td>
          </tr>
          <tr>
            <td><code>_ga</code>, <code>_ga_*</code></td>
            <td>Google</td>
            <td>
              Measurement, <strong>only with consent</strong>: distinguishes
              visitors and sessions
            </td>
            <td>2 years</td>
          </tr>
          <tr>
            <td>Service worker cache</td>
            <td>Inglorious Coderz</td>
            <td>
              Strictly necessary: stores the site's own files to load faster and
              work offline
            </td>
            <td>Until updated or cleared</td>
          </tr>
        </tbody>
      </table>
      <p>
        You can change your choice at any time with the
        <button type="button" class=${page.linkButton} @click=${open}>
          cookie preferences
        </button>
        (also linked in the footer of every page). Withdrawing consent deletes
        the Google Analytics cookies and stops the measurement. You can also
        block or delete cookies from your browser settings. If you don't make a
        choice, we ask again after 6 months, or sooner if this policy changes
        substantially.
      </p>

      <h2>Transfers outside the EU</h2>
      <p>
        Google, Vercel and Cloudflare may process data in the United States.
        These transfers rely on the EU–US Data Privacy Framework adequacy
        decision, in which these companies participate, and on the European
        Commission's Standard Contractual Clauses.
      </p>

      <h2>Your rights</h2>
      <p>
        Under Articles 15–22 GDPR you can ask us to access, rectify or erase
        your data, restrict or object to its processing, and receive it in a
        portable format; you can withdraw consent at any time without affecting
        the lawfulness of processing based on consent before its withdrawal.
        Write to
        <a href="mailto:info@ingloriouscoderz.it">info@ingloriouscoderz.it</a>.
        You also have the right to lodge a complaint with the
        ${PROVIDERS.garante} or with the supervisory authority of your country.
      </p>
      <p>We don't make automated decisions or create profiles about you.</p>

      <h2>Changes</h2>
      <p>
        We'll update this page if anything changes. When a change affects what
        you consented to, we'll ask for your consent again.
      </p>
    `,
  },
  it: {
    title: "Privacy e Cookie Policy | Inglorious Coderz",
    heading: "Privacy e Cookie Policy",
    description:
      "Come ingloriouscoderz.it tratta i dati personali, i cookie e le tecnologie simili.",
    updated: "Ultimo aggiornamento",
    preferences: "Modifica le preferenze cookie",
    body: (open) => html`
      <p>
        Saremo brevi e onesti: questo sito non ha bisogno di tracciarti per
        funzionare, e tutto ciò che è facoltativo avviene solo se dici di sì.
      </p>

      <h2>Titolare del trattamento</h2>
      ${CONTROLLER}

      <h2>Quali dati trattiamo e perché</h2>

      <h3>1. Dati di navigazione</h3>
      <p>
        Per consegnare le pagine, il nostro fornitore di hosting (Vercel Inc.) e
        il nostro fornitore di CDN e sicurezza (Cloudflare Inc.) trattano
        necessariamente dati tecnici come il tuo indirizzo IP, il tipo di
        browser, le pagine richieste e l'orario della richiesta. È
        indispensabile per mostrarti il sito e proteggerlo da abusi.
        <strong>Base giuridica:</strong> il nostro legittimo interesse a gestire
        un sito sicuro (art. 6, par. 1, lett. f GDPR). Questi fornitori
        conservano i log secondo le proprie policy (${PROVIDERS.vercel},
        ${PROVIDERS.cloudflare}).
      </p>

      <h3>2. Misurazione del pubblico (solo con il tuo consenso)</h3>
      <p>
        Se accetti, usiamo Google Analytics 4 (Google Ireland Ltd. / Google LLC)
        per capire quante persone visitano il sito e quali pagine trovano utili.
        Google Analytics raccoglie identificativi pseudonimi memorizzati nei
        cookie, le pagine che visiti e informazioni su dispositivo, browser e
        posizione approssimativa; gli indirizzi IP non vengono registrati. Non
        usiamo funzionalità pubblicitarie: i segnali di consenso pubblicitario
        vengono sempre inviati come negati. Finché non accetti, lo script di
        Google Analytics non viene nemmeno caricato.
        <strong>Base giuridica:</strong> il tuo consenso (art. 6, par. 1, lett.
        a GDPR e art. 122 del Codice Privacy), che puoi revocare in qualsiasi
        momento. <strong>Conservazione:</strong> non oltre 14 mesi. Vedi anche
        la policy di ${PROVIDERS.google} e il componente ${PROVIDERS.optout}.
      </p>

      <h3>3. Quando ci scrivi</h3>
      <p>
        Se ci scrivi via email, usiamo il tuo indirizzo e ciò che scrivi per
        risponderti e, se si tratta di un progetto, per valutare e svolgere la
        collaborazione. <strong>Base giuridica:</strong> misure precontrattuali
        adottate su tua richiesta, o il nostro legittimo interesse a risponderti
        (art. 6, par. 1, lett. b e f GDPR). Conserviamo la corrispondenza per il
        tempo necessario a questi scopi e agli obblighi di legge.
      </p>

      <h2>Cookie e tecnologie simili</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Fornitore</th>
            <th>Finalità</th>
            <th>Durata</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ic-consent</code> (local storage)</td>
            <td>Inglorious Coderz</td>
            <td>
              Strettamente necessario: ricorda le tue scelte sulla privacy
            </td>
            <td>6 mesi</td>
          </tr>
          <tr>
            <td><code>_cfuvid</code>, <code>cf_clearance</code></td>
            <td>Cloudflare</td>
            <td>Strettamente necessari: sicurezza e protezione dai bot</td>
            <td>Sessione / 30 minuti</td>
          </tr>
          <tr>
            <td><code>_ga</code>, <code>_ga_*</code></td>
            <td>Google</td>
            <td>
              Misurazione, <strong>solo con consenso</strong>: distingue
              visitatori e sessioni
            </td>
            <td>2 anni</td>
          </tr>
          <tr>
            <td>Cache del service worker</td>
            <td>Inglorious Coderz</td>
            <td>
              Strettamente necessaria: conserva i file del sito per caricarlo
              più in fretta e offline
            </td>
            <td>Fino ad aggiornamento o cancellazione</td>
          </tr>
        </tbody>
      </table>
      <p>
        Puoi cambiare la tua scelta in qualsiasi momento dalle
        <button type="button" class=${page.linkButton} @click=${open}>
          preferenze cookie
        </button>
        (presenti anche nel footer di ogni pagina). Revocando il consenso, i
        cookie di Google Analytics vengono cancellati e la misurazione si
        interrompe. Puoi anche bloccare o cancellare i cookie dalle impostazioni
        del browser. Ti chiediamo di nuovo dopo 6 mesi, o prima se questa policy
        cambia in modo sostanziale.
      </p>

      <h2>Trasferimenti fuori dall'UE</h2>
      <p>
        Google, Vercel e Cloudflare possono trattare dati negli Stati Uniti.
        Questi trasferimenti si basano sulla decisione di adeguatezza EU–US Data
        Privacy Framework, a cui queste società aderiscono, e sulle Clausole
        Contrattuali Standard della Commissione Europea.
      </p>

      <h2>I tuoi diritti</h2>
      <p>
        Ai sensi degli articoli 15–22 GDPR puoi chiederci di accedere ai tuoi
        dati, rettificarli o cancellarli, limitarne o opporti al trattamento e
        riceverli in un formato portabile; puoi revocare il consenso in
        qualsiasi momento, senza pregiudicare la liceità del trattamento basato
        sul consenso prima della revoca. Scrivi a
        <a href="mailto:info@ingloriouscoderz.it">info@ingloriouscoderz.it</a>.
        Hai inoltre il diritto di proporre reclamo al ${PROVIDERS.garante} o
        all'autorità di controllo del tuo Paese.
      </p>
      <p>Non prendiamo decisioni automatizzate né creiamo profili su di te.</p>

      <h2>Modifiche</h2>
      <p>
        Aggiorneremo questa pagina se qualcosa cambia. Quando una modifica
        riguarda ciò a cui hai acconsentito, ti chiederemo nuovamente il
        consenso.
      </p>
    `,
  },
}

export const Privacy = {
  render(entity, api) {
    const { locale } = entity
    const c = forLocale(COPY, locale)
    const open = () => api.notify("#analytics:analyticsAsk")

    return Layout.render(
      {
        locale,
        path: PATH,
        content: html`
          <article class="${page.container} ${page.page} ${styles.legal}">
            <h1 class=${page.pageTitle}>${c.heading}</h1>
            <p class=${page.pageIntro}>
              ${c.updated}:
              <time datetime=${UPDATED}>${formatDate(UPDATED, locale)}</time>
            </p>
            ${c.body(open)}
            <div class=${page.cta}>
              <button type="button" class=${page.ctaButton} @click=${open}>
                ${c.preferences}
              </button>
            </div>
          </article>
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

function externalLink(href, label) {
  return html`<a href=${href} target="_blank" rel="noopener">${label}</a>`
}
