import { useEffect } from 'react'

export const withGA = (code, Router) => (Enhanced) => {
  function WithGA(props) {
    useEffect(() => {
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())

      gtag('config', 'G-1VTZM56KYZ')
    }, [])

    return <Enhanced {...props} />
  }

  WithGA.getInitialProps = async (...args) => {
    const getEnhancedInitialProps = Enhanced.getInitialProps
    return getEnhancedInitialProps ? await getEnhancedInitialProps(...args) : {}
  }

  return WithGA
}
