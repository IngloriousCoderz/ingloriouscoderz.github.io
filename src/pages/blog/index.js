import { html } from "@inglorious/web"

import { Layout } from "../../app/layout/index.js"
import { forLocale, formatDate, localize, pageMeta } from "../../common/i18n.js"
import { listPosts, TOPICS } from "../../common/posts.js"
import page from "../../styles/page.module.css"
import styles from "./style.module.css"

const PATH = "/blog"

const COPY = {
  en: {
    title: "Blog | Inglorious Coderz",
    heading: "Blog",
    description:
      "Articles by Inglorious Coderz on quantum computing, software architecture, React and Redux.",
    intro:
      "Notes from the workbench: things we studied, broke, fixed, and wanted to explain properly. From quantum algorithms to the craft of writing maintainable code.",
    by: "by",
  },
  it: {
    title: "Blog | Inglorious Coderz",
    heading: "Blog",
    description:
      "Articoli di Inglorious Coderz su quantum computing, architettura del software, React e Redux.",
    intro:
      "Appunti dal banco di lavoro: cose che abbiamo studiato, rotto, aggiustato e voluto spiegare per bene. Dagli algoritmi quantistici al mestiere di scrivere codice manutenibile.",
    by: "di",
  },
}

export const Blog = {
  render(entity, api) {
    const { locale } = entity
    const c = forLocale(COPY, locale)
    const posts = listPosts(locale)
    const topics = Object.keys(TOPICS).filter((topic) =>
      posts.some((p) => p.topic === topic),
    )

    return Layout.render(
      {
        locale,
        path: PATH,
        content: html`
          <section class="${page.container} ${page.page}">
            <h1 class=${page.pageTitle}>${c.heading}</h1>
            <p class=${page.pageIntro}>${c.intro}</p>

            ${topics.map(
              (topic) => html`
                <h2 class=${styles.topicTitle}>
                  ${forLocale(TOPICS[topic], locale)}
                </h2>
                <ul class=${styles.postList}>
                  ${posts
                    .filter((post) => post.topic === topic)
                    .map(
                      (post) => html`
                        <li class=${page.card}>
                          <h3>
                            <a href=${localize(`/blog/${post.slug}`, locale)}
                              >${post.title}</a
                            >
                          </h3>
                          <p>${post.description}</p>
                          <p class=${page.cardMeta}>
                            <time datetime=${post.date}
                              >${formatDate(post.date, locale)}</time
                            >
                            · ${c.by} ${post.author}
                          </p>
                        </li>
                      `,
                    )}
                </ul>
              `,
            )}
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
