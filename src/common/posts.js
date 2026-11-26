import { DEFAULT_LOCALE } from "./i18n.js"

// Two globs with different queries: one module may not be both eagerly and
// lazily imported, or Rollup would bundle every post body into this chunk.
const metas = import.meta.glob("../content/blog/*/*.md", {
  query: "?post-meta",
  import: "metadata",
  eager: true,
})

const loaders = import.meta.glob("../content/blog/*/*.md", { query: "?post" })

const PATH_REGEX = /\/blog\/([^/]+)\/(\w+)\.md$/

const all = Object.entries(metas).map(([file, metadata]) => {
  const [, slug, locale] = file.match(PATH_REGEX)
  return { ...metadata, slug, locale }
})

export const slugs = [...new Set(all.map((post) => post.slug))]

/** All posts in the given locale, newest first. */
export function listPosts(locale = DEFAULT_LOCALE) {
  return slugs
    .map((slug) => findMeta(slug, locale))
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function findMeta(slug, locale = DEFAULT_LOCALE) {
  return (
    all.find((post) => post.slug === slug && post.locale === locale) ??
    all.find((post) => post.slug === slug && post.locale === DEFAULT_LOCALE)
  )
}

export async function loadPost(slug, locale = DEFAULT_LOCALE) {
  const loader =
    loaders[`../content/blog/${slug}/${locale}.md`] ??
    loaders[`../content/blog/${slug}/${DEFAULT_LOCALE}.md`]
  if (!loader) return null

  const { metadata, html } = await loader()
  return { ...metadata, slug, locale, html }
}

export const TOPICS = {
  quantum: { en: "Quantum Computing", it: "Quantum Computing" },
  react: { en: "React & Redux", it: "React & Redux" },
  backend: { en: "Back End", it: "Back End" },
}
