export default {
  noindex: true, // TODO: remove when ready for production

  // override on each page
  title: 'Home',
  description:
    'A fistful of heroes striving to create a better world through better software.',
  canonical: 'https://www.ingloriouscoderz.it',

  titleTemplate: `%s | Inglorious Coderz`,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.ingloriouscoderz.it',
    title: 'Inglorious Coderz',
    description:
      'A fistful of heroes striving to create a better world through better software.',
    defaultImageWidth: 1200,
    defaultImageHeight: 1200,
    // Multiple Open Graph images is only available in version `7.0.0-canary.0`+ of next (see note top of README.md)
    images: [
      {
        url: 'https://www.ingloriouscoderz.it/static/images/metal-800x600png',
        width: 800,
        height: 600,
        alt: 'Inglorious Coderz',
      },
      // {
      //   url: 'https://www.example.ie/og-image-02.jpg',
      //   width: 900,
      //   height: 800,
      //   alt: 'Inglorious Coderz',
      // },
      // { url: 'https://www.example.ie/og-image-03.jpg' },
      // { url: 'https://www.example.ie/og-image-04.jpg' },
    ],
    site_name: 'Inglorious Coderz',
  },
  // twitter: {
  //   handle: '@antonymistretta',
  //   site: '@antonymistretta',
  //   cardType: 'summary_large_image',
  // },
}
