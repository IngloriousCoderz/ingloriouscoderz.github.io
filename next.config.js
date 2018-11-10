const nextEnv = require('next-env')
const dotenvLoad = require('dotenv-load')
const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
const withOptimizedImages = require('next-optimized-images')
const withNextein = require('nextein/config').default
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

dotenvLoad()
const withNextEnv = nextEnv()

module.exports = withPlugins(
  [withNextEnv, withCSS, withOptimizedImages, withNextein],
  {
    exportPathMap: defaultPathMap => ({
      // ...defaultPathMap,
      '/how': { page: '/how' },
      '/what': { page: '/what' },
      '/when': { page: '/when' },
      '/where': { page: '/where' },
      '/who': { page: '/who' },
      '/why': { page: '/why' },
      '/blog': { page: '/blog' },
    }),

    webpack(config) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      })

      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          navigateFallback: '/index',
          verbose: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          runtimeCaching: [
            {
              handler: 'networkFirst',
              urlPattern: /^https?.*/,
            },
          ],
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
