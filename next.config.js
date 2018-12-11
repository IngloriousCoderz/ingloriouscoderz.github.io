const nextEnv = require('next-env')
const dotenvLoad = require('dotenv-load')
const compose = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
const withPurgeCSS = require('next-purgecss')
const withOptimizedImages = require('next-optimized-images')
const withNextein = require('nextein/config').default
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

dotenvLoad()
const withNextEnv = nextEnv()

module.exports = compose(
  [
    withNextEnv,
    withCSS,
    [withPurgeCSS, { purgeCss: { whitelistPatterns: () => [/^hljs/] } }],
    withOptimizedImages,
    withNextein,
  ],
  {
    exportPathMap: defaultPathMap => ({
      // ...defaultPathMap,
      '/why': { page: '/why' },
      '/who': { page: '/who' },
      '/who/consultant': { page: '/who/consultant' },
      '/who/tech-lead': { page: '/who/tech-lead' },
      '/who/mentor': { page: '/who/mentor' },
      '/who/teacher': { page: '/who/teacher' },
      '/what': { page: '/what' },
      '/what/code': { page: '/what/code' },
      '/what/speak': { page: '/what/speak' },
      '/what/volunteer': { page: '/what/volunteer' },
      '/what/community': { page: '/what/community' },
      '/how': { page: '/how' },
      '/when': { page: '/when' },
      '/where': { page: '/where' },
      '/how-much': { page: '/how-much' },
      '/logo': { page: '/logo' },
      '/blog': { page: '/blog' },
      '/privacy-policy': { page: '/privacy-policy' },
    }),

    webpack(config) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      })

      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          // NOTE: configuration copied and merged from create-react-app and with-sw-precache

          // By default, a cache-busting query parameter is appended to requests
          // used to populate the caches, to ensure the responses are fresh.
          // If a URL is already hashed by Webpack, then there is no concern
          // about it being stale, and the cache-busting can be skipped.
          dontCacheBustUrlsMatching: /\.\w{8}\./,
          filename: 'service-worker.js',
          logger(message) {
            if (message.indexOf('Total precache size is') === 0) {
              // This message occurs for every build and is a bit too noisy.
              return
            }
            if (message.indexOf('Skipping static resource') === 0) {
              // This message obscures real errors so we ignore it.
              // https://github.com/facebookincubator/create-react-app/issues/2612
              return
            }
            console.log(message)
          },
          minify: true,
          // For unknown URLs, fallback to the index page
          navigateFallback: '/index.html',
          // Ignores URLs starting from /__ (useful for Firebase):
          // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
          navigateFallbackWhitelist: [/^(?!\/__).*/],
          // Don't precache sourcemaps (they're large) and build asset manifest:
          staticFileGlobsIgnorePatterns: [
            /\.map$/,
            /asset-manifest\.json$/,
            /\.next\//,
          ],

          // verbose: true,
          // runtimeCaching: [
          //   {
          //     handler: 'networkFirst',
          //     urlPattern: /^https?.*/,
          //   },
          // ],
        }),
      )

      return config
    },

    webpackDevMiddleware(config) {
      config.watchOptions = {
        ignored: [/\.git\//, /\.next\//, /node_modules/],
      }

      return config
    },
  },
)
