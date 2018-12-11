import Document, { Head, Main, NextScript } from 'next/document'

import i18n from '~/utils/i18n'

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang={i18n.language}>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=5.0" // NOTE: maximum-scale=1.0 and user-scalable=no" disabled for better accessibility
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/icons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/icons/safari-pinned-tab.svg"
            color="#000000"
          />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="google-site-verification"
            content="RFVNvxmtxJpN5XtPqm_lrA2jrphy-Sn_fy3XyekO-2E"
          />

          <link href="/static/styles/mapbox-gl.css" rel="stylesheet" />
          <script src="/static/scripts/gh-spa-redirect.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
