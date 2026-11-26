import { getLocaleFromPath } from "../../common/i18n.js"

const DAYS_TO_RENEW_CONSENT = 180
const ONE_DAY_MS = 86_400_000

/**
 * Extends `createAnalytics` for a consent banner: asks again once a choice is
 * older than six months, and follows the page's locale.
 */
export function handlers(type) {
  return {
    create(entity, payload, api) {
      if (isExpired(entity.consentDate)) {
        entity.consent = null
        entity.consentDate = null
      }
      type.create?.(entity, payload, api)
    },

    // The banner never appears in pre-rendered HTML: it waits for hydration
    // to finish, so the first client render matches the server's.
    init(entity) {
      entity.isMounted = true
      entity.locale = getLocaleFromPath(window.location.pathname)
    },

    routeChange(entity, payload, api) {
      type.routeChange?.(entity, payload, api)
      entity.locale = getLocaleFromPath(payload?.path)
    },

    analyticsConsent(entity, isGranted, api) {
      type.analyticsConsent?.(entity, isGranted, api)
      entity.consentDate = new Date().toISOString()
    },
  }
}

function isExpired(date) {
  if (!date) return false
  const ageMs = Date.now() - new Date(date).getTime()
  return !(ageMs < DAYS_TO_RENEW_CONSENT * ONE_DAY_MS)
}
