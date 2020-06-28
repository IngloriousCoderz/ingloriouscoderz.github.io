import { useEffect } from 'react'

export const withSW = (Enhanced) => {
  function WithSW(props) {
    useEffect(() => {
      registerSW()
    }, [])

    return <Enhanced {...props} />
  }

  WithSW.getInitialProps = async (...args) => {
    const getEnhancedInitialProps = Enhanced.getInitialProps
    return getEnhancedInitialProps ? await getEnhancedInitialProps(...args) : {}
  }

  return WithSW
}

const registerSW = async () => {
  if (!('serviceWorker' in navigator)) return

  try {
    await navigator.serviceWorker.register('/service-worker.js')
    console.log('service worker registered.')
  } catch (error) {
    console.warn('service worker registration failed.', error.message)
  }
}
