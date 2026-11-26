const ORIGIN = "https://ingloriouscoderz.it"
const OG_IMAGE = `${ORIGIN}/images/og.png`

export const SITE_URL = ORIGIN
export const DEFAULT_LOCALE = "en"
export const LOCALES = ["en", "it"]
export const I18N = { defaultLocale: DEFAULT_LOCALE, locales: LOCALES }

/** Picks the entry of a `{ en, it }` record for the locale, falling back to English. */
export function forLocale(record, locale) {
  return record[locale] ?? record[DEFAULT_LOCALE]
}

/** Prefixes a locale-agnostic path ("/talks") with the locale ("/it/talks"). */
export function localize(path, locale) {
  if (!locale || locale === DEFAULT_LOCALE) return path
  return path === "/" ? `/${locale}` : `/${locale}${path}`
}

/** The locale a URL path belongs to: its first segment, or the default. */
export function getLocaleFromPath(path = "/") {
  const [pathname] = path.split(/[?#]/)
  const [firstSegment] = pathname.split("/").filter(Boolean)
  return LOCALES.includes(firstSegment) ? firstSegment : DEFAULT_LOCALE
}

export function otherLocale(locale) {
  return LOCALES.find((l) => l !== locale) ?? DEFAULT_LOCALE
}

export function formatDate(date, locale) {
  return new Date(date).toLocaleDateString(
    locale === "it" ? "it-IT" : "en-GB",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      // Front matter dates are UTC midnight: the viewer's timezone would shift them a day.
      timeZone: "UTC",
    },
  )
}

/**
 * The SSX metadata of a page: localized title and description, Open Graph and
 * Twitter tags, canonical URL and hreflang alternates.
 */
export function pageMeta({
  path,
  locale = DEFAULT_LOCALE,
  title,
  description,
  type = "website",
  extra = {},
}) {
  const url = SITE_URL + localize(path, locale)

  const links = LOCALES.map(
    (l) =>
      `<link rel="alternate" hreflang="${l}" href="${SITE_URL + localize(path, l)}">`,
  )
  links.push(
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL + path}">`,
    `<link rel="canonical" href="${url}">`,
    `<link rel="alternate" type="application/rss+xml" title="Inglorious Coderz Blog" href="${SITE_URL}/feed.xml">`,
  )

  return {
    lang: locale,
    title: title,
    head: links.join("\n"),
    meta: {
      description: description,
      "og:type": type,
      "og:url": url,
      "og:title": title,
      "og:description": description,
      "og:image": OG_IMAGE,
      "og:locale": locale === "it" ? "it_IT" : "en_US",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": OG_IMAGE,
    },
    ...extra,
  }
}
