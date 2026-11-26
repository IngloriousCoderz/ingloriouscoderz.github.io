import "highlight.js/styles/atom-one-dark.min.css"
import "katex/dist/katex.min.css"

import { handleRequest } from "@inglorious/store/async"
import { html } from "@inglorious/web"
import { unsafeHTML } from "@inglorious/web/directives/unsafe-html"
import { when } from "@inglorious/web/directives/when"

import { Layout } from "../../../app/layout/index.js"
import {
  forLocale,
  formatDate,
  getLocaleFromPath,
  localize,
  pageMeta,
} from "../../../common/i18n.js"
import { findMeta, loadPost, slugs, TOPICS } from "../../../common/posts.js"
import page from "../../../styles/page.module.css"
import styles from "./style.module.css"

const COPY = {
  en: {
    by: "by",
    back: "All posts",
    loading: "Loading…",
    error: "This post couldn't be loaded. Please try again.",
    translated: "This article was originally written in Italian.",
    original: "Read the original",
    contact: "Want to talk about it?",
    contactLink: "Drop us a line",
  },
  it: {
    by: "di",
    back: "Tutti gli articoli",
    loading: "Caricamento…",
    error: "Non è stato possibile caricare l'articolo. Riprova.",
    translated: "Questo articolo è stato scritto originariamente in inglese.",
    original: "Leggi l'originale",
    contact: "Vuoi parlarne?",
    contactLink: "Scrivici",
  },
}

export const Post = {
  // SSX serializes the data of the page the visitor lands on only: posts
  // reached through client-side navigation are loaded here.
  routeChange(entity, { route, params, path }, api) {
    if (route !== entity.id) return

    const locale = getLocaleFromPath(path)
    const { post } = entity
    if (post?.slug === params.slug && post?.locale === locale) return

    api.notify(`#${entity.id}:postLoad`, { slug: params.slug, locale })
  },

  ...handleRequest("postLoad", {
    start(entity) {
      entity.post = null
    },
    run: ({ slug, locale }) => loadPost(slug, locale),
    success(entity, post) {
      entity.post = post
    },
  }),

  render(entity, api) {
    const { locale, post } = entity
    const c = forLocale(COPY, locale)

    return Layout.render(
      {
        locale,
        path: post ? `/blog/${post.slug}` : "/blog",
        content: when(
          post,
          () => this.renderPost({ post, locale, c }),
          () =>
            html`<section class="${page.container} ${page.page}">
              <p>${entity.status === "error" ? c.error : c.loading}</p>
            </section>`,
        ),
      },
      api,
    )
  },

  renderPost({ post, locale, c }) {
    const path = `/blog/${post.slug}`
    const isTranslation = post.original && post.original !== locale

    return html`
      <article class="${page.container} ${page.page} ${styles.post}">
        <p class=${styles.breadcrumb}>
          <a href=${localize("/blog", locale)}>← ${c.back}</a>
        </p>

        <header class=${styles.header}>
          ${when(
            post.topic,
            () =>
              html`<p class=${page.cardMeta}>
                <span class=${page.badge}
                  >${forLocale(TOPICS[post.topic], locale)}</span
                >
              </p>`,
          )}
          <h1 class=${page.pageTitle}>${post.title}</h1>
          <p class=${page.pageIntro}>${post.description}</p>
          <p class=${page.cardMeta}>
            <time datetime=${post.date}>${formatDate(post.date, locale)}</time>
            · ${c.by} ${post.author}
          </p>
          ${when(
            isTranslation,
            () =>
              html`<p class=${styles.translationNote}>
                ${c.translated}
                <a
                  href=${localize(path, post.original)}
                  hreflang=${post.original}
                  >${c.original} →</a
                >
              </p>`,
          )}
        </header>

        <div class=${styles.body}>${unsafeHTML(post.html)}</div>

        <footer class=${styles.footer}>
          <p>
            ${c.contact}
            <a href="mailto:info@ingloriouscoderz.it">${c.contactLink}</a> ·
            <a href=${localize("/blog", locale)}>${c.back} →</a>
          </p>
        </footer>
      </article>
    `
  },
}

export async function load(entity, page) {
  entity.post = await loadPost(page.params.slug, page.locale)
}

export function staticPaths() {
  return slugs.map((slug) => ({ params: { slug }, path: `/blog/${slug}` }))
}

export const metadata = (entity) => {
  const meta = entity.post ?? {}
  const locale = entity.locale
  const slug = meta.slug
  const fallback = slug ? findMeta(slug, locale) : {}

  return pageMeta({
    path: `/blog/${slug}`,
    locale,
    // No brand suffix: the title is also the RSS item title.
    title: meta.title ?? fallback.title,
    description: meta.description ?? fallback.description,
    type: "article",
    fonts: ["/fonts/roboto.woff2"],
    extra: {
      pubDate: meta.date,
      updatedAt: meta.date,
      author: meta.author,
      category: meta.topic ? forLocale(TOPICS[meta.topic], "en") : undefined,
    },
  })
}
