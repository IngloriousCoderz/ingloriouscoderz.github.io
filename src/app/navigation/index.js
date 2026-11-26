import { startInteraction, stopInteraction } from "@inglorious/logo"

const PAGE_TOP = 0
const LOGO_BY_ROUTE = { landing: "logo", icy: "icyLogo" }
const LOGO_BY_PATH = [
  [/^\/(it\/?)?$/, "logo"],
  [/^\/(it\/)?icy\/?$/, "icyLogo"],
]

/**
 * Page-to-page behavior of the client-side router: scrolls back to the top
 * like a full page load would, and lets only the current page's logo follow
 * the pointer, so other pages don't re-render on every mouse move.
 */
export const Navigation = {
  init(entity, payload, api) {
    const [, logoId] =
      LOGO_BY_PATH.find(([regex]) => regex.test(window.location.pathname)) ?? []
    activateLogo(logoId, api)
  },

  routeChange(entity, { route }, api) {
    window.scrollTo({ top: PAGE_TOP })
    activateLogo(LOGO_BY_ROUTE[route], api)
  },
}

function activateLogo(logoId, api) {
  stopInteraction()
  if (logoId) startInteraction(api.getEntity(logoId), api)
}
