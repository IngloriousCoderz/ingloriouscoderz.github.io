import { template } from "./template.js"

/**
 * The site shell: header, footer and consent banner around a page's content.
 * Pages call `Layout.render({ locale, path, content }, api)`.
 */
export const Layout = {
  ...template,

  render(props, api) {
    return this.renderLayout(
      {
        ...props,
        onConsentOpen: () => api.notify("#analytics:analyticsAsk"),
      },
      api,
    )
  },
}
