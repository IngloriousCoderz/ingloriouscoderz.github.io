import { withStorage } from "@inglorious/store/storage"
import { nothing } from "@inglorious/web"
import { createAnalytics } from "@inglorious/web/analytics"

import { googleAnalytics } from "../../api/google-analytics.js"
import { localize } from "../../common/i18n.js"
import { handlers } from "./handlers.js"
import { template } from "./template.js"

const MEASUREMENT_ID = "G-1VTZM56KYZ"
const STORAGE_KEY = "ic-consent"

export const Analytics = [
  createAnalytics({ adapter: googleAnalytics(MEASUREMENT_ID) }),
  handlers,
  {
    ...template,

    render(entity, api) {
      if (!entity.isMounted || !entity.isAsking) return nothing

      return this.renderAnalytics({
        locale: entity.locale,
        consent: entity.consent,
        policyUrl: localize("/privacy", entity.locale),
        onAccept: () => api.notify(`#${entity.id}:analyticsConsent`, true),
        onReject: () => api.notify(`#${entity.id}:analyticsConsent`, false),
      })
    },
  },
  withStorage(["consent", "consentDate"], { key: STORAGE_KEY }),
]
