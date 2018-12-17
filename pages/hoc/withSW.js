import { Component } from 'react'

export const withSW = Enhanced =>
  class extends Component {
    static async getInitialProps(...args) {
      const getEnhancedInitialProps = Enhanced.getInitialProps
      return getEnhancedInitialProps
        ? await getEnhancedInitialProps(...args)
        : {}
    }

    async componentDidMount() {
      if (!'serviceWorker' in navigator) return

      try {
        await navigator.serviceWorker.register('/service-worker.js')
        console.log('service worker registered.')
      } catch (error) {
        console.warn('service worker registration failed.', error.message)
      }
    }

    render() {
      return <Enhanced {...this.props} />
    }
  }
