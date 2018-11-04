import App, { Container } from 'next/app'
import Router from 'next/router'
import withGA from 'next-ga'
import { withNamespaces } from 'react-i18next'

import { compose } from '~/utils/compose'

const enhance = compose(
  withGA(process.env.NEXT_STATIC_GA_TRACKING_ID, Router),
  withNamespaces(),
)
export default enhance(
  class extends App {
    static async getInitialProps({ Component, router, ctx }) {
      let pageProps = {}

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }

      return { pageProps }
    }

    componentDidMount() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(registration => {
            console.log('service worker registration successful')
          })
          .catch(err => {
            console.warn('service worker registration failed', err.message)
          })
      }
    }

    render() {
      const { Component, pageProps } = this.props

      return (
        <Container>
          <Component {...pageProps} />
        </Container>
      )
    }
  },
)
