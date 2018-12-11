import { Component } from 'react'

const IS_BROWSER = typeof window !== 'undefined'
const GA_LOCAL_STORAGE_KEY = 'ga:clientId'

export const withGA = (code, Router) => Enhanced =>
  class extends Component {
    pageview = () => {
      const { pathname, search } = location
      ga('send', 'pageview', pathname + search)
    }

    static async getInitialProps(...args) {
      const getEnhancedInitialProps = Enhanced.getInitialProps
      return getEnhancedInitialProps
        ? await getEnhancedInitialProps(...args)
        : {}
    }

    componentDidMount() {
      if (window._ga_initialized) return
      ;(function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r
        ;(i[r] =
          i[r] ||
          function() {
            ;(i[r].q = i[r].q || []).push(arguments)
          }),
          (i[r].l = 1 * new Date())
        ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
        a.async = 1
        a.src = g
        m.parentNode.insertBefore(a, m)
      })(
        window,
        document,
        'script',
        'https://www.google-analytics.com/analytics.js',
        'ga',
      )

      ga('create', code, {
        storage: 'none',
        clientId: localStorage.getItem(GA_LOCAL_STORAGE_KEY),
      })

      ga(tracker => {
        localStorage.setItem(GA_LOCAL_STORAGE_KEY, tracker.get('clientId'))
      })

      window._ga_initialized = true
      this.pageview()

      const previousCallback = Router.onRouteChangeComplete
      Router.onRouteChangeComplete = () => {
        if (typeof previousCallback === 'function') {
          previousCallback()
        }
        this.pageview()
      }
    }

    render() {
      return <Enhanced {...this.props} />
    }
  }
