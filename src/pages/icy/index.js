import "@inglorious/logo/style.css"

import { Logo } from "@inglorious/logo"
import { html } from "@inglorious/web"

import { Layout } from "../../app/layout/index.js"
import { forLocale, pageMeta } from "../../common/i18n.js"
import page from "../../styles/page.module.css"
import styles from "./style.module.css"

const PATH = "/icy"
const LOGO_SIZE = 256
const DEFAULT_FACES = [
  { image: "I", reverse: false, eye: true },
  { image: "C", reverse: false, eye: false },
]
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

const COPY = {
  en: {
    title: "Icy, the Inglorious Logo | Make Your Own",
    heading: "Icy",
    description:
      "Play with Icy, the 3D Inglorious Coderz logo, and make your own: pick the letters, flip them, give them an eye.",
    intro: [
      "Meet Icy, our Inglorious Logo! It's a CSS 3D cube with SVG faces that follows your mouse (or your finger on mobile). Its name is Icy because its faces are an “I” and a “C”. Also, its catchphrase is “I see…”",
      "Why don't you make your own Inglorious logo? You can give life to Amy, or Guy, or even Qzy!",
    ],
    yourOwn: "This is your own",
    hint: "Play with the parameters and see it change live.",
    left: "Left side",
    right: "Right side",
    letter: "Letter",
    reverse: "Reverse",
    eye: "Eye",
    builtWith: "Built with",
  },
  it: {
    title: "Icy, l'Inglorious Logo | Crea il tuo",
    heading: "Icy",
    description:
      "Gioca con Icy, il logo 3D di Inglorious Coderz, e crea il tuo: scegli le lettere, ribaltale, dagli un occhio.",
    intro: [
      "Ecco Icy, il nostro Inglorious Logo! È un cubo 3D in CSS con facce SVG che segue il tuo mouse (o il tuo dito su mobile). Si chiama Icy perché le sue facce sono una “I” e una “C”. E il suo tormentone è “I see…”",
      "Perché non crei il tuo Inglorious logo? Puoi dare vita ad Amy, a Guy o persino a Qzy!",
    ],
    yourOwn: "Questo è il tuo",
    hint: "Gioca con i parametri e guardalo cambiare dal vivo.",
    left: "Lato sinistro",
    right: "Lato destro",
    letter: "Lettera",
    reverse: "Ribalta",
    eye: "Occhio",
    builtWith: "Costruito con",
  },
}

/**
 * The page is the logo it customizes: it wraps Logo with the faces' state and
 * the form that changes them.
 */
export const Icy = {
  create(entity) {
    entity.size ??= LOGO_SIZE
    entity.faces ??= DEFAULT_FACES.map((face) => ({ ...face }))
    entity.isScrollPrevented = true
  },

  coordsChange: Logo.coordsChange,

  faceChange(entity, { index, field, value }) {
    entity.faces[index][field] = value
  },

  render(entity, api) {
    const { locale, faces } = entity
    const c = forLocale(COPY, locale)
    const [left, right] = faces
    const name = `${left.image}${right.image.toLowerCase()}y`
    const change = handleChange(entity.id, api)

    return Layout.render(
      {
        locale,
        path: PATH,
        content: html`
          <section class="${page.container} ${page.page}">
            <h1 class=${page.pageTitle}>${c.heading}</h1>
            ${c.intro.map((p) => html`<p class=${page.pageIntro}>${p}</p>`)}

            <div class=${styles.icy}>
              <form
                class=${page.card}
                @submit=${(event) => event.preventDefault()}
              >
                <p class=${styles.name}>${c.yourOwn} ${name}</p>
                <p>${c.hint}</p>
                <br />

                ${[c.left, c.right].map(
                  (legend, index) => html`
                    <fieldset>
                      <legend>${legend}</legend>
                      <label>
                        ${c.letter}
                        <select
                          .value=${faces[index].image}
                          @change=${change(index, "image")}
                        >
                          ${LETTERS.map(
                            (letter) =>
                              html`<option
                                value=${letter}
                                ?selected=${letter === faces[index].image}
                              >
                                ${letter}
                              </option>`,
                          )}
                        </select>
                      </label>
                      <label>
                        ${c.reverse}
                        <input
                          type="checkbox"
                          .checked=${faces[index].reverse}
                          @change=${change(index, "reverse")}
                        />
                      </label>
                      <label>
                        ${c.eye}
                        <input
                          type="checkbox"
                          .checked=${faces[index].eye}
                          @change=${change(index, "eye")}
                        />
                      </label>
                    </fieldset>
                  `,
                )}

                <p class=${page.cardMeta}>
                  ${c.builtWith}
                  <a
                    href="https://www.npmjs.com/package/@inglorious/logo"
                    target="_blank"
                    rel="noopener"
                    >@inglorious/logo</a
                  >
                </p>
              </form>

              <div class=${styles.stage}>${Logo.render(entity)}</div>
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

function handleChange(entityId, api) {
  return (index, field) => (event) => {
    const { type, checked, value } = event.target
    api.notify(`#${entityId}:faceChange`, {
      index,
      field,
      value: type === "checkbox" ? checked : value,
    })
  }
}
