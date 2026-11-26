const DELETED_COOKIE_DATE = "Thu, 01 Jan 1970 00:00:00 GMT"
const GA_COOKIE = /^_ga(_|$)/
const TOP_LEVEL_DOMAIN_PARTS = 1

/**
 * A Google Analytics 4 adapter for `createAnalytics` from
 * `@inglorious/web/analytics`. The gtag script is injected on the first
 * consent, so nothing is requested from Google before it. Advertising consent
 * signals are always denied.
 *
 * @param {string} measurementId - e.g. "G-XXXXXXXXXX"
 */
export function googleAnalytics(measurementId) {
  let isLoaded = false

  return {
    isSupported() {
      return typeof window !== "undefined"
    },

    setConsent(isGranted) {
      window[`ga-disable-${measurementId}`] = !isGranted

      if (!isGranted) {
        if (isLoaded) gtag("consent", "update", { analytics_storage: "denied" })
        deleteCookies(GA_COOKIE)
        return
      }

      window.dataLayer = window.dataLayer || []
      if (!isLoaded) {
        gtag("consent", "default", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "denied",
        })
      }
      gtag("consent", "update", { analytics_storage: "granted" })

      if (isLoaded) return
      isLoaded = true
      gtag("js", new Date())
      gtag("config", measurementId)
      injectScript(
        `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
      )
    },

    // GA4's enhanced measurement already counts history changes as page views.
    pageView() {},

    event(name, params) {
      if (isLoaded) gtag("event", name, params)
    },
  }
}

function gtag() {
  // gtag.js reads the `arguments` object itself, not an array.
  window.dataLayer.push(arguments)
}

function injectScript(src) {
  const script = document.createElement("script")
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

function deleteCookies(pattern) {
  document.cookie
    .split(";")
    .map((cookie) => {
      const [name] = cookie.split("=")
      return name.trim()
    })
    .filter((name) => pattern.test(name))
    .forEach(deleteCookie)
}

// A cookie set on a parent domain must be deleted with that same domain.
function deleteCookie(name) {
  const parts = location.hostname.split(".")
  const domains = parts
    .map((_, i) => parts.slice(i))
    .filter((suffix) => suffix.length > TOP_LEVEL_DOMAIN_PARTS)
    .map((suffix) => `; domain=.${suffix.join(".")}`)

  for (const domain of ["", ...domains]) {
    document.cookie = `${name}=; expires=${DELETED_COOKIE_DATE}; path=/${domain}`
  }
}
