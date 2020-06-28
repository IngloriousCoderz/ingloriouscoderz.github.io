import App, { Container } from 'next/app'
import Router from 'next/router'
import NextSeo from 'next-seo'
import { withNamespaces } from 'react-i18next'

import { compose } from '~/utils/compose'
import 'flexboxgrid'
import '~/static/styles/style.css'
import SEO from '~/next-seo.config'
import { withGA } from '~/hoc/withGA'
import { withSW } from '~/hoc/withSW'

const enhance = compose(
  withSW,
  withGA(process.env.NEXT_STATIC_GA_TRACKING_ID, Router),
  withNamespaces()
)

export default enhance(
  class extends App {
    // eslint-disable-next-line no-unused-vars
    static async getInitialProps({ Component, router, ctx }) {
      let pageProps = {}

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }

      return { pageProps }
    }

    render() {
      const { Component, pageProps } = this.props

      return (
        <Container>
          <NextSeo config={SEO} />
          <Component {...pageProps} />
        </Container>
      )
    }
  }
)
