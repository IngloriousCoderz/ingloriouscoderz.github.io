import { Component } from 'react'

export const withSW = Enhanced =>
  class extends Component {
    static async getInitialProps(...args) {
      const getEnhancedInitialProps = Enhanced.getInitialProps
      return getEnhancedInitialProps
        ? await getEnhancedInitialProps(...args)
        : {}
    }

    componentDidMount() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(() => console.log('service worker registered.'))
          .catch(err =>
            console.warn('service worker registration failed.', err.message),
          )
      }
    }

    render() {
      return <Enhanced {...this.props} />
    }
  }
